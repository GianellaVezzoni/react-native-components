import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, Animated, Dimensions, PanResponder } from 'react-native';
import { SafeIcon } from './SafeIcon';
import { PermissionInfo, PermissionType } from '../../services/permissions/types';
import { styles } from './styles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DRAG_THRESHOLD = 100;

interface PrePermissionScreenProps {
  permissionInfo: PermissionInfo;
  onContinue: () => void;
  onSkip?: () => void;
  isLoading?: boolean;
}

const getPermissionIcon = (type: PermissionType): string => {
  switch (type) {
    case PermissionType.LOCATION:
      return 'location';
    case PermissionType.CAMERA:
      return 'camera';
    case PermissionType.CONTACTS:
      return 'people';
    default:
      return 'lock-closed';
  }
};

export const PrePermissionScreen: React.FC<PrePermissionScreenProps> = ({
  permissionInfo,
  onContinue,
  onSkip,
  isLoading = false,
}) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const dragY = useRef(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Start from a higher position (less off-screen)
    slideAnim.setValue(SCREEN_HEIGHT * 0.1);
    
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 70,
        friction: 12,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const scrollOffset = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        return true;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (gestureState.dy > 5) {
          return true;
        }
        return false;
      },
      onPanResponderGrant: () => {
        const currentValue = (slideAnim as any)._value || 0;
        slideAnim.setOffset(currentValue);
        slideAnim.setValue(0);
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          dragY.current = gestureState.dy;
          slideAnim.setValue(gestureState.dy);
          const opacity = Math.max(0, 1 - gestureState.dy / SCREEN_HEIGHT);
          opacityAnim.setValue(opacity);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        slideAnim.flattenOffset();

        if (gestureState.dy > DRAG_THRESHOLD || gestureState.vy > 0.5) {
          handleClose();
        } else {
          Animated.parallel([
            Animated.spring(slideAnim, {
              toValue: 0,
              useNativeDriver: true,
              tension: 70,
              friction: 12,
            }),
            Animated.timing(opacityAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start();
        }
        dragY.current = 0;
      },
    })
  ).current;

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onSkip) onSkip();
    });
  };

  if (!permissionInfo) {
    return null;
  }

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}
      statusBarTranslucent={true}
      hardwareAccelerated={true}
    >
      <Animated.View
        style={[
          styles.modalOverlay,
          {
            opacity: opacityAnim,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={handleClose}
        />
        
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.modalHandleContainer} {...panResponder.panHandlers}>
            <View style={styles.modalHandle} />
          </View>
          
          <ScrollView
            ref={scrollViewRef}
            style={styles.prePermissionContainer}
            contentContainerStyle={styles.prePermissionContent}
            showsVerticalScrollIndicator={true}
            bounces={true}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="handled"
            onScroll={(event) => {
              scrollOffset.current = event.nativeEvent.contentOffset.y;
            }}
            scrollEventThrottle={16}
          >
            <View style={styles.prePermissionHeader}>
              <View style={styles.iconWrapper}>
                <SafeIcon
                  name={getPermissionIcon(permissionInfo.type)}
                  size={72}
                  color="#10B981"
                  style={styles.prePermissionIcon}
                  fallback={permissionInfo.title.charAt(0)}
                />
              </View>
              <Text style={styles.prePermissionTitle}>{permissionInfo.title}</Text>
              <Text style={styles.prePermissionSubtitle}>We need your permission</Text>
            </View>

            <View style={styles.prePermissionBody}>
              <Text style={styles.prePermissionDescription}>
                {permissionInfo.description}
              </Text>

              {permissionInfo.alternatives &&
                permissionInfo.alternatives.length > 0 && (
                  <View style={styles.prePermissionSection}>
                    <View style={styles.sectionHeader}>
                      <View style={[styles.sectionIconContainer, { backgroundColor: '#E0E7FF' }]}>
                        <SafeIcon
                          name="options"
                          size={20}
                          color="#6366F1"
                          fallback="•"
                        />
                      </View>
                      <Text style={styles.prePermissionSectionTitle}>Alternatives</Text>
                    </View>
                    {permissionInfo.alternatives.map((alternative, index) => (
                      <View key={index} style={styles.alternativeItem}>
                        <Text style={styles.alternativeBullet}>•</Text>
                        <Text style={styles.prePermissionAlternative}>{alternative}</Text>
                      </View>
                    ))}
                  </View>
                )}
            </View>

            <View style={styles.prePermissionActions}>
              <TouchableOpacity
                style={[
                  styles.prePermissionButtonPrimary,
                  isLoading && styles.prePermissionButtonDisabled,
                ]}
                onPress={onContinue}
                activeOpacity={0.8}
                disabled={isLoading}
              >
                <Text style={styles.prePermissionButtonPrimaryText}>
                  {isLoading ? 'Requesting...' : 'Grant Permission'}
                </Text>
              </TouchableOpacity>
              {onSkip && !isLoading && (
                <TouchableOpacity
                  style={styles.prePermissionButtonSecondary}
                  onPress={handleClose}
                  activeOpacity={0.8}
                >
                  <Text style={styles.prePermissionButtonSecondaryText}>Maybe Later</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};
