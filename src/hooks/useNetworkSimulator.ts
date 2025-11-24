import { useState, useEffect, useRef } from 'react';
import { NetworkStatus } from './useNetworkStatus';

type SimulatedState = 'connected' | 'offline';

export function useNetworkSimulator(
  realNetworkStatus: NetworkStatus,
  enabled: boolean = true
): NetworkStatus {
  const [simulatedState, setSimulatedState] = useState<SimulatedState>('connected');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setSimulatedState((prevState) => 
        prevState === 'connected' ? 'offline' : 'connected'
      );
    }, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled]);

  if (!enabled) {
    return realNetworkStatus;
  }

  switch (simulatedState) {
    case 'offline':
      return {
        isConnected: false,
        isInternetReachable: false,
        type: null,
        slow: false,
      };
    case 'connected':
    default:
      return {
        isConnected: true,
        isInternetReachable: true,
        type: null,
        slow: false,
      };
  }
}

