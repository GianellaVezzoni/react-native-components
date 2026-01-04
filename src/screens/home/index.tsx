import React, { useState } from 'react';
import {
  StatusBar,
  ScrollView,
  useColorScheme,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useStyles } from './styles';
import { useFeatureFlags } from '../../hooks/useFeatureFlags';
import { CardsSection } from '../../components/cardsSection';
import { RecipientsSection } from '../../components/recipientsSection';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FeatureFlagsPanel } from '../../components/featureFlagsPanel';

export const HomeScreen = () => {
  const systemTheme = useColorScheme();
  const styles = useStyles();
  const {
    showSmartInsights,
    showBalanceSection,
    showCardsSection,
    showRecipientsSection,
    showSendSection,
    showRequestSection
  } = useFeatureFlags();
  const isDark = systemTheme === 'dark';
  const [balanceVisible, setBalanceVisible] = useState(true);

  const balance = 17298.92 * 100;
  const formattedBalance = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  }).format(balance);

  const toggleBalanceVisibility = () => {
    setBalanceVisible(!balanceVisible);
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.name}>Hello!</Text>
        </View>

        {showBalanceSection ? (
          <View style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <Text style={styles.balanceLabel}>Wallet Balance</Text>
              <TouchableOpacity
                onPress={toggleBalanceVisibility}
                activeOpacity={0.7}
              >
                <Text style={styles.eyeIcon}>
                  {balanceVisible ? 'Hide' : 'Show'}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.balanceAmount}>
              {balanceVisible ? formattedBalance : '••••••'}
            </Text>
          </View>
        ) : (
          <View style={styles.spacer} />
        )}

        <View style={styles.quickActionsContainer}>
          {showSendSection ? (
            <View style={styles.quickActions}>
              <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
                <View style={[styles.actionIcon, styles.sendIcon]}>
                  <Text style={styles.actionIconText}>$</Text>
                </View>
                <Text style={styles.actionLabel}>Send</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.spacer} />
          )}

          {showRequestSection ? (
            <View style={styles.quickActions}>
              <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
                <View style={[styles.actionIcon, styles.requestIcon]}>
                  <Text style={styles.actionIconText}>$</Text>
                </View>
                <Text style={styles.actionLabel}>Request</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.spacer} />
          )}
        </View>

        {showCardsSection ? (
          <CardsSection isDark={isDark} />
        ) : (
          <View style={styles.spacer} />
        )}

        {showRecipientsSection ? (
          <RecipientsSection isDark={isDark} />
        ) : (
          <View style={styles.spacer} />
        )}
      </ScrollView>
      <FeatureFlagsPanel />
    </SafeAreaView>
  );
};
