import React, { useState } from "react";
import { PillSchedule } from "types/pill";
import Chip from "@components/Chip";
import { useT } from "@i18n/useT";

type ColorVariant = "primary" | "secondary" | "accent" | "highlight" | "error";
type IntensityVariant = "light" | "solid";

interface DualScheduleChipProps {
  schedules: [PillSchedule, PillSchedule]; // [théorique, réelle]
  activeIndex?: 0 | 1; // Index du schedule à afficher par défaut
  variant?: ColorVariant;
  intensity?: IntensityVariant;
  labels?: [string, string]; // Labels optionnels pour différencier les horaires
}

export default function DualScheduleChip({
  schedules,
  activeIndex = 0,
  variant = "primary",
  intensity = "light",
  labels,
}: DualScheduleChipProps) {
  const t = useT();
  const [currentIndex, setCurrentIndex] = useState<0 | 1>(activeIndex);

  const formatSchedule = (schedule: PillSchedule) =>
    t("hours.hh2dmm", {
      h: schedule.hour.toString().padStart(2, "0"),
      m: schedule.minute.toString().padStart(2, "0"),
    });

  const toggleSchedule = () => {
    setCurrentIndex((prev) => (prev === 0 ? 1 : 0) as 0 | 1);
  };

  const displayedSchedule = schedules[currentIndex];
  const label = labels?.[currentIndex];

  return (
    <Chip
      variant={variant}
      intensity={intensity}
      onPress={toggleSchedule}
    >
      {label ? `${label} ${formatSchedule(displayedSchedule)}` : formatSchedule(displayedSchedule)}
    </Chip>
  );
}
