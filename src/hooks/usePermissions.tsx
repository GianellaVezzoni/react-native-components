import { useState, useCallback } from 'react';
import { PermissionType, PermissionStatus, PermissionState, PermissionStates } from '../services/permissions/types';
import { permissionManager } from '../services/permissions/PermissionManager';

export const usePermissions = (initialTypes: PermissionType[] = []) => {
  const [states, setStates] = useState<PermissionStates>(() => {
    const initial: Partial<PermissionStates> = {};
    initialTypes.forEach(type => {
      initial[type] = {
        type,
        status: PermissionStatus.DENIED,
        canAskAgain: true,
      };
    });
    return initial as PermissionStates;
  });

  const [isLoading, setIsLoading] = useState(false);

  const requestPermission = useCallback(async (type: PermissionType) => {
    setIsLoading(true);
    try {
      const state = await permissionManager.requestPermission(type);
      setStates(prev => ({
        ...prev,
        [type]: state,
      }));
      return state;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const checkPermission = useCallback(async (type: PermissionType) => {
    setIsLoading(true);
    try {
      const state = await permissionManager.checkPermission(type);
      setStates(prev => ({
        ...prev,
        [type]: state,
      }));
      return state;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const requestMultiplePermissions = useCallback(async (types: PermissionType[]) => {
    setIsLoading(true);
    try {
      const results = await permissionManager.requestMultiplePermissions(types);
      setStates(prev => ({
        ...prev,
        ...results,
      }));
      return results;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const openSettings = useCallback(async () => {
    await permissionManager.openSettings();
  }, []);

  const getPermissionState = useCallback(
    (type: PermissionType): PermissionState => {
      return states[type] || {
        type,
        status: PermissionStatus.DENIED,
        canAskAgain: true,
      };
    },
    [states]
  );

  const isGranted = useCallback(
    (type: PermissionType): boolean => {
      return getPermissionState(type).status === PermissionStatus.GRANTED;
    },
    [getPermissionState]
  );

  const isBlocked = useCallback(
    (type: PermissionType): boolean => {
      return getPermissionState(type).status === PermissionStatus.BLOCKED;
    },
    [getPermissionState]
  );

  const canAskAgain = useCallback(
    (type: PermissionType): boolean => {
      return getPermissionState(type).canAskAgain;
    },
    [getPermissionState]
  );

  const resetPermissions = useCallback(async () => {
    setIsLoading(true);
    try {
      const newStates: Partial<PermissionStates> = {};
      for (const type of initialTypes) {
        const state = await permissionManager.checkPermission(type);
        newStates[type] = state;
      }
      setStates(newStates as PermissionStates);
    } finally {
      setIsLoading(false);
    }
  }, [initialTypes]);

  return {
    states,
    isLoading,
    requestPermission,
    checkPermission,
    requestMultiplePermissions,
    openSettings,
    getPermissionState,
    isGranted,
    isBlocked,
    canAskAgain,
    resetPermissions,
  };
};

