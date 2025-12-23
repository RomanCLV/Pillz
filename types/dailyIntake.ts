import { DosageUnit } from "./pill";
import { ScheduleIntake } from "./dailySummary";

export interface DailyIntake {
  name: string;
  dosage: number;
  unit: DosageUnit;
  schedule: ScheduleIntake;
  canAlmostTake: boolean;
  canTakeNow: boolean;
  timeAlmostDue: boolean;
}
