import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { BottomBarProps } from '../types';
import { styles } from '../styles';

export const FloatingBar: React.FC<BottomBarProps> = ({ activeTab, onTabPress, tabs }) => {
  const animationsRef = useRef(tabs.map(() => new Animated.Value(0)));
  const animations = animationsRef.current;

  useEffect(() => {
    tabs.forEach((tab, index) => {
      const anim = animations[index];
      if (!anim) return;
      
      Animated.spring(anim, {
        toValue: activeTab === tab.id ? 1 : 0,
        tension: 100,
        friction: 10,
        useNativeDriver: true,
      }).start();
    });
  }, [activeTab, animations, tabs]);

  return (
    <View style={styles.floatingContainer}>
      <View style={styles.floatingBar}>
        {tabs.map((tab, index) => {
          const anim = animations[index];
          if (!anim) return null;

          const scale = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.2],
          });
          const translateY = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -8],
          });

          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => onTabPress(tab.id)}
              style={styles.tabItem}
              activeOpacity={0.7}
            >
              <Animated.View style={{ transform: [{ scale }, { translateY }] }}>
                <Text style={styles.icon}>{tab.icon}</Text>
              </Animated.View>
              {activeTab === tab.id && (
                <Text style={styles.activeLabel}>{tab.label}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

