// context/DataContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { Pill } from "types/pill";
import { DailySummary } from "types/dailySummary";

import {
  loadPills,
  savePills,
  loadDailySummaries,
  saveDailySummaries,
  cleanAndSortSummaries,
  loadLastPillEditDate,
} from "@utils/dataStorage";

type DataContextValue = {
  // Pills
  pills: Pill[];
  setPills: (pills: Pill[]) => Promise<void>;
  
  // Daily Summaries
  summaries: DailySummary[];
  setSummaries: (summaries: DailySummary[]) => Promise<void>;
  
  // Last Pill Edit Date
  lastPillEditDate: Date | null;

  // État de chargement
  loaded: boolean;
};

const DataContext = createContext<DataContextValue | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [pills, setPillsState] = useState<Pill[]>([]);
  const [summaries, setSummariesState] = useState<DailySummary[]>([]);
  const [lastPillEditDate, setLastPillEditDateState] = useState<Date | null>(null);
  const [loaded, setLoaded] = useState(false);

 // Chargement initial
  useEffect(() => {
    (async () => {
      const [loadedPills, loadedSummaries, loadedLastPillEditDate] = await Promise.all([
        loadPills(),
        loadDailySummaries(),
        loadLastPillEditDate(),
      ]);

      // Nettoyage et tri une seule fois au démarrage
      const cleanedSummaries = cleanAndSortSummaries(loadedSummaries);
      
      setPillsState(loadedPills);
      
      // Sauvegarder les summaries nettoyés
      await setSummaries(cleanedSummaries);

      // Dernière date de modification des pillules
      setLastPillEditDateState(loadedLastPillEditDate);
      
      setLoaded(true);
    })();
  }, []);

  // Méthodes pour mettre à jour et sauvegarder
  const setPills = async (newPills: Pill[]) => {
    setPillsState(newPills);
    await savePills(newPills);
    // Mettre à jour la date dans le contexte
    setLastPillEditDateState(new Date());
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
        lastPillEditDate,
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
