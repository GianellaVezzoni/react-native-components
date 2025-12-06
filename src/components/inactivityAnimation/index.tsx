import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Animated, 
  TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native';
import angryDogAnimation from '../../assets/Empty.json';
import { useStyles } from './styles';

interface InactivityAnimationProps {
  visible: boolean;
  onPress?: () => void;
  size?: number;
}
export const InactivityAnimation: React.FC<InactivityAnimationProps> = ({ 
  visible, 
  onPress,
  size = 80,
}) => {
  const styles = useStyles();
  const slideAnim = useRef(new Animated.Value(-size * 0.6)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 50,
          friction: 7,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
      lottieRef.current?.play();
    } else {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: -size * 0.6,
          useNativeDriver: true,
          tension: 50,
          friction: 7,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
      lottieRef.current?.pause();
    }
  }, [visible, slideAnim, opacityAnim, size]);

  return (
    <View 
      style={[
        styles.container,
        { 
          left: 20,
          height: size,
          width: size,
        }
      ]}
      pointerEvents={visible ? 'auto' : 'none'}
    >
      <Animated.View
        style={[
          styles.mascotWrapper,
          {
            transform: [{ translateX: slideAnim }],
            opacity: opacityAnim,
            height: size,
            width: size,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPress}
          style={styles.mascotTouchable}
        >
          <View style={[styles.mascotBody, { width: size, height: size }]}>
            <LottieView
              ref={lottieRef}
              source={angryDogAnimation}
              autoPlay={visible}
              loop
              style={{ width: size, height: size }}
            />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
