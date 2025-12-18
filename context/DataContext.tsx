// context/DataContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { Pill } from "types/pill";
//import { DailySummary } from "types/dailySummary";
import { DailyPillSummary, DailySummary, IntakeStatus, ScheduleIntake } from "types/dailySummary";

import {
  loadPills,
  savePills,
  loadDailySummaries,
  saveDailySummaries,
} from "@utils/dataStorage";

type DataContextValue = {
  // Pills
  pills: Pill[];
  setPills: (pills: Pill[]) => Promise<void>;
  
  // Daily Summaries
  summaries: DailySummary[];
  setSummaries: (summaries: DailySummary[]) => Promise<void>;
  
  // État de chargement
  loaded: boolean;
};

const DataContext = createContext<DataContextValue | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [pills, setPillsState] = useState<Pill[]>([]);
  const [summaries, setSummariesState] = useState<DailySummary[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Chargement initial
  useEffect(() => {
    (async () => {
      const [loadedPills, loadedSummaries] = await Promise.all([
        loadPills(),
        loadDailySummaries(),
      ]);

      setupDailySummaries(loadedSummaries, loadedPills);
      console.log("summaries after setup:")
      console.log(loadedSummaries);

      setPillsState(loadedPills);
      setSummariesState(loadedSummaries);
      setLoaded(true);
    })();
  }, []);

  // Méthodes pour mettre à jour et sauvegarder
  const setPills = async (newPills: Pill[]) => {
    setPillsState(newPills);
    await savePills(newPills);
  };

  const setSummaries = async (newSummaries: DailySummary[]) => {
    setSummariesState(newSummaries);
    await saveDailySummaries(newSummaries);
  };

  const setupDailySummaries =  (dailySummaries: DailySummary[], pills: Pill[]) => {
    const today = new Date().toISOString().split("T")[0];
    const item = dailySummaries.find(item => item.date == today);

    console.log("setupDailySummaries:");
    console.log("today:", today);
    console.log("item found:", item);

    if (item == null)
    {
      const newItem: DailySummary = {
        date: today,
        pills: pills.map(pill => { return {
          name: pill.name,
          dosage: pill.dosage,
          unit: pill.unit,
          intakes: pill.schedules.map(pillSchedule => { return {
                schedule: pillSchedule,
                status: IntakeStatus.PENDING,
              } as ScheduleIntake}),
            } as DailyPillSummary} 
          ),
      };
      console.log("newItem:", newItem);
      dailySummaries.push(newItem);
    }
  };

  return (
    <DataContext.Provider
      value={{
        pills,
        setPills,
        summaries,
        setSummaries,
        loaded,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error("useData must be used inside DataProvider");
  }
  return ctx;
};
