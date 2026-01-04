import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PermissionType, PermissionStatus } from '../../services/permissions/types';
import { usePermissions } from '../../hooks/usePermissions';
import { PERMISSION_INFO } from '../../services/permissions/permissionInfo';
import { PrePermissionScreen } from '../../components/permissions/PrePermissionScreen';
import { PermissionStatusCard } from '../../components/permissions/PermissionStatusCard';
import { styles } from './styles';

export const GoodPermissionFlow: React.FC = () => {
  const {
    requestPermission,
    states,
    openSettings,
    resetPermissions,
    checkPermission,
  } = usePermissions([
    PermissionType.LOCATION,
    PermissionType.CAMERA,
    PermissionType.CONTACTS,
  ]);

  const [currentPermission, setCurrentPermission] = useState<PermissionType | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    const checkAllPermissions = async () => {
      await checkPermission(PermissionType.LOCATION);
      await checkPermission(PermissionType.CAMERA);
      await checkPermission(PermissionType.CONTACTS);
    };
    checkAllPermissions();
  }, [checkPermission]);

  useEffect(() => {
    console.log('GoodPermissionFlow: currentPermission changed to:', currentPermission);
    if (currentPermission) {
      const info = PERMISSION_INFO[currentPermission];
      console.log('GoodPermissionFlow: permissionInfo available:', !!info);
    }
  }, [currentPermission]);

  const handleRequestPermission = (type: PermissionType) => {
    setCurrentPermission(type);
  };

  const handleContinueFromPrePermission = async () => {
    if (!currentPermission || isRequesting) return;

    setIsRequesting(true);
    
    try {
      await requestPermission(currentPermission);
      
      setCurrentPermission(null);
    } catch (error) {
      console.error('Error requesting permission:', error);
      setCurrentPermission(null);
    } finally {
      setIsRequesting(false);
    }
  };

  const handleSkipPermission = () => {
    setCurrentPermission(null);
  };
  
  const permissionInfo = currentPermission ? PERMISSION_INFO[currentPermission] : null;
  
  return (
    <>
      {currentPermission && permissionInfo && (
        <PrePermissionScreen
          key={currentPermission}
          permissionInfo={permissionInfo}
          onContinue={handleContinueFromPrePermission}
          onSkip={handleSkipPermission}
          isLoading={isRequesting}
        />
      )}
      
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.headerTitle}>Good Flow</Text>
              <Text style={styles.headerSubtitle}>Best practices implementation</Text>
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
          <View style={styles.permissionsList}>
            <PermissionStatusCard
              type={PermissionType.LOCATION}
              status={states[PermissionType.LOCATION]?.status || PermissionStatus.DENIED}
              canAskAgain={states[PermissionType.LOCATION]?.canAskAgain ?? true}
              onRequest={() => handleRequestPermission(PermissionType.LOCATION)}
              onOpenSettings={openSettings}
            />

            <PermissionStatusCard
              type={PermissionType.CAMERA}
              status={states[PermissionType.CAMERA]?.status || PermissionStatus.DENIED}
              canAskAgain={states[PermissionType.CAMERA]?.canAskAgain ?? true}
              onRequest={() => handleRequestPermission(PermissionType.CAMERA)}
              onOpenSettings={openSettings}
            />

            <PermissionStatusCard
              type={PermissionType.CONTACTS}
              status={states[PermissionType.CONTACTS]?.status || PermissionStatus.DENIED}
              canAskAgain={states[PermissionType.CONTACTS]?.canAskAgain ?? true}
              onRequest={() => handleRequestPermission(PermissionType.CONTACTS)}
              onOpenSettings={openSettings}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

