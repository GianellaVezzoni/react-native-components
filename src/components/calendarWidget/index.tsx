import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  useColorScheme,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useStyles } from './styles';
import { DAYS_OF_WEEK, EventsByDate, MOCK_EVENTS, MONTHS } from './data';
import { darkColors, lightColors } from './theme';

interface CalendarWidgetProps {
    events?: EventsByDate;
    theme?: 'light' | 'dark' | 'auto';
    onDateSelect?: (date: Date) => void;
    currentDate?: Date;
  }
  
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CALENDAR_WIDTH = Math.min(SCREEN_WIDTH - 40, 400);

export default function CalendarWidget({
  events = MOCK_EVENTS,
  theme = 'auto',
  onDateSelect,
  currentDate: controlledDate,
}: CalendarWidgetProps) {
  const systemTheme = useColorScheme();
  const activeTheme = theme === 'auto' ? (systemTheme || 'light') : theme;
  const colors = activeTheme === 'dark' ? darkColors : lightColors;
  const styles = useStyles(CALENDAR_WIDTH);

  const [internalDate] = useState(new Date());
  const currentDate = controlledDate || internalDate;
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const panelAnimation = useRef(new Animated.Value(0)).current;
  const panelHeightAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (selectedDate) {
      Animated.parallel([
        Animated.spring(panelAnimation, {
          toValue: 1,
          tension: 80,
          friction: 10,
          useNativeDriver: false,
        }),
        Animated.timing(panelHeightAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(panelAnimation, {
          toValue: 0,
          duration: 200,
          easing: Easing.in(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(panelHeightAnim, {
          toValue: 0,
          duration: 200,
          easing: Easing.in(Easing.ease),
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [selectedDate, panelAnimation, panelHeightAnim]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const formatDateKey = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const handleDayPress = (day: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    
    if (selectedDate && isSameDay(selectedDate, newDate)) {
      setSelectedDate(null);
    } else {
      setSelectedDate(newDate);
      onDateSelect?.(newDate);
    }
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOffset = getFirstDayOfMonth(currentDate);
  const totalCells = Math.ceil((daysInMonth + firstDayOffset) / 7) * 7;

  const days = Array.from({ length: totalCells }, (_, i) => {
    const dayNumber = i - firstDayOffset + 1;
    if (dayNumber < 1 || dayNumber > daysInMonth) return null;
    return dayNumber;
  });

  const selectedDateEvents = selectedDate ? events[formatDateKey(selectedDate)] || [] : [];

  const panelOpacity = panelAnimation;
  const panelScale = panelAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1],
  });
  const panelMaxHeight = panelHeightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300],
  });

  return (
    <View style={[styles.wrapper, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.cardBackground }]}>
        <View style={styles.header}>
          <Text style={[styles.monthYear, { color: colors.primary }]}>
            {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
          </Text>
        </View>

        <View style={styles.weekDaysRow}>
          {DAYS_OF_WEEK.map((day) => (
            <View key={day} style={styles.weekDayCell}>
              <Text style={[styles.weekDayText, { color: colors.textSecondary }]}>
                {day}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.daysGrid}>
          {days.map((day, index) => {
            if (day === null) {
              return <View key={`empty-${index}`} style={styles.dayCell} />;
            }

            const date = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              day
            );
            const dateKey = formatDateKey(date);
            const hasEvents = events[dateKey] && events[dateKey].length > 0;
            const isToday = isSameDay(date, new Date());
            const isSelected = selectedDate && isSameDay(date, selectedDate);

            return (
              <TouchableOpacity
                key={day}
                style={styles.dayCell}
                onPress={() => handleDayPress(day)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.dayCircle,
                    isToday && { backgroundColor: colors.today },
                    isSelected && { 
                      backgroundColor: colors.selected,
                      transform: [{ scale: 1.1 }],
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      { color: colors.textPrimary },
                      (isToday || isSelected) && { color: colors.textPrimary, fontWeight: '700' },
                    ]}
                  >
                    {day}
                  </Text>
                </View>
                {hasEvents && !isSelected && (
                  <View style={[styles.eventDot, { backgroundColor: colors.accent }]} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedDate && (
          <Animated.View
            style={[
              styles.eventsPanel,
              {
                backgroundColor: colors.panelBackground,
                maxHeight: panelMaxHeight,
                opacity: panelOpacity,
                transform: [{ scale: panelScale }],
              },
            ]}
          >
            <View style={styles.eventsPanelContent}>
              <View style={styles.eventsPanelHeader}>
                <Text style={[styles.selectedDateText, { color: colors.primary }]}>
                  {selectedDate.getDate()} {MONTHS[selectedDate.getMonth()]}
                </Text>
                <TouchableOpacity
                  onPress={() => setSelectedDate(null)}
                  style={styles.closeButton}
                >
                  <Text style={[styles.closeButtonText, { color: colors.textSecondary }]}>
                    ✕
                  </Text>
                </TouchableOpacity>
              </View>

              <ScrollView 
                style={styles.eventsList}
                showsVerticalScrollIndicator={false}
              >
                {selectedDateEvents.length > 0 ? (
                  selectedDateEvents.map((event) => (
                    <View
                      key={event.id}
                      style={[
                        styles.eventItem,
                        { 
                          backgroundColor: colors.eventBackground,
                          borderLeftColor: event.color || colors.accent,
                        },
                      ]}
                    >
                      <Text style={[styles.eventTime, { color: colors.textSecondary }]}>
                        {event.time}
                      </Text>
                      <Text style={[styles.eventTitle, { color: colors.textPrimary }]}>
                        {event.title}
                      </Text>
                    </View>
                  ))
                ) : (
                  <View style={styles.noEventsContainer}>
                    <Text style={[styles.noEventsText, { color: colors.textSecondary }]}>
                      No events today ✨
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>
          </Animated.View>
        )}
      </View>
    </View>
  );
}
