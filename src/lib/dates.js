const MONTHS = {
  enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5, julio: 6,
  agosto: 7, septiembre: 8, setiembre: 8, octubre: 9, noviembre: 10, diciembre: 11,
};

export const ONGOING = /actualidad|present/i;

// Fecha → año con decimales (2024.42 ≈ junio de 2024).
export function yearFraction(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 1);
  const next = new Date(date.getFullYear() + 1, 0, 1);
  return date.getFullYear() + (date - start) / (next - start);
}

// Convierte un periodo en español ("4 de Junio de 2024 - 27 de Mayo de 2025",
// "2023 - 2026", "12 de Enero de 2026 - Actualidad") en { start, end }.
export function parsePeriod(period = "") {
  const ongoing = ONGOING.test(period);
  const dates = [...period.matchAll(/(?:(\d{1,2})\s+de\s+)?([a-záéíóú]+)\s+de\s+(\d{4})/gi)]
    .map(([, day, month, year]) => {
      const m = MONTHS[month.toLowerCase()];
      if (m === undefined) return null;
      return Number(year) + (m + ((Number(day) || 1) - 1) / 30) / 12;
    })
    .filter((v) => v !== null);

  if (dates.length) {
    return { start: dates[0], end: dates[1] ?? (ongoing ? yearFraction() : dates[0] + 1 / 12), ongoing };
  }

  const years = (period.match(/\d{4}/g) || []).map(Number);
  if (!years.length) return null;
  const [from, to] = years;
  return {
    start: from,
    end: ongoing ? yearFraction() : to && to !== from ? to : from + 1,
    ongoing,
  };
}
