import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Keychain from 'react-native-keychain';
import { styles } from './styles';

const SERVICE_NAME = 'com.awesomeproject.credentials';

export const KeychainScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styleSheet = styles(isDark);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [savedCredentials, setSavedCredentials] = useState<{
    username: string;
    password: string;
  } | null>(null);
  const [hasCredentials, setHasCredentials] = useState(false);

  useEffect(() => {
    checkCredentials();
  }, []);

  const checkCredentials = async () => {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: SERVICE_NAME,
      });

      if (credentials) {
        setHasCredentials(true);
        setSavedCredentials({
          username: credentials.username,
          password: credentials.password,
        });
      } else {
        setHasCredentials(false);
        setSavedCredentials(null);
      }
    } catch (error) {
      console.error('Error checking credentials:', error);
      setHasCredentials(false);
    }
  };

  const saveCredentials = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      await Keychain.setGenericPassword(username, password, {
        service: SERVICE_NAME,
      });
      Alert.alert('Éxito', 'Credenciales guardadas correctamente');
      setUsername('');
      setPassword('');
      await checkCredentials();
    } catch (error) {
      console.error('Error saving credentials:', error);
      Alert.alert('Error', 'No se pudieron guardar las credenciales');
    }
  };

  const retrieveCredentials = async () => {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: SERVICE_NAME,
      });

      if (credentials) {
        setSavedCredentials({
          username: credentials.username,
          password: credentials.password,
        });
        Alert.alert(
          'Credenciales recuperadas',
          `Usuario: ${credentials.username}\nContraseña: ${credentials.password}`
        );
      } else {
        Alert.alert('Info', 'No hay credenciales guardadas');
        setSavedCredentials(null);
      }
    } catch (error) {
      console.error('Error retrieving credentials:', error);
      Alert.alert('Error', 'No se pudieron recuperar las credenciales');
    }
  };

  const deleteCredentials = async () => {
    try {
      const result = await Keychain.resetGenericPassword({
        service: SERVICE_NAME,
      });

      if (result) {
        Alert.alert('Éxito', 'Credenciales eliminadas correctamente');
        setSavedCredentials(null);
        setHasCredentials(false);
      } else {
        Alert.alert('Info', 'No había credenciales para eliminar');
      }
    } catch (error) {
      console.error('Error deleting credentials:', error);
      Alert.alert('Error', 'No se pudieron eliminar las credenciales');
    }
  };

  return (
    <SafeAreaView style={styleSheet.container} edges={['top', 'bottom']}>
      <ScrollView
        style={styleSheet.scrollView}
        contentContainerStyle={styleSheet.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styleSheet.header}>
          <Text style={styleSheet.title}>Keychain Example</Text>
          <Text style={styleSheet.subtitle}>
            Guarda y recupera credenciales de forma segura
          </Text>
        </View>
        <View style={styleSheet.statusCard}>
          <Text style={styleSheet.statusTitle}>Estado actual</Text>
          <View style={styleSheet.statusRow}>
            <Text style={styleSheet.statusLabel}>Credenciales guardadas:</Text>
            <Text
              style={[
                styleSheet.statusValue,
                hasCredentials && styleSheet.statusValueSuccess,
              ]}
            >
              {hasCredentials ? 'Sí' : 'No'}
            </Text>
          </View>
          {savedCredentials && (
            <View style={styleSheet.credentialsInfo}>
              <Text style={styleSheet.credentialsLabel}>Usuario guardado:</Text>
              <Text style={styleSheet.credentialsValue}>
                {savedCredentials.username}
              </Text>
            </View>
          )}
        </View>

        <View style={styleSheet.section}>
          <Text style={styleSheet.sectionTitle}>Guardar credenciales</Text>
          <View style={styleSheet.inputContainer}>
            <Text style={styleSheet.inputLabel}>Usuario</Text>
            <TextInput
              style={styleSheet.input}
              placeholder="Ingresa tu usuario"
              placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styleSheet.inputContainer}>
            <Text style={styleSheet.inputLabel}>Contraseña</Text>
            <TextInput
              style={styleSheet.input}
              placeholder="Ingresa tu contraseña"
              placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <TouchableOpacity
            style={[styleSheet.button, styleSheet.buttonPrimary]}
            onPress={saveCredentials}
            activeOpacity={0.7}
          >
            <Text style={styleSheet.buttonText}>Guardar credenciales</Text>
          </TouchableOpacity>
        </View>

        <View style={styleSheet.section}>
          <Text style={styleSheet.sectionTitle}>Acciones</Text>
          <TouchableOpacity
            style={[styleSheet.button, styleSheet.buttonSecondary]}
            onPress={retrieveCredentials}
            activeOpacity={0.7}
          >
            <Text style={styleSheet.buttonText}>Recuperar credenciales</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styleSheet.button, styleSheet.buttonDanger]}
            onPress={deleteCredentials}
            activeOpacity={0.7}
          >
            <Text style={styleSheet.buttonText}>Eliminar credenciales</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

