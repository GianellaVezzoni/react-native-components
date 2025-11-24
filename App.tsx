import React, { useState } from 'react';
import { View } from 'react-native';
import {
  useNetworkStatus,
  OfflineBanner,
  SlowNetworkBanner,
} from './src/components/networkStatus';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MarketplaceScreen } from './src/screens/marketplace';
import { useNetworkSimulator } from './src/hooks/useNetworkSimulator';

export default function App() {
  const realNetworkStatus = useNetworkStatus();
  const [simulationEnabled, _] = useState(true);  
  const networkStatus = useNetworkSimulator(realNetworkStatus, simulationEnabled);
  const { isConnected, slow, isInternetReachable } = networkStatus;

  const showOfflineBanner = 
    isConnected === false || 
    (isConnected !== null && isInternetReachable === false);
  
  const showSlowBanner = 
    isConnected === true && 
    isInternetReachable !== false && 
    slow;


  return (
    <SafeAreaView edges={['top']}>
      <View>
        {showOfflineBanner && <OfflineBanner />}
        {showSlowBanner && <SlowNetworkBanner />}
        <MarketplaceScreen />
      </View>
    </SafeAreaView>
  );
}
