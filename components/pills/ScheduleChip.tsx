import React from "react";
import Chip from "@components/Chip";
import { formatSchedule, PillSchedule } from "types/pill";

type ColorVariant = "primary" | "secondary" | "accent" | "highlight";
type IntensityVariant = "light" | "solid";

interface ScheduleChipProps {
  schedule: PillSchedule;
  variant?: ColorVariant;
  intensity?: IntensityVariant;
  onPress?: () => void;
  onClose?: () => void;
}

export default function ScheduleChip({ 
  schedule, 
  variant = "primary",
  intensity = "light",
  onPress,
  onClose,
}: ScheduleChipProps) {
  return (
    <Chip variant={variant} intensity={intensity} onPress={onPress} onClose={onClose}>
      {formatSchedule(schedule)}
    </Chip>
  );
}
