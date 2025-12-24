export function toDayKey(date: Date): string 
{
  return date.toISOString().split("T")[0];
}

export function normalizeDate(date: Date): Date { 
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
} 

export function createDateAtNoon(baseDate: Date = new Date()): Date {
  const date = new Date(baseDate);
  date.setHours(12, 0, 0, 0);
  return date;
}
