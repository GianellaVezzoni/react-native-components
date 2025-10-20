import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { BottomBarProps } from '../types';
import { styles } from '../styles';

export const ScaleBar: React.FC<BottomBarProps> = ({ activeTab, onTabPress, tabs }) => {
  const animationsRef = useRef(tabs.map(() => ({
    scale: new Animated.Value(1),
    opacity: new Animated.Value(0.6),
  })));
  const animations = animationsRef.current;

  useEffect(() => {
    tabs.forEach((tab, index) => {
      const anim = animations[index];
      if (!anim) return;

      const isActive = activeTab === tab.id;
      Animated.parallel([
        Animated.spring(anim.scale, {
          toValue: isActive ? 1.3 : 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(anim.opacity, {
          toValue: isActive ? 1 : 0.6,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [activeTab, animations, tabs]);

  return (
    <View style={styles.scaleContainer}>
      {tabs.map((tab, index) => {
        const anim = animations[index];
        if (!anim) return null;

        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onTabPress(tab.id)}
            style={styles.tabItem}
            activeOpacity={0.7}
          >
            <Animated.View
              style={{
                transform: [{ scale: anim.scale }],
                opacity: anim.opacity,
              }}
            >
              <View style={activeTab === tab.id && styles.scaleBubble}>
                <Text style={styles.icon}>{tab.icon}</Text>
              </View>
            </Animated.View>
            <Text style={[styles.smallLabel, activeTab === tab.id && styles.activeSmallLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

