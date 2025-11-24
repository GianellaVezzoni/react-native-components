import { useState, useEffect } from 'react';
import NetInfo, { NetInfoState, NetInfoStateType } from '@react-native-community/netinfo';

export interface NetworkStatus {
  isConnected: boolean | null;
  isInternetReachable: boolean | null;
  type: NetInfoStateType | null;
  slow: boolean;
}

export function useNetworkStatus(): NetworkStatus {
  const [networkState, setNetworkState] = useState<NetworkStatus>({
    isConnected: null,
    isInternetReachable: null,
    type: null,
    slow: false,
  });

  useEffect(() => {
    NetInfo.fetch().then((state: NetInfoState) => {
      const downlink = state.details && 'downlink' in state.details 
        ? (state.details as { downlink?: number }).downlink 
        : null;
      
      setNetworkState({
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable ?? null,
        type: state.type,
        slow: downlink !== null && downlink !== undefined && downlink < 1,
      });
    });

    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const downlink = state.details && 'downlink' in state.details 
        ? (state.details as { downlink?: number }).downlink 
        : null;
      
      setNetworkState({
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable ?? null,
        type: state.type,
        slow: downlink !== null && downlink !== undefined && downlink < 1,
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return networkState;
}

