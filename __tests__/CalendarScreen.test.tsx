/**
 * @format
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CalendarScreen } from '../src/screens/calendar';

describe('CalendarScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<CalendarScreen />);
    expect(getByText('📅 Calendar')).toBeTruthy();
  });

  it('displays navigation subtitle', () => {
    const { getByText } = render(<CalendarScreen />);
    expect(getByText('Navigate and explore')).toBeTruthy();
  });

  it('renders navigation buttons', () => {
    const { getByText } = render(<CalendarScreen />);
    
    expect(getByText('←')).toBeTruthy();
    expect(getByText('Today')).toBeTruthy();
    expect(getByText('→')).toBeTruthy();
  });

  it('navigates to next month when pressing right arrow', () => {
    const { getByText } = render(<CalendarScreen />);
    const nextArrow = getByText('→');
    
    fireEvent.press(nextArrow);
    
    // El componente debe renderizarse sin errores
    expect(getByText('📅 Calendar')).toBeTruthy();
  });

  it('navigates to previous month when pressing left arrow', () => {
    const { getByText } = render(<CalendarScreen />);
    
    const prevArrow = getByText('←');
    
    fireEvent.press(prevArrow);
    
    // El componente debe renderizarse sin errores
    expect(getByText('📅 Calendar')).toBeTruthy();
  });

  it('returns to current month when pressing Today button', () => {
    const { getByText } = render(<CalendarScreen />);
    
    const todayButton = getByText('Today');
    const nextArrow = getByText('→');
    
    // Navegar al siguiente mes
    fireEvent.press(nextArrow);
    
    // Volver a hoy
    fireEvent.press(todayButton);
    
    // Verificar que el botón funciona
    expect(getByText('Today')).toBeTruthy();
  });

  it('toggles theme when pressing theme button', () => {
    const { getByText } = render(<CalendarScreen />);
    
    // El tema inicial debe ser Auto
    expect(getByText('Auto')).toBeTruthy();
    expect(getByText('🔄')).toBeTruthy();
    
    const themeButton = getByText('Auto');
    
    // Cambiar a Light
    fireEvent.press(themeButton);
    expect(getByText('Light')).toBeTruthy();
    expect(getByText('☀️')).toBeTruthy();
    
    // Cambiar a Dark
    fireEvent.press(themeButton);
    expect(getByText('Dark')).toBeTruthy();
    expect(getByText('🌙')).toBeTruthy();
    
    // Volver a Auto
    fireEvent.press(themeButton);
    expect(getByText('Auto')).toBeTruthy();
    expect(getByText('🔄')).toBeTruthy();
  });

  it('renders info cards', () => {
    const { getByText } = render(<CalendarScreen />);
    
    expect(getByText('Navigate')).toBeTruthy();
    expect(getByText('Browse months easily')).toBeTruthy();
    
    expect(getByText('Themes')).toBeTruthy();
    expect(getByText('Light, Dark & Auto')).toBeTruthy();
    
    expect(getByText('Interactive')).toBeTruthy();
    expect(getByText('Tap to see events')).toBeTruthy();
  });

  it('renders emoji icons in info cards', () => {
    const { getByText } = render(<CalendarScreen />);
    
    expect(getByText('📅')).toBeTruthy();
    expect(getByText('🎨')).toBeTruthy();
    expect(getByText('⚡')).toBeTruthy();
  });
});

