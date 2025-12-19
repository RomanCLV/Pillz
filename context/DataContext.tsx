// context/DataContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { Pill } from "types/pill";
import { DailySummary } from "types/dailySummary";

import {
  loadPills,
  savePills,
  loadDailySummaries,
  saveDailySummaries,
} from "@utils/dataStorage";
import { useSummaries } from "@hooks/useSummaries";

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

      setPillsState(loadedPills);
      setSummaries(loadedSummaries); // set to state and save
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
