import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useStyles } from './styles';

interface SmartInsightsProps {
  isDark: boolean;
}

export const SmartInsights = ({ isDark }: SmartInsightsProps) => {
  const styles = useStyles();

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.header}>
        <Text style={[styles.title, isDark && styles.titleDark]}>
          Smart Insights
        </Text>
        <Text style={styles.icon}>💡</Text>
      </View>
      
      <View style={styles.insightRow}>
        <View style={styles.insightItem}>
          <Text style={[styles.insightLabel, isDark && styles.insightLabelDark]}>
            Spending trend
          </Text>
          <Text style={[styles.insightValue, isDark && styles.insightValueDark]}>
            -12% vs last month
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.insightItem}>
          <Text style={[styles.insightLabel, isDark && styles.insightLabelDark]}>
            Savings rate
          </Text>
          <Text style={[styles.insightValue, isDark && styles.insightValueDark]}>
            24% this month
          </Text>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.button, isDark && styles.buttonDark]}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>View full report</Text>
      </TouchableOpacity>
    </View>
  );
};

