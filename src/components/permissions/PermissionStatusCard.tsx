import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeIcon } from './SafeIcon';
import { PermissionType, PermissionStatus } from '../../services/permissions/types';
import { styles } from './styles';

interface PermissionStatusCardProps {
  type: PermissionType;
  status: PermissionStatus;
  canAskAgain: boolean;
  onRequest?: () => void;
  onOpenSettings?: () => void;
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

export const PermissionStatusCard: React.FC<PermissionStatusCardProps> = ({
  type,
  status,
  canAskAgain,
  onRequest,
  onOpenSettings,
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case PermissionStatus.GRANTED:
        return {
          icon: 'checkmark-circle',
          text: 'Granted',
          color: styles.statusGranted,
          backgroundColor: styles.statusGrantedBg,
        };
      case PermissionStatus.DENIED:
        return {
          icon: 'pause-circle',
          text: 'Denied',
          color: styles.statusDenied,
          backgroundColor: styles.statusDeniedBg,
        };
      case PermissionStatus.BLOCKED:
        return {
          icon: 'close-circle',
          text: 'Blocked',
          color: styles.statusBlocked,
          backgroundColor: styles.statusBlockedBg,
        };
      default:
        return {
          icon: 'help-circle',
          text: 'Unknown',
          color: styles.statusUnknown,
          backgroundColor: styles.statusUnknownBg,
        };
    }
  };

  const config = getStatusConfig();
  const permissionName = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <View style={[styles.statusCard, config.backgroundColor]}>
      <View style={styles.statusCardHeader}>
        <SafeIcon
          name={getPermissionIcon(type)}
          size={40}
          color="#1A1A1A"
          style={styles.statusCardIcon}
          fallback={permissionName.charAt(0)}
        />
        <View style={styles.statusCardInfo}>
          <Text style={styles.statusCardName}>{permissionName}</Text>
          <View style={styles.statusCardStatusContainer}>
            <SafeIcon
              name={config.icon}
              size={16}
              color={
                status === PermissionStatus.GRANTED
                  ? '#10B981'
                  : status === PermissionStatus.DENIED
                    ? '#F59E0B'
                    : status === PermissionStatus.BLOCKED
                      ? '#EF4444'
                      : '#6B7280'
              }
              style={styles.statusCardStatusIcon}
              fallback="•"
            />
            <Text style={[styles.statusCardStatus, config.color]}>
              {config.text}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.statusCardActions}>
        {status === PermissionStatus.GRANTED ? (
          <View style={styles.statusCardAction}>
            <Text style={styles.statusCardActionText}>Active</Text>
          </View>
        ) : status === PermissionStatus.BLOCKED ? (
          <TouchableOpacity
            style={styles.statusCardButton}
            onPress={onOpenSettings}
            activeOpacity={0.7}
          >
            <Text style={styles.statusCardButtonText}>Open Settings</Text>
          </TouchableOpacity>
        ) : canAskAgain && onRequest ? (
          <TouchableOpacity
            style={styles.statusCardButton}
            onPress={onRequest}
            activeOpacity={0.7}
          >
            <Text style={styles.statusCardButtonText}>Request Permission</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};
