import React, { useState, useCallback } from 'react';
import UserInactivity from 'react-native-user-inactivity';

export const useIdleAnimation = (timeout: number = 8000) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const resetIdleTimer = useCallback(() => {
    setIsActive(true);
    setIsVisible(false);
  }, []);

  const handleInactivity = useCallback((active: boolean) => {
    setIsActive(active);
    setIsVisible(!active);
  }, []);

  const UserInactivityWrapper = useCallback(
    ({ children }: { children: React.ReactNode }) => {
      return (
        <UserInactivity
          isActive={isActive}
          timeForInactivity={timeout}
          onAction={handleInactivity}
        >
          {children}
        </UserInactivity>
      );
    },
    [isActive, timeout, handleInactivity],
  );

  return {
    isVisible,
    resetIdleTimer,
    UserInactivityWrapper,
  };
};
