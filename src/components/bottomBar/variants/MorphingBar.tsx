import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { BottomBarProps } from '../types';
import { styles } from '../styles';
import { colors } from '../colors';

export const MorphingBar: React.FC<BottomBarProps> = ({ activeTab, onTabPress, tabs }) => {
  const animationsRef = useRef(tabs.map(() => ({
    width: new Animated.Value(60),
    borderRadius: new Animated.Value(30),
  })));
  const animations = animationsRef.current;

  useEffect(() => {
    tabs.forEach((tab, index) => {
      const anim = animations[index];
      if (!anim) return;

      const isActive = activeTab === tab.id;
      Animated.parallel([
        Animated.spring(anim.width, {
          toValue: isActive ? 100 : 60,
          tension: 80,
          friction: 10,
          useNativeDriver: false,
        }),
        Animated.spring(anim.borderRadius, {
          toValue: isActive ? 20 : 30,
          tension: 80,
          friction: 10,
          useNativeDriver: false,
        }),
      ]).start();
    });
  }, [activeTab, animations, tabs]);

  return (
    <View style={styles.morphingContainer}>
      {tabs.map((tab, index) => {
        const anim = animations[index];
        if (!anim) return null;

        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onTabPress(tab.id)}
            activeOpacity={0.7}
          >
            <Animated.View
              style={[
                styles.morphingTab,
                {
                  width: anim.width,
                  borderRadius: anim.borderRadius,
                  backgroundColor: isActive ? colors.primary : colors.secondary,
                },
              ]}
            >
              <Text style={[styles.icon, isActive && styles.whiteIcon]}>
                {tab.icon}
              </Text>
              {isActive && (
                <Text style={styles.morphingLabel}>{tab.label}</Text>
              )}
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

