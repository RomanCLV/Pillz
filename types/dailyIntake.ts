import { DosageUnit } from "./pill";
import { ScheduleIntake } from "./dailySummary";

export interface DailyIntake {
  name: string;
  dosage: number;
  unit: DosageUnit;
  schedule: ScheduleIntake;
  canTakeNow: boolean;
  timeAlmostDue: boolean;
}
