import React, { useState } from "react";
import { 
  SafeAreaView, 
  StatusBar, 
  ScrollView, 
  useColorScheme,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import CalendarWidget from "../../components/calendarWidget";
import { useStyles } from "./styles";

enum Theme {
    Light = 'light',
    Dark = 'dark',
    Auto = 'auto',
}

export const CalendarScreen = () => {
  const systemTheme = useColorScheme();
  const styles = useStyles();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [manualTheme, setManualTheme] = useState<Theme>(Theme.Auto);
  
  const activeTheme = manualTheme === Theme.Auto 
    ? (systemTheme || Theme.Light) 
    : manualTheme;
  const isDark = activeTheme === Theme.Dark;
  const goToPreviousMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const toggleTheme = () => {
    if (manualTheme === Theme.Auto) {
      setManualTheme(Theme.Light);
    } else if (manualTheme === Theme.Light) {
      setManualTheme(Theme.Dark);
    } else {
      setManualTheme(Theme.Auto);
    }
  };

  const getThemeIcon = () => {
    if (manualTheme === Theme.Auto) return '🔄';
    if (manualTheme === Theme.Light) return '☀️';
    return '🌙';
  };

  const getThemeLabel = () => {
    if (manualTheme === Theme.Auto) return 'Auto';
    if (manualTheme === Theme.Light) return 'Light';
    return 'Dark';
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, isDark && styles.titleDark]}>
              📅 Calendar
            </Text>
            <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
              Navigate and explore
            </Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.themeToggle, isDark && styles.themeToggleDark]}
            onPress={toggleTheme}
            activeOpacity={0.7}
          >
            <Text style={styles.themeIcon}>{getThemeIcon()}</Text>
            <Text style={[styles.themeLabel, isDark && styles.themeLabelDark]}>
              {getThemeLabel()}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.navigation, isDark && styles.navigationDark]}>
          <TouchableOpacity 
            style={[styles.navButton, isDark && styles.navButtonDark]}
            onPress={goToPreviousMonth}
            activeOpacity={0.7}
          >
            <Text style={[styles.navButtonText, isDark && styles.navButtonTextDark]}>
              ←
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.todayButton, isDark && styles.todayButtonDark]}
            onPress={goToToday}
            activeOpacity={0.7}
          >
            <Text style={[styles.todayButtonText, isDark && styles.todayButtonTextDark]}>
              Today
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.navButton, isDark && styles.navButtonDark]}
            onPress={goToNextMonth}
            activeOpacity={0.7}
          >
            <Text style={[styles.navButtonText, isDark && styles.navButtonTextDark]}>
              →
            </Text>
          </TouchableOpacity>
        </View>

        <CalendarWidget 
          currentDate={currentDate}
          theme={manualTheme}
          onDateSelect={(date) => {
            console.log('Selected date:', date);
          }}
        />

        <View style={styles.infoSection}>
          <View style={[styles.infoCard, isDark && styles.infoCardDark]}>
            <Text style={styles.infoEmoji}>📅</Text>
            <Text style={[styles.infoTitle, isDark && styles.infoTitleDark]}>
              Navigate
            </Text>
            <Text style={[styles.infoText, isDark && styles.infoTextDark]}>
              Browse months easily
            </Text>
          </View>

          <View style={[styles.infoCard, isDark && styles.infoCardDark]}>
            <Text style={styles.infoEmoji}>🎨</Text>
            <Text style={[styles.infoTitle, isDark && styles.infoTitleDark]}>
              Themes
            </Text>
            <Text style={[styles.infoText, isDark && styles.infoTextDark]}>
              Light, Dark & Auto
            </Text>
          </View>
          <View style={[styles.infoCard, isDark && styles.infoCardDark]}>
            <Text style={styles.infoEmoji}>⚡</Text>
            <Text style={[styles.infoTitle, isDark && styles.infoTitleDark]}>
              Interactive
            </Text>
            <Text style={[styles.infoText, isDark && styles.infoTextDark]}>
              Tap to see events
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
