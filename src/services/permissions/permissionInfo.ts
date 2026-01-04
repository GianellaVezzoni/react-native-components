import { PermissionType, PermissionInfo } from './types';

export const PERMISSION_INFO: Record<PermissionType, PermissionInfo> = {
  [PermissionType.LOCATION]: {
    type: PermissionType.LOCATION,
    title: 'Location',
    description: 'We need your location to show you relevant content near you.',
  },
  [PermissionType.CAMERA]: {
    type: PermissionType.CAMERA,
    title: 'Camera',
    description: 'We need access to your camera to allow you to take photos and share them.',
  },
  [PermissionType.CONTACTS]: {
    type: PermissionType.CONTACTS,
    title: 'Contacts',
    description: 'We need access to your contacts to help you find friends in the app.',
  },
};

