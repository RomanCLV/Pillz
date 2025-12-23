// hooks/usePills.ts
import { useData } from "@context/DataContext";
import { Pill } from "types/pill";

/**
 * Hook pour gérer la liste des médicaments
 */
export const usePills = () => {
  const { pills, setPills, loaded } = useData();

  /**
   * Ajoute un nouveau médicament
   */
  const addPill = async (pill: Pill) => {
    await setPills([...pills, pill]);
  };

  /**
   * Met à jour un médicament existant par son index
   */
  const updatePill = async (index: number, updatedPill: Pill) => {
    const newPills = pills.map((p, i) => (index === i ? updatedPill : p));
    await setPills(newPills);
  };

  /**
   * Met à jour un médicament existant par son nom
   */
  const updatePillByName = async (name: string, updatedPill: Pill) => {
    const newPills = pills.map((p) => (p.name === name ? updatedPill : p));
    await setPills(newPills);
  };

  /**
   * Supprime un médicament par son index
   */
  const deletePill = async (index: number) => {
    const newPills = pills.filter((_, i) => index !== i);
    await setPills(newPills);
  };

  /**
   * Supprime un médicament par son nom
   */
  const deletePillByName = async (name: string) => {
    const newPills = pills.filter((p) => p.name !== name);
    await setPills(newPills);
  };

  const deletePills = async (index: number[]) => {
    const newPills = pills.filter((_, i) => !index.includes(i));
    await setPills(newPills);
  };

  /**
   * Récupère un médicament par son nom
   */
  const getPillByName = (name: string): Pill | undefined => {
    return pills.find((p) => p.name === name);
  };

  /**
   * Remplace toute la liste de médicaments
   */
  const saveAllPills = async (newPills: Pill[]) => {
    await setPills(newPills);
  };

  /**
   * Met à jour la quantité en stock d'un médicament par son index
   */
  const updateStock = async (index: number, newQuantity: number) => {
    const pill = pills[index];
    if (pill) {
      await updatePill(index, { ...pill, stockQuantity: newQuantity });
    }
  };

  /**
   * Met à jour la quantité en stock d'un médicament par son nom
   */
  const updateStockByName = async (name: string, newQuantity: number) => {
    const pill = getPillByName(name);
    if (pill) {
      await updatePillByName(name, { ...pill, stockQuantity: newQuantity });
    }
  };

  /**
   * Décrémente le stock après une prise par son index
   */
  const decrementStock = async (index: number, amount: number = 1) => {
    const pill = pills[index];
    if (pill && pill.stockGesture) {
      const newQuantity = Math.max(0, pill.stockQuantity - amount);
      await updateStock(index, newQuantity);
    }
  };

  /**
   * Décrémente le stock après une prise par son nom
   */
  const decrementStockByName = async (name: string, amount: number = 1) => {
    const pill = getPillByName(name);
    if (pill && pill.stockGesture) {
      const newQuantity = Math.max(0, pill.stockQuantity - amount);
      await updateStockByName(name, newQuantity);
    }
  };

  return {
    pills,
    loaded,
    addPill,
    updatePill,
    updatePillByName,
    deletePill,
    deletePillByName,
    deletePills,
    getPillByName,
    saveAllPills,
    updateStock,
    updateStockByName,
    decrementStock,
    decrementStockByName,
  };
};