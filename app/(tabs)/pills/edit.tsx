import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import SafeTopAreaThemedView from "@components/themedComponents/SafeTopAreaThemedView";
import ThemedButton from "@components/themedComponents/ThemedButton";
import ThemedSwitch from "@components/themedComponents/ThemedSwitch";
import ThemedText from "@components/themedComponents/ThemedText";
import ThemedTextInput from "@components/themedComponents/ThemedTextInput";
import ThemedPicker, { PickerItem } from "@components/themedComponents/ThemedPicker";
import GenericHeader from "@components/headers/GenericHeader";
import FormField from "@components/FormField";
import ChipIcon from "@components/ChipIcon";
import ScheduleChip from "@components/pills/ScheduleChip";
import { useTheme } from "@hooks/useTheme";
import { t } from "@i18n/t";
import AddIcon from "@assets/icons/add.svg";
import CloseIcon from "@assets/icons/close.svg";
import TrashIcon from "@assets/icons/trash.svg";
import { 
  Pill, 
  DosageUnit, 
  PillSchedule, 
  createDefaultPill,
  validateSchedules,
  INTAKE_WINDOW_OPTIONS,
  formatIntakeWindow,
} from "types/pill";
import HeaderButton from "@components/headers/HeaderButton";
import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter";
import ThemedDatePicker from "@components/themedComponents/ThemedDatePicker";

export default function EditPillScreen() {
  const router = useRouter();
  const theme = useTheme();
  const params = useLocalSearchParams();
  const isEditing = !!params.id;

  const getUnitLabel = (unit: DosageUnit): string => {
    const label = t(`pill.unit.${unit}`);
    return (unit !== DosageUnit.MG && unit !== DosageUnit.ML) ? capitalizeFirstLetter(label) : label;
  };

  // État du formulaire
  const [formData, setFormData] = useState<Omit<Pill, "id">>(createDefaultPill());
  const [hasEndDate, setHasEndDate] = useState(false);

  const units = Object.values(DosageUnit);

  // Préparer les items pour les pickers
  const unitItems: PickerItem[] = units.map((unit) => ({
    label: getUnitLabel(unit),
    value: unit,
  }));

  let hoursBetweenIntakesItems = [];
  for (let i = 0; i < 23; i++)
  {
    hoursBetweenIntakesItems.push({
      label: formatIntakeWindow((i+1) * 60),
      value: i+1
    });
  }

  const intakeWindowItems: PickerItem[] = INTAKE_WINDOW_OPTIONS.map((minutes) => ({
    label: formatIntakeWindow(minutes),
    value: minutes,
  }));

  const handleSave = () => {
    // Validation
    console.log("handleSave");
    console.log(formData);
    
    if (!formData.name.trim()) {
      Alert.alert("Erreur", "Veuillez entrer un nom de médicament");
      return;
    }

    if (formData.schedules.length === 0) {
      Alert.alert("Erreur", "Veuillez ajouter au moins un horaire de prise");
      return;
    }

    if (!validateSchedules(formData.schedules, formData.minHoursBetweenIntakes)) {
      Alert.alert(
        "Erreur",
        `Les horaires ne respectent pas l"intervalle minimal de ${formData.minHoursBetweenIntakes}h`
      );
      return;
    }

    // TODO: Sauvegarder le médicament
    console.log("Saving pill:", formData);
    router.back();
  };

  const handleDelete = () => {
    Alert.alert(
      "Supprimer",
      "Êtes-vous sûr de vouloir supprimer ce médicament ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => {
            // TODO: Supprimer le médicament
            router.back();
          },
        },
      ]
    );
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
        Alert.alert(
          "Impossible d'ajouter",
          `Impossible d'ajouter un nouvel horaire. L'intervalle minimal de ${formData.minHoursBetweenIntakes}h n'est pas respecté.`
        );
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
      Alert.alert(
        "Horaire existant",
        "Cet horaire existe déjà."
      );
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

  const handleEditSchedule = (index: number) => {
    console.log("edit:", index);
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

  const today = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(today.getFullYear() + 1);

  return (
    <SafeTopAreaThemedView style={styles.container}>
      <View style={styles.content}>

        {/* Header */}
        <GenericHeader
          title={isEditing ? "Modifier le médicament" : "Nouveau médicament"}
          leftButton={<HeaderButton icon={<CloseIcon width={24} height={24} color={theme.text.primary} onPress={router.back} />} />}
          rightButton={<HeaderButton icon={<Ionicons name="checkmark" size={24} color={theme.brand.primary} onPress={handleSave} />} />}
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Ligne 1: Nom */}
          <FormField
            label="Nom du médicament"
            icon={({ color, size }) => <Ionicons name="medical" size={size} color={color} />}
          >
            <ThemedTextInput
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Ex: Doliprane"
            />
          </FormField>

          {/* Ligne 2: Dosage + Unité (2 colonnes) */}
          <View style={styles.row}>
            <FormField
              label="Dosage"
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

            <FormField label="Unité" style={styles.column}>
              <ThemedPicker
                items={unitItems}
                selectedValue={formData.unit}
                onValueChange={(value) => setFormData({ ...formData, unit: value })}
              />
            </FormField>
          </View>

          {/* Ligne 3: Horaires de prise */}
          <FormField
            label="Horaires de prise"
            icon={({ color, size }) => <Ionicons name="time" size={size} color={color} />}
          >
            <View style={styles.chipsContainer}>
              {formData.schedules.map((schedule, index) => (
                <ScheduleChip
                  key={index}
                  schedule={schedule}
                  variant="primary"
                  intensity="light"
                  onPress={() => handleEditSchedule(index)}
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
            label="Durée pour prendre le médicament"
            icon={({ color, size }) => <Ionicons name="hourglass" size={size} color={color} />}
          >
            <ThemedPicker
              items={intakeWindowItems}
              selectedValue={formData.intakeWindowMinutes}
              onValueChange={(value) =>
                setFormData({ ...formData, intakeWindowMinutes: value })
              }
            />
          </FormField>

          {/* Ligne 5: Temps entre deux prises */}
          <FormField
            label="Durée minimale entre deux prises"
            icon={({ color, size }) => <Ionicons name="time-outline" size={size} color={color} />}
          >
            <ThemedPicker
              items={hoursBetweenIntakesItems}
              selectedValue={formData.minHoursBetweenIntakes}
              onValueChange={handleMinHoursBetweenIntakes}
            />
          </FormField>

          {/* Ligne 6: Durée du traitement */}
          <FormField
            label="Durée du traitement"
            icon={({ color, size }) => <Ionicons name="calendar" size={size} color={color} />}
          >
            <View style={styles.switchRow}>
              <ThemedText style={{ color: theme.text.secondary }}>
                Traitement à durée limitée
              </ThemedText>
              <ThemedSwitch
                value={hasEndDate}
                onValueChange={(value) => {
                  setHasEndDate(value);
                  setFormData({
                    ...formData,
                    treatmentDuration: {
                      ...formData.treatmentDuration,
                      endDate: value ? new Date() : null,
                    },
                  });
                }}
              />
            </View>

            {hasEndDate && (
              <ThemedDatePicker
                value={formData.treatmentDuration.endDate}
                onChange={(date) => 
                  setFormData({
                    ...formData,
                    treatmentDuration: {
                      ...formData.treatmentDuration,
                      endDate: date,
                    },
                  })
                }
                placeholder="Choisir une date"
                minDate={today}
                //maxDate={maxDate}
              />
            )}
          </FormField>

          {/* Ligne 7: Gestion du stock (2 colonnes) */}
          <View style={styles.row}>
            <FormField
              label="Quantité en stock"
              style={styles.column}
              icon={({ color, size }) => <Ionicons name="cube" size={size} color={color} />}
            >
              <ThemedTextInput
                value={formData.stockQuantity === 0 ? "" : formData.stockQuantity.toString()}
                onChangeText={(text) => {
                  if (text === "") {
                    setFormData({ ...formData, stockQuantity: 0 });
                  } else {
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
              label="Seuil d'alerte"
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

          {/* Bouton supprimer (mode édition uniquement) */}
          {isEditing && (
            <ThemedButton
                onPress={handleDelete}
                style={[styles.deleteButton, { backgroundColor: theme.brand.error }]}
                icon={<TrashIcon width={24} height={24} color={theme.text.onBrand} />}
              >
                Supprimer ce médicament
              </ThemedButton>
          )}
        </ScrollView>
      </View>
    </SafeTopAreaThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    paddingBottom: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 16,
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
  deleteButton: {
    marginTop: 24,
    marginBottom: 32,
  },
});