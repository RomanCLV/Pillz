import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, ScrollView, View, KeyboardAvoidingView, Platform } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { useTheme } from "@hooks/useTheme";
import { usePills } from "@hooks/usePills";
import { useSafeNavigation } from "@hooks/useSafeNavigation";
import { useT } from "@i18n/useT";
import SafeTopAreaThemedView from "@themedComponents/SafeTopAreaThemedView";
import ThemedButton from "@themedComponents/ThemedButton";
import ThemedSwitch from "@themedComponents/ThemedSwitch";
import ThemedText from "@themedComponents/ThemedText";
import ThemedTextInput from "@themedComponents/ThemedTextInput";
import ThemedWheelPicker, { PickerItem } from "@themedComponents/ThemedWheelPicker";
import ThemedModal from "@themedComponents/ThemedModal";
import ThemedCalendarPicker, { OnChangePayload, RangePayload, SinglePayload } from "@themedComponents/ThemedCalendarPicker";
import GenericHeader from "@components/headers/GenericHeader";
import HeaderButton from "@components/headers/HeaderButton";
import FormField from "@components/FormField";
import ChipIcon from "@components/ChipIcon";
import ScheduleChip from "@components/pills/ScheduleChip";
import { 
  Pill, 
  DosageUnit, 
  PillSchedule, 
  createDefaultPill,
  validateSchedules,
  INTAKE_WINDOW_OPTIONS,
} from "types/pill";
import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter";
import AddIcon from "@assets/icons/add.svg";
import CloseIcon from "@assets/icons/close.svg";
import TrashIcon from "@assets/icons/trash.svg";
import { createDateAtMidnight } from "@utils/dateHelper";

export default function EditPillScreen() {
  const {goBack} = useSafeNavigation();
  const navigation = useNavigation();
  const theme = useTheme();
  const t = useT();
  const params = useLocalSearchParams();
  const isEditing = !!params.id;

  const { pills, addPill, updatePill, deletePill, getPillByName } = usePills();

    useLayoutEffect(() => {
      const parent = navigation.getParent();
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: "none" },
      });
      return () => {
        parent?.setOptions({
          tabBarStyle: { 
            backgroundColor: theme.background.secondary,
            borderTopWidth: 1,
            borderColor: theme.border.light + "10",
          }
        });
      };
    }, [navigation]);

  const getUnitLabel = (unit: DosageUnit): string => {
    const label = t(`pill.unit.${unit}`);
    return (unit !== DosageUnit.MG && unit !== DosageUnit.ML) ? capitalizeFirstLetter(label) : label;
  };

  const formatIntakeWindow = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return t("hours.hhmm", {h : hours.toString().padStart(2, '0'), m: mins.toString().padStart(2, '0')})
  }

  // États pour les modales
  const [errorModal, setErrorModal] = useState({ visible: false, message: "" });
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSucessModal] = useState({ visible: false, message: "" });

  // État du formulaire
  const [formData, setFormData] = useState<Pill>(isEditing ? pills[Number(params.id)] : createDefaultPill());
  const [hasEndDate, setHasEndDate] = useState(formData.treatmentDuration.endDate !== null);

  const units = Object.values(DosageUnit);

  // Préparer les items pour les pickers
  const unitItems: PickerItem[] = units.map((unit) => ({
    label: getUnitLabel(unit),
    value: unit,
  }));

  const hoursBetweenIntakesItems = Array.from({ length: 24 }, (_, h) => ({
    label: formatIntakeWindow((h+1) * 60),
    value: h+1,
  }));

  const intakeWindowItems: PickerItem[] = INTAKE_WINDOW_OPTIONS.map((minutes) => ({
    label: formatIntakeWindow(minutes),
    value: minutes,
  }));

  const handleSave = async () => {
    const trimmedName = formData.name.trim();
    const currentId = isEditing ? Number(params.id) : -1;

    // Validation du nom
    if (!trimmedName) {
      setErrorModal({
        visible: true,
        message: t("pills_edit.pleaseInputName"),
      });
      return;
    }

    // Validation des horaires
    if (formData.schedules.length === 0) {
      setErrorModal({
        visible: true,
        message: t("pills_edit.pleaseAddSchudule"),
      });
      return;
    }

    // Validation de l'intervalle entre les prises
    if (!validateSchedules(formData.schedules, formData.minHoursBetweenIntakes)) {
      setErrorModal({
        visible: true,
        message: t("pills_edit.invalidSchedules", {h: formData.minHoursBetweenIntakes}),
      });
      return;
    }

    if (isEditing) {
      // Look for all pills (except current) where the name is used
      const existingPills = pills.filter((pill, index) => pill.name === trimmedName && index !== currentId );
      if (existingPills.length > 0) {
        setErrorModal({
          visible: true,
          message: t("pills_edit.pillAlreadyExists"),
        });
        return;
      }
    }
    else {
      // new pill
      const existingPill = getPillByName(trimmedName);
      if (existingPill) {
        setErrorModal({
          visible: true,
          message: t("pills_edit.pillAlreadyExists"),
        });
        return;
      }
    }

    try {
      if (isEditing) {
        // Mise à jour d'un médicament existant
        await updatePill(currentId, {...formData, name: trimmedName});
        setSucessModal({
          visible: true,
          message: t("pills_edit.pillUpdatedSuccess"),
        });
      } 
      else {
        // Création d'un nouveau médicament
        await addPill(formData);
        setSucessModal({
          visible: true,
          message: t("pills_edit.pillCreatedSuccess"),
        });
      }
      
      // Attendre que la modale se ferme avant de revenir
      setTimeout(goBack(), 1500);
    } 
    catch (error) {
      setErrorModal({
        visible: true,
        message: t("pills_edit.errorWhileSaving"),
      });
      //console.error("Error saving pill:", error);
    }
  };

  const handleDelete = () => {
    // Afficher la modale de confirmation
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!isEditing) {
      setErrorModal({
        visible: true,
        message: t("pills_edit.cantDeletePillInCreation"),
      });
      //console.error("Error try deleting pill in creating mode");
    }
    const currentId = Number(params.id);
    try {
      await deletePill(currentId);
      goBack()();
    } 
    catch (error) {
      setErrorModal({
        visible: true,
        message: t("pills_edit.errorWhileDeleting"),
      });
      //console.error("Error deleting pill:", error);
    }
  };

  const handleAddSchedule = () => {
    const schedules = formData.schedules;
    
    // Si aucun horaire existant, créer le premier à 8h00
    if (schedules.length === 0) {
      const newSchedule: PillSchedule = { hour: 8, minute: 0 };
      setFormData({
        ...formData,
        schedules: [newSchedule],
      });
      return;
    }

    // Trier les horaires existants
    const sortedSchedules = [...schedules].sort((a, b) => {
      const timeA = a.hour * 60 + a.minute;
      const timeB = b.hour * 60 + b.minute;
      return timeA - timeB;
    });

    // Prendre le dernier horaire
    const lastSchedule = sortedSchedules[sortedSchedules.length - 1];
    const lastTimeInMinutes = lastSchedule.hour * 60 + lastSchedule.minute;
    
    // Ajouter minHoursBetweenIntakes
    const minGapMinutes = formData.minHoursBetweenIntakes * 60;
    let newTimeInMinutes = lastTimeInMinutes + minGapMinutes;
    
    // Si ça dépasse minuit
    if (newTimeInMinutes >= 24 * 60) {
      // Boucler sur 24h : 24h00 devient 00h00
      newTimeInMinutes = newTimeInMinutes % (24 * 60);
      
      // Vérifier s'il y a assez de place avant le premier horaire
      const firstSchedule = sortedSchedules[0];
      const firstTimeInMinutes = firstSchedule.hour * 60 + firstSchedule.minute;
      
      // Calculer l'écart entre le nouvel horaire et le premier
      const gapToFirst = firstTimeInMinutes - newTimeInMinutes;
      
      // Si l'écart est insuffisant, on ne peut pas ajouter
      if (gapToFirst < minGapMinutes) {
        setErrorModal({
          visible: true,
          message: t("pills_edit.canNotAddSchedule", {h: formData.minHoursBetweenIntakes}),
        });
        return;
      }
    }
    
    const newHour = Math.floor(newTimeInMinutes / 60);
    const newMinute = newTimeInMinutes % 60;
    
    const newSchedule: PillSchedule = { hour: newHour, minute: newMinute };
    
    // Vérifier les doublons
    const isDuplicate = formData.schedules.some(
      (s) => s.hour === newSchedule.hour && s.minute === newSchedule.minute
    );
    
    if (isDuplicate) {
      setErrorModal({
          visible: true,
          message: t("pills_edit.scheduleAlreadyExists"),
        });
      return;
    }
    
    const finalSchedules = [...formData.schedules, newSchedule];
    const finalSortedSchedules = finalSchedules.sort((a, b) => {
      const timeA = a.hour * 60 + a.minute;
      const timeB = b.hour * 60 + b.minute;
      return timeA - timeB;
    });
    
    setFormData({
      ...formData,
      schedules: finalSortedSchedules,
    });
  };

  const handleRemoveSchedule = (index: number) => {
    setFormData({
      ...formData,
      schedules: formData.schedules.filter((_, i) => i !== index),
    });
  };

  const handleScheduleChanged = (index: number, schedule: PillSchedule) => {
    let newState = {...formData};
    newState.schedules[index] = schedule;
    setFormData(newState);
  };

  const handleMinHoursBetweenIntakes = (value: number) => {
    if (formData.minHoursBetweenIntakes !== value) {
      let newData = { ...formData, minHoursBetweenIntakes: value };
      
      // Trier les horaires d'abord
      newData.schedules = [...newData.schedules].sort((a, b) => {
        const timeA = a.hour * 60 + a.minute;
        const timeB = b.hour * 60 + b.minute;
        return timeA - timeB;
      });
      
      for (let i = 1; i < newData.schedules.length; i++) {
        const previousSchedule = newData.schedules[i - 1];
        const currentSchedule = newData.schedules[i];
        
        const previousTimeMinutes = previousSchedule.hour * 60 + previousSchedule.minute;
        const currentTimeMinutes = currentSchedule.hour * 60 + currentSchedule.minute;
        const timeDiff = currentTimeMinutes - previousTimeMinutes;
        
        if (timeDiff < value * 60) { // Comparer en minutes (value est en heures)
          // Décaler l'horaire actuel
          const newTimeMinutes = previousTimeMinutes + (value * 60);
          
          // Gérer le dépassement de 24h
          if (newTimeMinutes >= 24 * 60) {
            // Supprimer les horaires qui dépassent
            newData.schedules = newData.schedules.slice(0, i);
            break;
          } 
          else {
            newData.schedules[i].hour = Math.floor(newTimeMinutes / 60);
            newData.schedules[i].minute = newTimeMinutes % 60;
          }
        }
      }
      
      const finalSortedSchedules = newData.schedules.sort((a, b) => {
        const timeA = a.hour * 60 + a.minute;
        const timeB = b.hour * 60 + b.minute;
        return timeA - timeB;
      });
      newData.schedules = finalSortedSchedules;
      setFormData(newData);
    }
  };

  function findMinSchedule(index: number): PillSchedule | undefined {
    if (index == 0)
      return undefined;

    const prev = formData.schedules[index - 1];
    return { hour: prev.hour + formData.minHoursBetweenIntakes, minute: prev.minute };
  };

  function findMaxSchedule(index: number): PillSchedule | undefined {
    if (index == formData.schedules.length - 1)
      return undefined;

    const next = formData.schedules[index + 1];
    return { hour: next.hour - formData.minHoursBetweenIntakes, minute: next.minute };
  };

  const today = createDateAtMidnight();
  const minDate = formData.treatmentDuration.startDate ?? today;
  const maxDate = createDateAtMidnight();
  maxDate.setFullYear(today.getFullYear() + 1);

  return (
    <SafeTopAreaThemedView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <GenericHeader
          title={t(isEditing ? "pills_edit.titleEdit" : "pills_edit.titleNew")}
          leftButton={<HeaderButton icon={<CloseIcon width={24} height={24} color={theme.text.primary} onPress={goBack()} />} />}
          rightButton={<HeaderButton icon={<Ionicons name="checkmark" size={24} color={theme.brand.primary} onPress={handleSave} />} />}
        />
        <KeyboardAvoidingView 
          style={styles.keyboardAvoid}
          behavior="padding"
          keyboardVerticalOffset={0}
          
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Ligne 1: Nom */}
            <FormField
              label={t("pills_edit.pillName")}
              icon={({ color, size }) => <Ionicons name="medical" size={size} color={color} />}
            >
              <ThemedTextInput
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                placeholder={t("pills_edit.pillNameExample")}
              />
            </FormField>

            {/* Ligne 2: Dosage + Unité (2 colonnes) */}
            <View style={styles.row}>
              <FormField
                label={t("pills_edit.dosage")}
                style={styles.column}
                icon={({ color, size }) => <MaterialCommunityIcons name="pill-multiple" size={size} color={color} />}
              >
                <ThemedTextInput
                  value={formData.dosage === 0 ? "" : formData.dosage.toString()}
                  onChangeText={(text) => {
                    if (text === "") {
                      setFormData({ ...formData, dosage: 0 });
                    } else {
                      const num = parseFloat(text);
                      if (!isNaN(num) && num >= 0) {
                        setFormData({ ...formData, dosage: num });
                      }
                    }
                  }}
                  type="number"
                  keyboardType="numeric"
                  placeholder="1"
                />
              </FormField>

              <FormField label={t("pills_edit.unity")} style={styles.column}>
                <ThemedWheelPicker
                  modalTitle={t("global.select")}
                  placeholder={t("global.select")}
                  items={unitItems}
                  selectedValue={formData.unit}
                  onValueChange={(value) => setFormData({ ...formData, unit: value })}
                />
              </FormField>
            </View>

            {/* Ligne 3: Horaires de prise */}
            <FormField
              label={t("pills_edit.schedules")}
              icon={({ color, size }) => <Ionicons name="time" size={size} color={color} />}
            >
              <View style={styles.chipsContainer}>
                {formData.schedules.map((schedule, index) => (
                  <ScheduleChip
                    key={index}
                    schedule={schedule}
                    variant="primary"
                    intensity="light"
                    isEditable={true}
                    minSchedule={findMinSchedule(index)}
                    maxSchedule={findMaxSchedule(index)}
                    onChange={(schedule) => handleScheduleChanged(index, schedule)}
                    onClose={() => handleRemoveSchedule(index)}
                  />
                ))}
                <ChipIcon
                  icon={({ color, size }) => <AddIcon width={size} height={size} color={color} />}
                  variant="primary"
                  intensity="light"
                  size={30}
                  onPress={handleAddSchedule}
                />
              </View>
            </FormField>

            {/* Ligne 4: Fenêtre de prise */}
            <FormField
              label={t("pills_edit.intakeWindow")}
              icon={({ color, size }) => <Ionicons name="hourglass" size={size} color={color} />}
            >
              <ThemedWheelPicker
                items={intakeWindowItems}
                selectedValue={formData.intakeWindowMinutes}
                onValueChange={(value) =>
                  setFormData({ ...formData, intakeWindowMinutes: value })
                }
              />
            </FormField>

            {/* Ligne 5: Temps entre deux prises */}
            <FormField
              label={t("pills_edit.timeBetweenIntakes")}
              icon={({ color, size }) => <Ionicons name="time-outline" size={size} color={color} />}
            >
              <ThemedWheelPicker
                modalTitle={t("global.select")}
                placeholder={t("global.select")}
                items={hoursBetweenIntakesItems}
                selectedValue={formData.minHoursBetweenIntakes}
                onValueChange={handleMinHoursBetweenIntakes}
              />
            </FormField>

            {/* Ligne 6: Durée du traitement */}
            <FormField
              label={t("pills_edit.treatmentDuration")}
              icon={({ color, size }) => <Ionicons name="calendar" size={size} color={color} />}
            >
              <View style={styles.switchRow}>
                <ThemedText style={{ color: theme.text.secondary }}>
                  {t("pills_edit.treatmentDurationLimited")}
                </ThemedText>
                <ThemedSwitch
                  value={hasEndDate}
                  onValueChange={(value) => {
                    setHasEndDate(value);
                    setFormData({
                      ...formData,
                      treatmentDuration: {
                        ...formData.treatmentDuration,
                        endDate: value ? createDateAtMidnight() : null,
                      },
                    });
                  }}
                />
              </View>

              {hasEndDate && (
                <ThemedCalendarPicker
                  mode="range"
                  range={{
                    startDate: formData.treatmentDuration.startDate,
                    endDate: formData.treatmentDuration.endDate,
                  }}
                  minDate={minDate}
                  maxDate={maxDate}
                  modalTitle={t("global.chooseDate")}
                  fromLabel={t("pills_edit.treatmentFrom")}
                  toLabel={t("pills_edit.treatmentTo")}
                  onChange={(payload: OnChangePayload) => {
                    if (payload.mode === "range") {
                      const rangePayload = (payload as RangePayload);
                      setFormData({
                        ...formData,
                        treatmentDuration: { startDate: rangePayload.range.startDate, endDate: rangePayload.range.endDate}
                      })
                    }
                    else {
                      const singlePayload = (payload as SinglePayload);
                      setFormData({
                        ...formData,
                        treatmentDuration: { startDate: singlePayload.date as Date, endDate: singlePayload.date as Date}
                      })
                    }
                  }}
                />
              )}
            </FormField>

            {/* Ligne 7: Gestion du stock (2 colonnes) */}
            <FormField
              label={t("pills_edit.stockManagement")}
              icon={({ color, size }) => <Ionicons name="cube" size={size} color={color} />}
            >
              <View style={styles.switchRow}>
                <ThemedText style={{ color: theme.text.secondary }}>
                  {t("pills_edit.enableStockManagement")}
                </ThemedText>
                <ThemedSwitch
                  value={formData.stockGesture}
                  onValueChange={(value) => {
                    setFormData({
                      ...formData,
                      stockGesture: value,
                    });
                  }}
                />
              </View>

              {formData.stockGesture && (
                <View style={styles.row}>
                  <FormField
                    label={t("pills_edit.quantityInStock")}
                    style={styles.column}
                    icon={({ color, size }) => <Ionicons name="cube-outline" size={size} color={color} />}
                  >
                    <ThemedTextInput
                      value={formData.stockQuantity ? formData.stockQuantity.toString() : ""}
                      onChangeText={(text) => {
                        if (text === "") {
                          setFormData({ ...formData, stockQuantity: 0 });
                        } 
                        else {
                          const num = parseInt(text);
                          if (!isNaN(num) && num >= 0) {
                            setFormData({ ...formData, stockQuantity: num });
                          }
                        }
                      }}
                      type="number"
                      keyboardType="numeric"
                      placeholder="0"
                    />
                  </FormField>

                  <FormField
                    label={t("pills_edit.alertThreshold")}
                    style={styles.column}
                    icon={({ color, size }) => <Ionicons name="alert-circle" size={size} color={color} />}
                  >
                    <ThemedTextInput
                      value={formData.reminderThreshold === 0 ? "" : formData.reminderThreshold.toString()}
                      onChangeText={(text) => {
                        if (text === "") {
                          setFormData({ ...formData, reminderThreshold: 0 });
                        } else {
                          const num = parseInt(text);
                          if (!isNaN(num) && num >= 0) {
                            setFormData({ ...formData, reminderThreshold: num });
                          }
                        }
                      }}
                      type="number"
                      keyboardType="numeric"
                      placeholder="5"
                    />
                  </FormField>
                </View>
              )}
            </FormField>

            {/* Bouton supprimer (mode édition uniquement) */}
            {isEditing && 
              <ThemedButton
                onPress={handleDelete}
                variant="error"
                icon={<TrashIcon width={24} height={24} color={theme.text.onBrand} />}
                containerStyle={{marginBottom: 32}}
              >
                {t("pills_edit.deletePill")}
              </ThemedButton>
            }
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      {/* Modale d'erreur */}
      <ThemedModal
        visible={errorModal.visible}
        onClose={() => setErrorModal({ visible: false, message: "" })}
        title={t("global.error")}
        description={errorModal.message}
        type="error"
        confirmText={t("global.ok")}
      />

      {/* Modale de confirmation de suppression */}
      <ThemedModal
        visible={deleteModal}
        onClose={() => setDeleteModal(false)}
        title={t("pills_edit.deletePill")}
        description={t("pills_edit.deletePillConfirmation", { name: formData.name })}
        type="error"
        confirmText={t("global.delete")}
        cancelText={t("global.cancel")}
        onConfirm={confirmDelete}
        showCancel={true}
      />

      {/* Modale de succès */}
      <ThemedModal
        visible={successModal.visible}
        onClose={() => setSucessModal({ visible: false, message: "" })}
        title={t("global.success")}
        description={successModal.message}
        type="info"
        confirmText={t("global.ok")}
      />
    </SafeTopAreaThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 0,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  column: {
    flex: 1,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  dateText: {
    fontSize: 14,
    marginTop: 8,
  },
});
