import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
  withSequence,
  withRepeat,
} from 'react-native-reanimated';

interface AnimatedMonsterProps {
  isCoveringEyes: boolean;
  isPasswordVisible: boolean;
}

const SPRING_CONFIG = { damping: 18, stiffness: 350 };

export default function AnimatedMonster({
  isCoveringEyes,
  isPasswordVisible: _isPasswordVisible,
}: AnimatedMonsterProps) {
  const leftHandX = useSharedValue(-18);
  const rightHandX = useSharedValue(18);
  const leftHandY = useSharedValue(0);
  const rightHandY = useSharedValue(0);
  const leftHandRotation = useSharedValue(0);
  const rightHandRotation = useSharedValue(0);
  const eyeScale = useSharedValue(1);
  const eyeOpacity = useSharedValue(1);
  const blink = useSharedValue(1);
  const bounce = useSharedValue(0);

  useEffect(() => {
    const covering = isCoveringEyes;
    const spring = (to: number) => withSpring(to, SPRING_CONFIG);

    leftHandX.value = spring(covering ? 10 : -18);
    rightHandX.value = spring(covering ? -10 : 18);
    leftHandY.value = spring(covering ? -20 : 0);
    rightHandY.value = spring(covering ? -20 : 0);
    leftHandRotation.value = spring(covering ? -5 : 0);
    rightHandRotation.value = spring(covering ? 5 : 0);
    eyeScale.value = withTiming(covering ? 0.05 : 1, { duration: 200 });
    eyeOpacity.value = withTiming(covering ? 0.1 : 1, { duration: 200 });
  }, [
    isCoveringEyes,
    leftHandX,
    rightHandX,
    leftHandY,
    rightHandY,
    leftHandRotation,
    rightHandRotation,
    eyeScale,
    eyeOpacity,
  ]);

  useEffect(() => {
    blink.value = isCoveringEyes
      ? 1
      : withRepeat(
          withSequence(
            withTiming(1, { duration: 2000 }),
            withTiming(0.1, { duration: 150 }),
            withTiming(1, { duration: 150 }),
          ),
          -1,
        );
  }, [isCoveringEyes, blink]);

  useEffect(() => {
    bounce.value = withRepeat(
      withSequence(
        withSpring(3, { damping: 10, stiffness: 80 }),
        withSpring(-3, { damping: 10, stiffness: 80 }),
      ),
      -1,
      true,
    );
  }, [bounce]);

  const leftHandStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: leftHandX.value },
      { translateY: leftHandY.value },
      { rotate: `${leftHandRotation.value}deg` },
    ],
    zIndex: 10,
  }));

  const rightHandStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: rightHandX.value },
      { translateY: rightHandY.value },
      { rotate: `${rightHandRotation.value}deg` },
    ],
    zIndex: 10,
  }));

  const eyeStyle = useAnimatedStyle(() => {
    const blinkScale = interpolate(
      blink.value,
      [0, 1],
      [0.1, 1],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{ scale: eyeScale.value * blinkScale }],
      opacity: eyeOpacity.value * blinkScale,
    };
  });

  const bodyStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounce.value }],
  }));

  return (
    <Animated.View style={[styles.container, bodyStyle]}>
      <View style={styles.body}>
        <View style={styles.eyesContainer}>
          {['left', 'right'].map(side => (
            <Animated.View key={side} style={[styles.eye, eyeStyle]}>
              <View style={styles.pupil} />
            </Animated.View>
          ))}
        </View>
        <Animated.View style={[styles.hand, styles.leftHand, leftHandStyle]}>
          <View style={styles.handCircle} />
        </Animated.View>
        <Animated.View style={[styles.hand, styles.rightHand, rightHandStyle]}>
          <View style={styles.handCircle} />
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4ecdc4',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'visible',
    shadowColor: '#4ecdc4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  eyesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginTop: -10,
    zIndex: 1,
  },
  eye: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    zIndex: 1,
  },
  pupil: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0a0e27',
  },
  hand: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    top: 50,
    zIndex: 10,
  },
  leftHand: {
    left: -5,
  },
  rightHand: {
    right: -5,
  },
  handCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#ff6b6b',
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
});
