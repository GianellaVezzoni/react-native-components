import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BadPermissionFlow } from './BadPermissionFlow';
import { GoodPermissionFlow } from './GoodPermissionFlow';
import { styles } from './comparisonStyles';

type FlowType = 'bad' | 'good';

export const PermissionsComparisonScreen: React.FC = () => {
  const [currentFlow, setCurrentFlow] = useState<FlowType | null>(null);
  const [badScale] = useState(new Animated.Value(1));
  const [goodScale] = useState(new Animated.Value(1));

  const handlePress = (flow: FlowType, scale: Animated.Value) => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.96,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    setCurrentFlow(flow);
  };

  if (currentFlow === 'bad') {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentFlow(null)}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>
        <BadPermissionFlow />
      </SafeAreaView>
    );
  }

  if (currentFlow === 'good') {
    return (
      <>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentFlow(null)}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>
        <GoodPermissionFlow />
      </>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.menuContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Permissions</Text>
          <Text style={styles.subtitle}>Compare implementation flows</Text>
        </View>

        <View style={styles.menuButtons}>
          <Animated.View style={{ transform: [{ scale: badScale }] }}>
            <TouchableOpacity
              style={[styles.menuButton, styles.badButton]}
              onPress={() => handlePress('bad', badScale)}
              activeOpacity={0.9}
            >
              <Text style={styles.menuButtonText}>Bad Flow</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{ transform: [{ scale: goodScale }] }}>
            <TouchableOpacity
              style={[styles.menuButton, styles.goodButton]}
              onPress={() => handlePress('good', goodScale)}
              activeOpacity={0.9}
            >
              <Text style={styles.menuButtonText}>Good Flow</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};
