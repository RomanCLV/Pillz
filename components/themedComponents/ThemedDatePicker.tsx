import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import BottomSheetModal from "@components/themedComponents/ThemedBottomSheetModal";
import ThemedText from "./ThemedText";
import { DatePicker } from "@quidone/react-native-wheel-picker";
import { useTheme } from "@hooks/useTheme";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import { FontAwesome } from "@expo/vector-icons";

// Helpers YYYY-MM-DD - CORRIGÉ pour gérer les fuseaux horaires
const toOnlyDateFormat = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const fromOnlyDateFormat = (s: string): Date => {
  // Parse manuel pour éviter les problèmes de timezone
  const [year, month, day] = s.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0); // Midi pour éviter les changements de jour
};

// Comparer seulement les dates (année/mois/jour) sans l'heure
const isSameDay = (date1: Date, date2: Date): boolean => {
  return toOnlyDateFormat(date1) === toOnlyDateFormat(date2);
};

const isBeforeDay = (date1: Date, date2: Date): boolean => {
  return toOnlyDateFormat(date1) < toOnlyDateFormat(date2);
};

const isAfterDay = (date1: Date, date2: Date): boolean => {
  return toOnlyDateFormat(date1) > toOnlyDateFormat(date2);
};

export interface ThemedDatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  style?: ViewStyle;
  headerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
}

export default function ThemedDatePicker({
  value,
  onChange,
  minDate,
  maxDate,
  placeholder = "Sélectionner une date",
  style,
  headerStyle,
  contentStyle,
}: ThemedDatePickerProps) {
  const theme = useTheme();
  const language = useCurrentLanguage();
  const locale = language ?? "en-US";

  const [visible, setVisible] = useState(false);
  const [tempDate, setTempDate] = useState(
    value ? toOnlyDateFormat(value) : toOnlyDateFormat(new Date())
  );

  // Initialiser tempDate quand le modal s'ouvre
  const handleOpen = () => {
    const initialDate = value ? toOnlyDateFormat(value) : toOnlyDateFormat(new Date());
    setTempDate(initialDate);
    setVisible(true);
  };

  return (
    <>
      <TouchableOpacity
        onPress={handleOpen}
        style={[
          styles.selector,
          {
            borderColor: theme.border.light,
            backgroundColor: theme.background.surface,
          },
          style,
        ]}
      >
        <ThemedText
          style={[
            styles.text,
            !value && { color: theme.text.tertiary },
          ]}
        >
          {value ? value.toLocaleDateString(locale) : placeholder}
        </ThemedText>

        <FontAwesome name="angle-down" color={theme.text.tertiary} size={20} />
      </TouchableOpacity>

      <BottomSheetModal
        visible={visible}
        onClose={() => setVisible(false)}
        height={300}
        header={{
          title: "Sélectionner une date",
          onCancel: () => {
            setVisible(false);
          },
          onConfirm: () => {
            const d = fromOnlyDateFormat(tempDate);
            onChange(d);
            setVisible(false);
          },
        }}
        headerStyle={headerStyle}
        contentStyle={contentStyle}
      >
        <DatePicker
          date={tempDate}
          onDateChanged={({ date }) => {
            const d = fromOnlyDateFormat(date);

            // Vérification dynamique avec comparaison correcte
            if (minDate && isBeforeDay(d, minDate)) return;
            if (maxDate && isAfterDay(d, maxDate)) return;

            setTempDate(date);
          }}
          locale={locale}
          minDate={minDate ? toOnlyDateFormat(minDate) : undefined}
          maxDate={maxDate ? toOnlyDateFormat(maxDate) : undefined}
          itemHeight={48}
          visibleItemCount={5}
          itemTextStyle={{ color: theme.text.primary, fontSize: 18 }}
        />
      </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  selector: {
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});
