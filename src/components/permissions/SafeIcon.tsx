import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SafeIconProps {
  name: string;
  size?: number;
  color?: string;
  style?: any;
  fallback?: string;
}

export const SafeIcon: React.FC<SafeIconProps> = ({
  name,
  size = 24,
  color = '#000',
  style,
  fallback = '?',
}) => {
  try {
    return (
      <Icon
        name={name}
        size={size}
        color={color}
        style={style}
      />
    );
  } catch (error) {
    return (
      <View style={[styles.fallbackContainer, style]}>
        <Text style={[styles.fallbackText, { fontSize: size, color }]}>
          {fallback}
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  fallbackContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 24,
    minHeight: 24,
  },
  fallbackText: {
    fontWeight: 'bold',
  },
});

