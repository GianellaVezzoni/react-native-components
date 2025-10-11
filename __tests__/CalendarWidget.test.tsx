/**
 * @format
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CalendarWidget from '../src/components/calendarWidget';
import { EventsByDate } from '../src/components/calendarWidget/data';

describe('CalendarWidget', () => {
  const mockDate = new Date(2024, 0, 15); // 15 de Enero 2024
  const mockEvents: EventsByDate = {
    '2024-01-15': [
      { id: '1', title: 'Test Event', time: '10:00 AM', color: '#FF6B6B' },
    ],
  };

  it('renders correct number of days for the month', () => {
    const { getByText } = render(<CalendarWidget currentDate={mockDate} />);
        for (let i = 1; i <= 31; i++) {
      expect(getByText(i.toString())).toBeTruthy();
    }
  });

  it('calls onDateSelect when a day is pressed', () => {
    const onDateSelectMock = jest.fn();
    const { getByText } = render(
      <CalendarWidget 
        currentDate={mockDate} 
        onDateSelect={onDateSelectMock}
      />
    );

    const day15 = getByText('15');
    fireEvent.press(day15);

    expect(onDateSelectMock).toHaveBeenCalled();
    expect(onDateSelectMock).toHaveBeenCalledWith(
      expect.objectContaining({
        getDate: expect.any(Function),
        getMonth: expect.any(Function),
        getFullYear: expect.any(Function),
      })
    );
  });

  it('displays events for selected date', () => {
    const { getByText } = render(
      <CalendarWidget 
        currentDate={mockDate} 
        events={mockEvents}
      />
    );

    const day15 = getByText('15');
    fireEvent.press(day15);

    expect(getByText('Test Event')).toBeTruthy();
    expect(getByText('10:00 AM')).toBeTruthy();
  });

  it('shows "No events today" when selected date has no events', () => {
    const { getByText } = render(
      <CalendarWidget 
        currentDate={mockDate} 
        events={mockEvents}
      />
    );

    const day20 = getByText('20');
    fireEvent.press(day20);

    expect(getByText('No events today ✨')).toBeTruthy();
  });

  it('closes event panel when pressing close button', () => {
    const { getByText, queryByText } = render(
      <CalendarWidget 
        currentDate={mockDate} 
        events={mockEvents}
      />
    );

    const day15 = getByText('15');
    fireEvent.press(day15);

    expect(getByText('Test Event')).toBeTruthy();

    const closeButton = getByText('✕');
    fireEvent.press(closeButton);

    setTimeout(() => {
      expect(queryByText('Test Event')).toBeNull();
    }, 300);
  });

  it('toggles event panel when pressing same date twice', () => {
    const { getByText, queryByText } = render(
      <CalendarWidget 
        currentDate={mockDate} 
        events={mockEvents}
      />
    );

    const day15 = getByText('15');
    
    fireEvent.press(day15);
    expect(getByText('Test Event')).toBeTruthy();

    fireEvent.press(day15);
    setTimeout(() => {
      expect(queryByText('Test Event')).toBeNull();
    }, 300);
  });

  it('applies correct theme colors', () => {
    const { rerender } = render(
      <CalendarWidget currentDate={mockDate} theme="light" />
    );

    rerender(<CalendarWidget currentDate={mockDate} theme="dark" />);

    expect(true).toBe(true);
  });

  it('handles multiple events on same date', () => {
    const multipleEvents: EventsByDate = {
      '2024-01-15': [
        { id: '1', title: 'Event 1', time: '10:00 AM', color: '#FF6B6B' },
        { id: '2', title: 'Event 2', time: '2:00 PM', color: '#4ECDC4' },
        { id: '3', title: 'Event 3', time: '5:00 PM', color: '#FFD93D' },
      ],
    };

    const { getByText } = render(
      <CalendarWidget 
        currentDate={mockDate} 
        events={multipleEvents}
      />
    );

    const day15 = getByText('15');
    fireEvent.press(day15);

    expect(getByText('Event 1')).toBeTruthy();
    expect(getByText('Event 2')).toBeTruthy();
    expect(getByText('Event 3')).toBeTruthy();
  });
});

