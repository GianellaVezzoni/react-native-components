import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { BottomBarProps } from '../types';
import { styles } from '../styles';

const { width } = Dimensions.get('window');

export const SlidingBar: React.FC<BottomBarProps> = ({ activeTab, onTabPress, tabs }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
  const itemWidth = width / tabs.length;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: activeIndex * itemWidth,
      tension: 80,
      friction: 12,
      useNativeDriver: true,
    }).start();
  }, [activeIndex, slideAnim, itemWidth]);

  return (
    <View style={styles.slidingContainer}>
      <Animated.View
        style={[
          styles.slidingIndicator,
          {
            width: itemWidth - 20,
            transform: [{ translateX: slideAnim }],
          },
        ]}
      />
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.id}
          onPress={() => onTabPress(tab.id)}
          style={[styles.tabItem, { width: itemWidth }]}
          activeOpacity={0.7}
        >
          <Text style={[styles.icon, activeTab === tab.id && styles.activeIcon]}>
            {tab.icon}
          </Text>
          <Text style={[styles.label, activeTab === tab.id && styles.activeLabel]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

