/**
 * @format
 * Tests para datos del calendario
 */

import { MOCK_EVENTS } from '../../src/components/calendarWidget/data';
describe('Calendar Data', () => {
  describe('MOCK_EVENTS', () => {
    it('is an object', () => {
      expect(typeof MOCK_EVENTS).toBe('object');
    });

    it('contains date keys in correct format', () => {
      const keys = Object.keys(MOCK_EVENTS);
      keys.forEach(key => {
        expect(key).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      });
    });

    it('contains events as arrays', () => {
      const values = Object.values(MOCK_EVENTS);
      values.forEach(eventArray => {
        expect(Array.isArray(eventArray)).toBe(true);
      });
    });

    it('events have required properties', () => {
      const allEvents = Object.values(MOCK_EVENTS).flat();
      
      allEvents.forEach(event => {
        expect(event).toHaveProperty('id');
        expect(event).toHaveProperty('title');
        expect(event).toHaveProperty('time');
        expect(typeof event.id).toBe('string');
        expect(typeof event.title).toBe('string');
        expect(typeof event.time).toBe('string');
      });
    });

    it('events can have optional color property', () => {
      const allEvents = Object.values(MOCK_EVENTS).flat();
      
      allEvents.forEach(event => {
        if (event.color) {
          expect(typeof event.color).toBe('string');
          expect(event.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
        }
      });
    });
  });
});

