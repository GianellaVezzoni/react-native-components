import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './styles';

interface JailMonkeyModalProps {
  visible?: boolean;
  onClose?: () => void;
  allowInDevelopment?: boolean;
}

const JailMonkeyModal: React.FC<JailMonkeyModalProps> = ({
  onClose,
  visible,
}) => {
  const [showModal, setShowModal] = useState(visible || false);

  const handleClose = () => {
    setShowModal(false);
    if (onClose) {
      onClose();
    }
  };

  const handleExit = () => {
    Alert.alert(
      'Security Warning',
      'For your security, this app cannot run on compromised devices.',
      [
        {
          text: 'Exit App',
          onPress: () => {  
            handleClose();
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  if (!showModal) {
    return null;
  }

  return (
    <Modal
      visible={showModal}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.iconContainer}>
            <Icon name="shield-alert" size={64} color="#EF4444" />
          </View>

          <Text style={styles.title}>Security Warning</Text>
          <Text style={styles.subtitle}>
            Device Security Compromised
          </Text>

          <View style={styles.messageContainer}>
            <Text style={styles.message}>
              This application has detected that your device may be compromised.
              For security reasons, we cannot allow the app to run in this
              environment.
            </Text>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Icon name="alert-circle" size={20} color="#F59E0B" />
              <Text style={styles.detailText}>
                Rooted/Jailbroken device detected
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Icon name="alert-circle" size={20} color="#F59E0B" />
              <Text style={styles.detailText}>
                Debugging tools detected
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Icon name="alert-circle" size={20} color="#F59E0B" />
              <Text style={styles.detailText}>
                Security risks identified
              </Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.exitButton]}
              onPress={handleExit}
            >
              <Text style={styles.exitButtonText}>Exit Application</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={handleClose}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default JailMonkeyModal;
