import React, { useState } from "react";
import { StyleSheet, ScrollView, View, TextInput, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "@hooks/useTheme";
import SafeTopAreaThemedView from "@components/themedComponents/SafeTopAreaThemedView";
import ThemedButton from "@components/themedComponents/ThemedButton";
import ThemedSwitch from "@components/themedComponents/ThemedSwitch";
import ThemedText from "@components/themedComponents/ThemedText";
import ThemedView from "@components/themedComponents/ThemedView";
import GenericHeader from "@components/headers/GenericHeader";
import HeaderButton from "@components/headers/HeaderButton";
import { Chip } from "@components/Chip";
import { FormField } from "@components/FormField";
import { ScheduleChip } from "@components/pills/ScheduleChip";
import Spacer from "@components/Spacer";
import { 
  Pill, 
  DosageUnit, 
  PillSchedule, 
  createDefaultPill,
  validateSchedules,
  INTAKE_WINDOW_OPTIONS,
  formatIntakeWindow,
} from "types/pill";
import { t } from "@i18n/t";
import AddIcon from "@icons/add.svg"
import CloseIcon from "@icons/close.svg"
import TrashIcon from "@icons/trash.svg"
import { ChipIcon } from "@components/ChipIcon";

export default function EditPillScreen() {
  const router = useRouter();
  const theme = useTheme();
  const params = useLocalSearchParams();
  const isEditing = !!params.id;

  // État du formulaire
  const [formData, setFormData] = useState<Omit<Pill, "id">>(createDefaultPill());
  const [hasEndDate, setHasEndDate] = useState(false);

  const units = Object.values(DosageUnit);

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

  const getUnitLabel = (unit: DosageUnit): string => {
    return t(`pill.unit.${unit}`);
  };

  return (
    <SafeTopAreaThemedView style={{ flex: 1 }}>
      <ThemedView style={[styles.container, { backgroundColor: theme.background.primary }]}>
        {/* Header */}
        <GenericHeader
          title={isEditing ? "Modifier le médicament" : "Nouveau médicament"}
          leftButton={<HeaderButton icon={<CloseIcon width={24} height={24} color={theme.text.primary} />} />}
          rightButton={<HeaderButton icon={<Ionicons name="checkmark" size={24} color={theme.brand.primary} />} />}
          onLeftPress={() => router.back()}
          onRightPress={handleSave}
        />
        <Spacer height={24}/>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Ligne 1: Nom */}
          <FormField
            label="Nom du médicament"
            icon={({ color, size }) => <Ionicons name="medical" size={size} color={color} />}
          >
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.background.surface,
                  color: theme.text.primary,
                  borderColor: theme.border.light,
                },
              ]}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Ex: Doliprane"
              placeholderTextColor={theme.text.tertiary}
            />
          </FormField>

          {/* Ligne 2: Dosage + Unité (2 colonnes) */}
          <View style={styles.row}>
            <FormField
              label="Dosage"
              style={styles.column}
              icon={({ color, size }) => <MaterialCommunityIcons name="pill-multiple" size={size} color={color} />}
            >
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.background.surface,
                    color: theme.text.primary,
                    borderColor: theme.border.light,
                  },
                ]}
                value={formData.dosage.toString()}
                onChangeText={(text) => {
                  const num = parseFloat(text) || 0;
                  if (num >= 0) {
                    setFormData({ ...formData, dosage: num });
                  }
                }}
                keyboardType="numeric"
                placeholder="1"
                placeholderTextColor={theme.text.tertiary}
              />
            </FormField>

            <FormField label="Unité" style={styles.column}>
              <View
                style={[
                  styles.pickerContainer,
                  {
                    backgroundColor: theme.background.surface,
                    borderColor: theme.border.light,
                  },
                ]}
              >
                <Picker
                  selectedValue={formData.unit}
                  onValueChange={(value) => setFormData({ ...formData, unit: value })}
                  style={[styles.picker, { color: theme.text.primary }]}
                >
                  {units.map((unit) => (
                    <Picker.Item key={unit} label={getUnitLabel(unit)} value={unit} />
                  ))}
                </Picker>
              </View>
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
                  onPress={() => console.log("Press schedule:", index) }
                  onClose={() => handleRemoveSchedule(index)}
                />
              ))}
              <ChipIcon variant="primary" intensity="light" onPress={handleAddSchedule} size={30}
                icon={({size, color}) => <AddIcon width={size} height={size} color={color}/>}
              />
            </View>
          </FormField>

          {/* Ligne 4: Fenêtre de prise */}
          <FormField
            label="Durée pour prendre le médicament"
            icon={({ color, size }) => <Ionicons name="hourglass" size={size} color={color} />}
          >
            <View
              style={[
                styles.pickerContainer,
                {
                  backgroundColor: theme.background.surface,
                  borderColor: theme.border.light,
                },
              ]}
            >
              <Picker
                selectedValue={formData.intakeWindowMinutes}
                onValueChange={(value) =>
                  setFormData({ ...formData, intakeWindowMinutes: value })
                }
                style={[styles.picker, { color: theme.text.primary }]}
              >
                {INTAKE_WINDOW_OPTIONS.map((minutes) => (
                  <Picker.Item
                    key={minutes}
                    label={formatIntakeWindow(minutes)}
                    value={minutes}
                  />
                ))}
              </Picker>
            </View>
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
              <ThemedText style={[styles.dateText, { color: theme.text.secondary }]}>
                Jusqu"au: {formData.treatmentDuration.endDate?.toLocaleDateString()}
              </ThemedText>
            )}
          </FormField>

          {/* Ligne 6: Gestion du stock (2 colonnes) */}
          <View style={styles.row}>
            <FormField
              label="Quantité en stock"
              style={styles.column}
              icon={({ color, size }) => <Ionicons name="cube" size={size} color={color} />}
            >
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.background.surface,
                    color: theme.text.primary,
                    borderColor: theme.border.light,
                  },
                ]}
                value={formData.stockQuantity.toString()}
                onChangeText={(text) => {
                  const num = parseInt(text) || 0;
                  if (num >= 0) {
                    setFormData({ ...formData, stockQuantity: num });
                  }
                }}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor={theme.text.tertiary}
              />
            </FormField>

            <FormField
              label="Seuil d'alerte"
              style={styles.column}
              icon={({ color, size }) => <Ionicons name="alert-circle" size={size} color={color} />}
            >
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.background.surface,
                    color: theme.text.primary,
                    borderColor: theme.border.light,
                  },
                ]}
                value={formData.reminderThreshold.toString()}
                onChangeText={(text) => {
                  const num = parseInt(text) || 0;
                  if (num >= 0) {
                    setFormData({ ...formData, reminderThreshold: num });
                  }
                }}
                keyboardType="numeric"
                placeholder="5"
                placeholderTextColor={theme.text.tertiary}
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
      </ThemedView>
    </SafeTopAreaThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollView: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  column: {
    flex: 1,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  picker: {
    height: 50,
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
