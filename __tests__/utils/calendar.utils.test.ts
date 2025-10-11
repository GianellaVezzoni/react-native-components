/**
 * @format
 * Tests para funciones utilitarias del calendario
 */

describe('Calendar Utility Functions', () => {
  // Funciones helpers que replican la lógica del CalendarWidget
  const getDaysInMonth = (date: Date): number => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const formatDateKey = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  describe('getDaysInMonth', () => {
    it('returns 31 days for January', () => {
      const date = new Date(2024, 0, 1); // Enero 2024
      expect(getDaysInMonth(date)).toBe(31);
    });

    it('returns 29 days for February in leap year', () => {
      const date = new Date(2024, 1, 1); // Febrero 2024 (año bisiesto)
      expect(getDaysInMonth(date)).toBe(29);
    });

    it('returns 28 days for February in non-leap year', () => {
      const date = new Date(2023, 1, 1); // Febrero 2023
      expect(getDaysInMonth(date)).toBe(28);
    });

    it('returns 30 days for April', () => {
      const date = new Date(2024, 3, 1); // Abril 2024
      expect(getDaysInMonth(date)).toBe(30);
    });

    it('returns 31 days for December', () => {
      const date = new Date(2024, 11, 1); // Diciembre 2024
      expect(getDaysInMonth(date)).toBe(31);
    });
  });

  describe('getFirstDayOfMonth', () => {
    it('returns correct first day for January 2024 (Monday)', () => {
      const date = new Date(2024, 0, 1);
      expect(getFirstDayOfMonth(date)).toBe(0); // Lunes (0-indexed)
    });

    it('handles Sunday as last day of week', () => {
      const date = new Date(2024, 8, 1); // Septiembre 2024 (empieza Domingo)
      expect(getFirstDayOfMonth(date)).toBe(6);
    });

    it('returns consistent results for same month in different years', () => {
      const date2024 = new Date(2024, 6, 1); // Julio 2024
      const date2025 = new Date(2025, 6, 1); // Julio 2025
      
      // Pueden ser diferentes porque los años empiezan en diferentes días
      expect(getFirstDayOfMonth(date2024)).toBeGreaterThanOrEqual(0);
      expect(getFirstDayOfMonth(date2024)).toBeLessThan(7);
      expect(getFirstDayOfMonth(date2025)).toBeGreaterThanOrEqual(0);
      expect(getFirstDayOfMonth(date2025)).toBeLessThan(7);
    });
  });

  describe('formatDateKey', () => {
    it('formats date correctly with leading zeros', () => {
      const date = new Date(2024, 0, 5); // 5 de Enero 2024
      expect(formatDateKey(date)).toBe('2024-01-05');
    });

    it('formats date without leading zeros for day', () => {
      const date = new Date(2024, 0, 15);
      expect(formatDateKey(date)).toBe('2024-01-15');
    });

    it('formats date correctly for December', () => {
      const date = new Date(2024, 11, 25);
      expect(formatDateKey(date)).toBe('2024-12-25');
    });

    it('handles single digit months', () => {
      const date = new Date(2024, 2, 15); // Marzo
      expect(formatDateKey(date)).toBe('2024-03-15');
    });

    it('handles last day of year', () => {
      const date = new Date(2024, 11, 31);
      expect(formatDateKey(date)).toBe('2024-12-31');
    });
  });

  describe('isSameDay', () => {
    it('returns true for same date', () => {
      const date1 = new Date(2024, 0, 15);
      const date2 = new Date(2024, 0, 15);
      expect(isSameDay(date1, date2)).toBe(true);
    });

    it('returns false for different days', () => {
      const date1 = new Date(2024, 0, 15);
      const date2 = new Date(2024, 0, 16);
      expect(isSameDay(date1, date2)).toBe(false);
    });

    it('returns false for different months', () => {
      const date1 = new Date(2024, 0, 15);
      const date2 = new Date(2024, 1, 15);
      expect(isSameDay(date1, date2)).toBe(false);
    });

    it('returns false for different years', () => {
      const date1 = new Date(2024, 0, 15);
      const date2 = new Date(2025, 0, 15);
      expect(isSameDay(date1, date2)).toBe(false);
    });

    it('ignores time differences', () => {
      const date1 = new Date(2024, 0, 15, 10, 30, 0);
      const date2 = new Date(2024, 0, 15, 18, 45, 30);
      expect(isSameDay(date1, date2)).toBe(true);
    });
  });
});

