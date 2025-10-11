import { StyleSheet } from "react-native";

export const useStyles = ( CALENDAR_WIDTH: number ) => StyleSheet.create({
    wrapper: {
      borderRadius: 24,
      padding: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 16,
      elevation: 8,
    },
    container: {
      borderRadius: 20,
      padding: 20,
      width: CALENDAR_WIDTH,
    },
    header: {
      marginBottom: 20,
      alignItems: 'center',
    },
    monthYear: {
      fontSize: 22,
      fontWeight: '700',
      letterSpacing: 0.5,
    },
    weekDaysRow: {
      flexDirection: 'row',
      marginBottom: 12,
    },
    weekDayCell: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 8,
    },
    weekDayText: {
      fontSize: 12,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    daysGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    dayCell: {
      width: `${100 / 7}%`,
      aspectRatio: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4,
    },
    dayCircle: {
      width: '80%',
      height: '80%',
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    dayText: {
      fontSize: 14,
      fontWeight: '500',
    },
    eventDot: {
      position: 'absolute',
      bottom: 6,
      width: 4,
      height: 4,
      borderRadius: 2,
    },
    eventsPanel: {
      marginTop: 20,
      borderRadius: 16,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 4,
    },
    eventsPanelContent: {
      padding: 16,
    },
    eventsPanelHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    selectedDateText: {
      fontSize: 18,
      fontWeight: '700',
    },
    closeButton: {
      width: 28,
      height: 28,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    closeButtonText: {
      fontSize: 18,
      fontWeight: '400',
    },
    eventsList: {
      maxHeight: 200,
    },
    eventItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderRadius: 12,
      marginBottom: 8,
      borderLeftWidth: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 1,
    },
    eventTime: {
      fontSize: 13,
      fontWeight: '600',
      marginRight: 12,
      minWidth: 50,
    },
    eventTitle: {
      fontSize: 14,
      fontWeight: '500',
      flex: 1,
    },
    noEventsContainer: {
      alignItems: 'center',
      paddingVertical: 24,
    },
    noEventsText: {
      fontSize: 14,
      fontWeight: '500',
    },
  });
  
  