/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Home from './src/screens/home/screens';
import JailMonkeyModal from './src/components/jailMonkeyModal';
import JailMonkey from 'jail-monkey';

export default function App() {
  const isJailBroken = JailMonkey.isJailBroken();
  const isOnExternalStorage = JailMonkey.isOnExternalStorage();
  const isDevelopmentSettingsMode = JailMonkey.isDevelopmentSettingsMode();
  const canMockLocation = JailMonkey.canMockLocation();
  const [isCompromised, setIsCompromised] = useState(false);

  const isCompromisedDevice =
    isJailBroken ||
    isOnExternalStorage ||
    isDevelopmentSettingsMode ||
    canMockLocation;

  useEffect(() => {
    if (isCompromisedDevice) {
      setIsCompromised(true);
    }
  }, []);

  return (
    <>
      <JailMonkeyModal visible={isCompromised} />
      <Home />
    </>
  );
}
