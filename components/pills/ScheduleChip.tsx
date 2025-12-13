import React, {useState, useEffect, useMemo} from "react";
import Chip from "@components/Chip";
import { formatSchedule, PillSchedule } from "types/pill";
import WheelPicker, {
  type PickerItem,
  usePickerControl,
  withPickerControl,
  useOnPickerValueChangedEffect,
} from "@quidone/react-native-wheel-picker";
import ThemedBottomSheetModal from "@themedComponents/ThemedBottomSheetModal"
import { View } from "react-native";
import { useTheme } from "@hooks/useTheme";

const ControlPicker = withPickerControl(WheelPicker);

type ColorVariant = "primary" | "secondary" | "accent" | "highlight";
type IntensityVariant = "light" | "solid";

interface ScheduleChipProps {
  schedule: PillSchedule;
  variant?: ColorVariant;
  intensity?: IntensityVariant;
  isEditable?: boolean;
  minSchedule?: PillSchedule;
  maxSchedule?: PillSchedule;
  onChange?: (schedule: PillSchedule) => void;
  onClose?: () => void;
}

type SchedulePickerMap = {
  hour: { item: PickerItem<number> };
  minute: { item: PickerItem<number> };
};

const HOURS: PickerItem<number>[] = Array.from({ length: 24 }, (_, h) => ({
  label: h.toString().padStart(2, "0"),
  value: h,
}));

const MINUTES: PickerItem<number>[] = Array.from({ length: 60 }, (_, m) => ({
  label: m.toString().padStart(2, "0"),
  value: m,
}));

const toMinutes = (s: PillSchedule) => s.hour * 60 + s.minute;

const isScheduleValid = (
  value: PillSchedule,
  min?: PillSchedule,
  max?: PillSchedule
) => {
  const v = toMinutes(value);
  if (min && v < toMinutes(min)) return false;
  if (max && v > toMinutes(max)) return false;
  return true;
};

export default function ScheduleChip({
  schedule,
  variant = "primary",
  intensity = "light",
  isEditable = false,
  minSchedule,
  maxSchedule,
  onChange,
  onClose,
}: ScheduleChipProps) {
  const [visible, setVisible] = useState(false);

  const [temp, setTemp] = useState<PillSchedule>(schedule);

  const theme = useTheme();

  const isValid = useMemo(() => isScheduleValid(temp, minSchedule, maxSchedule), [temp, minSchedule, maxSchedule]);

  useEffect(() => {
    setTemp(schedule);
  }, [schedule]);

  const pickerControl = usePickerControl<SchedulePickerMap>();

  useOnPickerValueChangedEffect(pickerControl, (event) => {
    setTemp({
      hour: event.pickers.hour.item.value,
      minute: event.pickers.minute.item.value,
    });
  });

  const openEditor = () => {
    if (!isEditable) return;
    setTemp(schedule);
    setVisible(true);
  };

  return (
    <>
      <Chip
        variant={variant}
        intensity={intensity}
        onPress={isEditable ? openEditor : undefined}
        onClose={onClose}
      >
        {formatSchedule(schedule)}
      </Chip>

      <ThemedBottomSheetModal
        visible={visible}
        onClose={() => setVisible(false)}
        height={280}
        header={{
          title: "Modifier l'horaire",
          canConfirm: isValid,
          onCancel: () => {
            setTemp(schedule);
            setVisible(false);
          },
          onConfirm: () => {
            if (!isValid) return;
            onChange?.(temp);
            setVisible(false);
          },
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <ControlPicker
            control={pickerControl}
            pickerName="hour"
            data={HOURS}
            value={temp.hour}
            itemHeight={48}
            visibleItemCount={5}
            width={80}
            itemTextStyle={{color: theme.text.primary}}
          />

          <ControlPicker
            control={pickerControl}
            pickerName="minute"
            data={MINUTES}
            value={temp.minute}
            itemHeight={48}
            visibleItemCount={5}
            width={80}
            itemTextStyle={{color: theme.text.primary}}
          />
        </View>
      </ThemedBottomSheetModal>
    </>
  );
}
