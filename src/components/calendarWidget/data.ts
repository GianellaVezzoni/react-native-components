export interface Event {
  id: string;
  time: string;
  title: string;
  color?: string;
}

export interface EventsByDate {
  [date: string]: Event[];
}

export const MOCK_EVENTS: EventsByDate = {
  '2025-10-11': [
    { id: '1', time: '09:00', title: 'Team Meeting', color: '#667eea' },
    { id: '2', time: '14:00', title: 'Gym Session', color: '#48bb78' },
  ],
  '2025-10-15': [
    { id: '3', time: '10:00', title: 'Doctor Appointment', color: '#f56565' },
  ],
  '2025-10-20': [
    { id: '4', time: '11:30', title: 'Lunch with Sarah', color: '#ed8936' },
    { id: '5', time: '16:00', title: 'Project Review', color: '#667eea' },
    { id: '6', time: '18:00', title: 'Yoga Class', color: '#48bb78' },
  ],
  '2025-10-25': [
    { id: '7', time: '08:00', title: 'Morning Run', color: '#48bb78' },
  ],
};

export const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
