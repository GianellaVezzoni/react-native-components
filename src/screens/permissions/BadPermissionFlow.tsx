import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PermissionType, PermissionStatus } from '../../services/permissions/types';
import { usePermissions } from '../../hooks/usePermissions';
import { PermissionStatusCard } from '../../components/permissions/PermissionStatusCard';
import { styles } from './styles';

export const BadPermissionFlow: React.FC = () => {
  const {
    requestPermission,
    states,
    isLoading,
    openSettings,
    resetPermissions,
  } = usePermissions([
    PermissionType.LOCATION,
    PermissionType.CAMERA,
    PermissionType.CONTACTS,
  ]);

  const [hasRequested, setHasRequested] = useState(false);

  const handleRequestAllPermissions = async () => {
    console.log('BadPermissionFlow: Starting to request all permissions');
    setHasRequested(true);
    
    // Request all permissions sequentially to show all native dialogs (bad practice - no explanation)
    const permissions = [
      PermissionType.LOCATION,
      PermissionType.CAMERA,
      PermissionType.CONTACTS,
    ];
    
    // Request them one by one so user sees all native dialogs
    for (let i = 0; i < permissions.length; i++) {
      const permission = permissions[i];
      if (!permission) continue;
      
      console.log(`BadPermissionFlow: Requesting ${permission}...`);
      try {
        // Request permission - this will show native dialog
        const result = await requestPermission(permission);
        console.log(`BadPermissionFlow: ${permission} result:`, result);
        
        // Wait longer between requests to ensure user can respond to each dialog
        if (i < permissions.length - 1) {
          console.log(`BadPermissionFlow: Waiting before next permission...`);
          await new Promise<void>(resolve => setTimeout(() => resolve(), 2000));
        }
      } catch (error) {
        // Silently fail - bad practice
        console.warn(`BadPermissionFlow: Failed to request ${permission}:`, error);
      }
    }
    console.log('BadPermissionFlow: Finished requesting all permissions');
  };

  // Request all permissions immediately when component mounts (bad practice)
  useEffect(() => {
    console.log('BadPermissionFlow: Component mounted, hasRequested:', hasRequested);
    if (!hasRequested) {
      // Small delay to ensure component is fully mounted
      const timer = setTimeout(() => {
        console.log('BadPermissionFlow: Timer fired, calling handleRequestAllPermissions');
        handleRequestAllPermissions();
      }, 500);
      return () => {
        console.log('BadPermissionFlow: Cleanup timer');
        clearTimeout(timer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUseFeature = (type: PermissionType) => {
    const state = states[type];
    if (!state || state.status !== PermissionStatus.GRANTED) {
      Alert.alert('Error', 'Necesitas conceder el permiso primero');
      return;
    }

    Alert.alert('Éxito', `Usando ${type}...`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Bad Flow</Text>
            <Text style={styles.headerSubtitle}>Poor permission handling</Text>
          </View>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={resetPermissions}
            activeOpacity={0.7}
          >
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#10B981" />
            <Text style={styles.loadingText}>Requesting permissions...</Text>
          </View>
        )}

        <View style={styles.permissionsList}>
          <PermissionStatusCard
            type={PermissionType.LOCATION}
            status={states[PermissionType.LOCATION]?.status || PermissionStatus.DENIED}
            canAskAgain={states[PermissionType.LOCATION]?.canAskAgain ?? true}
            onRequest={() => handleRequestAllPermissions()}
            onOpenSettings={openSettings}
          />

          <PermissionStatusCard
            type={PermissionType.CAMERA}
            status={states[PermissionType.CAMERA]?.status || PermissionStatus.DENIED}
            canAskAgain={states[PermissionType.CAMERA]?.canAskAgain ?? true}
            onRequest={() => handleRequestAllPermissions()}
            onOpenSettings={openSettings}
          />

          <PermissionStatusCard
            type={PermissionType.CONTACTS}
            status={states[PermissionType.CONTACTS]?.status || PermissionStatus.DENIED}
            canAskAgain={states[PermissionType.CONTACTS]?.canAskAgain ?? true}
            onRequest={() => handleRequestAllPermissions()}
            onOpenSettings={openSettings}
          />
        </View>
        </ScrollView>
    </SafeAreaView>
  );
};

