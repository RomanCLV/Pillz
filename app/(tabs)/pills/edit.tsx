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

  const intakeWindowItems: PickerItem[] = INTAKE_WINDOW_OPTIONS.map((minutes) => ({
    label: formatIntakeWindow(minutes),
    value: minutes,
  }));

  const handleSave = () => {
    // Validation
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
    // TODO: Ouvrir un modal/picker pour ajouter un horaire
    const newSchedule: PillSchedule = { hour: 8, minute: 0 };
    setFormData({
      ...formData,
      schedules: [...formData.schedules, newSchedule],
    });
  };

  const handleRemoveSchedule = (index: number) => {
    setFormData({
      ...formData,
      schedules: formData.schedules.filter((_, i) => i !== index),
    });
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
          leftButton={<HeaderButton icon={<CloseIcon width={24} height={24} color={theme.text.primary} />} />}
          rightButton={<HeaderButton icon={<Ionicons name="checkmark" size={24} color={theme.brand.primary} />} />}
          onLeftPress={() => router.back()}
          onRightPress={handleSave}
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

          {/* Ligne 5: Durée du traitement */}
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

          {/* Ligne 6: Gestion du stock (2 colonnes) */}
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