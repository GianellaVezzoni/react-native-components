export enum PermissionType {
  LOCATION = 'location',
  CAMERA = 'camera',
  CONTACTS = 'contacts',
}

export enum PermissionStatus {
  GRANTED = 'granted',
  DENIED = 'denied',
  BLOCKED = 'blocked',
  UNAVAILABLE = 'unavailable',
}

export interface PermissionInfo {
  type: PermissionType;
  title: string;
  description: string;
  whyNeeded: string;
  whatHappensIfDenied: string;
  alternatives?: string[];
}

export interface PermissionState {
  type: PermissionType;
  status: PermissionStatus;
  canAskAgain: boolean;
}

export type PermissionStates = Record<PermissionType, PermissionState>;

