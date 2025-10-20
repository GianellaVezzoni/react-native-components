import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { BottomBarProps } from '../types';
import { styles } from '../styles';

export const WaveBar: React.FC<BottomBarProps> = ({ activeTab, onTabPress, tabs }) => {
  const animationsRef = useRef(tabs.map(() => new Animated.Value(0)));
  const animations = animationsRef.current;

  useEffect(() => {
    tabs.forEach((tab, index) => {
      const anim = animations[index];
      if (!anim) return;

      Animated.sequence([
        Animated.timing(anim, {
          toValue: activeTab === tab.id ? 1 : 0,
          duration: 150,
          useNativeDriver: true,
        }),
        activeTab === tab.id
          ? Animated.spring(anim, {
              toValue: 1,
              tension: 50,
              friction: 7,
              useNativeDriver: true,
            })
          : Animated.timing(anim, {
              toValue: 0,
              duration: 0,
              useNativeDriver: true,
            }),
      ]).start();
    });
  }, [activeTab, animations, tabs]);

  return (
    <View style={styles.waveContainer}>
      {tabs.map((tab, index) => {
        const anim = animations[index];
        if (!anim) return null;

        const translateY = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -20],
        });
        const rotate = anim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        });

        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onTabPress(tab.id)}
            style={styles.tabItem}
            activeOpacity={0.7}
          >
            <Animated.View
              style={{
                transform: [{ translateY }, { rotate }],
              }}
            >
              <View style={activeTab === tab.id && styles.waveBubble}>
                <Text style={styles.icon}>{tab.icon}</Text>
              </View>
            </Animated.View>
            <Text style={[styles.waveLabel, activeTab === tab.id && styles.activeWaveLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

