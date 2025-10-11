import { StyleSheet } from "react-native";

export const useStyles = () => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f7fa',
    },
    containerDark: {
      backgroundColor: '#0f1419',
    },
    scrollContent: {
      padding: 20,
      alignItems: 'center',
    },
    header: {
      width: '100%',
      marginBottom: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: '800',
      color: '#1a202c',
      marginBottom: 4,
      letterSpacing: 0.5,
    },
    titleDark: {
      color: '#e2e8f0',
    },
    subtitle: {
      fontSize: 14, 
      color: '#718096',
    },
    subtitleDark: {
      color: '#a0aec0',
    },
    themeToggle: {
      backgroundColor: '#ffffff',
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
    },
    themeToggleDark: {
      backgroundColor: '#1a1f2e',
    },
    themeIcon: {
      fontSize: 20,
    },
    themeLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: '#1a202c',
    },
    themeLabelDark: {
      color: '#e2e8f0',
    },
    navigation: {
      width: '100%',
      maxWidth: 380,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      paddingHorizontal: 8,
    },
    navigationDark: {
    },
    navButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
    },
    navButtonDark: {
      backgroundColor: '#1a1f2e',
    },
    navButtonText: {
      fontSize: 24,
      color: '#1a202c',
      fontWeight: '600',
    },
    navButtonTextDark: {
      color: '#e2e8f0',
    },
    todayButton: {
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 24,
      backgroundColor: '#667eea',
      shadowColor: '#667eea',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    todayButtonDark: {
      backgroundColor: '#7c3aed',
      shadowColor: '#7c3aed',
    },
    todayButtonText: {
      color: '#ffffff',
      fontWeight: '700',
      fontSize: 15,
      letterSpacing: 0.5,
    },
    todayButtonTextDark: {
      color: '#ffffff',
    },
    infoSection: {
      marginTop: 32,
      flexDirection: 'row',
      gap: 12,
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    infoCard: {
      backgroundColor: '#ffffff',
      borderRadius: 16,
      padding: 20,
      alignItems: 'center',
      width: 120,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 4,
    },
    infoCardDark: {
      backgroundColor: '#1a1f2e',
    },
    infoEmoji: {
      fontSize: 32,
      marginBottom: 8,
    },
    infoTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: '#1a202c',
      marginBottom: 4,
    },
    infoTitleDark: {
      color: '#e2e8f0',
    },
    infoText: {
      fontSize: 12,
      color: '#718096',
      textAlign: 'center',
    },
    infoTextDark: {
      color: '#a0aec0',
    },
  });
  