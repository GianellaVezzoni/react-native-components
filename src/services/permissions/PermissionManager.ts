import { Platform, Linking, Alert } from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  Permission,
  PermissionStatus as RNPermissionStatus,
} from 'react-native-permissions';
import { PermissionType, PermissionStatus, PermissionState } from './types';

class PermissionManager {
  private getPermissionKey(type: PermissionType): Permission {
    if (Platform.OS === 'android') {
      switch (type) {
        case PermissionType.LOCATION:
          return PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
        case PermissionType.CAMERA:
          return PERMISSIONS.ANDROID.CAMERA;
        case PermissionType.CONTACTS:
          return PERMISSIONS.ANDROID.READ_CONTACTS;
        default:
          throw new Error(`Unknown permission type: ${type}`);
      }
    } else {
      switch (type) {
        case PermissionType.LOCATION:
          return PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
        case PermissionType.CAMERA:
          return PERMISSIONS.IOS.CAMERA;
        case PermissionType.CONTACTS:
          return PERMISSIONS.IOS.CONTACTS;
        default:
          throw new Error(`Unknown permission type: ${type}`);
      }
    }
  }

  private mapRNStatusToPermissionStatus(
    rnStatus: RNPermissionStatus,
    type: PermissionType
  ): PermissionState {
    switch (rnStatus) {
      case RESULTS.GRANTED:
        return {
          type,
          status: PermissionStatus.GRANTED,
          canAskAgain: true,
        };
      case RESULTS.DENIED:
        return {
          type,
          status: PermissionStatus.DENIED,
          canAskAgain: true,
        };
      case RESULTS.BLOCKED:
        return {
          type,
          status: PermissionStatus.BLOCKED,
          canAskAgain: false,
        };
      case RESULTS.UNAVAILABLE:
        return {
          type,
          status: PermissionStatus.UNAVAILABLE,
          canAskAgain: false,
        };
      case RESULTS.LIMITED:
        return {
          type,
          status: PermissionStatus.GRANTED,
          canAskAgain: true,
        };
      default:
        return {
          type,
          status: PermissionStatus.DENIED,
          canAskAgain: true,
        };
    }
  }

  async requestPermission(type: PermissionType): Promise<PermissionState> {
    try {
      const permission = this.getPermissionKey(type);
      console.log(`PermissionManager: Requesting ${type} with key: ${permission}`);
      
      const result = await request(permission);
      console.log(`PermissionManager: ${type} request result:`, result);
      
      return this.mapRNStatusToPermissionStatus(result, type);
    } catch (error) {
      console.error(`PermissionManager: Error requesting ${type}:`, error);
      return {
        type,
        status: PermissionStatus.DENIED,
        canAskAgain: false,
      };
    }
  }

  async checkPermission(type: PermissionType): Promise<PermissionState> {
    try {
      const permission = this.getPermissionKey(type);
      const result = await check(permission);
      return this.mapRNStatusToPermissionStatus(result, type);
    } catch (error) {
      console.error(`PermissionManager: Error checking ${type}:`, error);
      return {
        type,
        status: PermissionStatus.DENIED,
        canAskAgain: true,
      };
    }
  }

  async requestMultiplePermissions(
    types: PermissionType[]
  ): Promise<Record<PermissionType, PermissionState>> {
    const results: Partial<Record<PermissionType, PermissionState>> = {};

    // Request them sequentially to show dialogs one by one
    for (let i = 0; i < types.length; i++) {
      const type = types[i];
      results[type] = await this.requestPermission(type);
      // Wait between requests to ensure user can respond to each dialog
      if (i < types.length - 1) {
        await new Promise<void>(resolve => setTimeout(() => resolve(), 1500));
      }
    }

    return results as Record<PermissionType, PermissionState>;
  }

  async openSettings(): Promise<void> {
    try {
      if (Platform.OS === 'ios') {
        await Linking.openURL('app-settings:');
      } else {
        await Linking.openSettings();
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo abrir la configuración');
    }
  }
}

export const permissionManager = new PermissionManager();
