import React from "react";
import { Chip } from "@components/Chip";
import { formatSchedule, PillSchedule } from "types/pill";

interface ScheduleChipProps {
  schedule: PillSchedule;
  variant?: "primary" | "secondary" | "accent";
  intensity?: "light" | "solid";
}

export function ScheduleChip({ 
  schedule, 
  variant = "primary",
  intensity = "light"
}: ScheduleChipProps) {
  return (
    <Chip variant={variant} intensity={intensity}>
      {formatSchedule(schedule)}
    </Chip>
  );
}
