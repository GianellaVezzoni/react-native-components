import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Switch,
  ScrollView,
} from 'react-native';
import { useStyles } from './styles';
import { useFeatureFlags } from '../../hooks/useFeatureFlags';

export const FeatureFlagsPanel = () => {
  const styles = useStyles();
  const { toggleFlag, resetFlags, ...flags } = useFeatureFlags();
  const [isVisible, setIsVisible] = useState(false);

  const flagLabels: Record<string, string> = {
    showSmartInsights: 'Smart Insights',
    showBalanceSection: 'Balance Section',
    showCardsSection: 'Cards Section',
    showRecipientsSection: 'Recipients Section',
    showSendSection: 'Send Section',
    showRequestSection: 'Request Section',
    showQuickActionsSection: 'Quick Actions Section',
  };

  const flagEntries = Object.entries(flagLabels).filter(
    ([key]) => key !== 'showQuickActionsSection'
  );

  return (
    <>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setIsVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.floatingButtonText}>Flags</Text>
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Feature Flags</Text>
              <TouchableOpacity
                onPress={() => setIsVisible(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.flagsList}>
              {flagEntries.map(([key, label]) => (
                <View key={key} style={styles.flagRow}>
                  <View style={styles.flagInfo}>
                    <Text style={styles.flagLabel}>{label}</Text>
                    <Text style={styles.flagKey}>{key}</Text>
                  </View>
                  <Switch
                    value={flags[key as keyof typeof flags] as boolean}
                    onValueChange={() => toggleFlag(key as keyof typeof flags)}
                    trackColor={{ false: '#374151', true: '#3b82f6' }}
                    thumbColor="#ffffff"
                  />
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.resetButton}
              onPress={resetFlags}
              activeOpacity={0.7}
            >
              <Text style={styles.resetButtonText}>Reset All</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

