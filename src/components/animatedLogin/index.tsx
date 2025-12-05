import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AnimatedMonster from './AnimatedMonster';

interface AnimatedLoginProps {
  onLogin?: (email: string, password: string) => void;
}

export default function AnimatedLogin({ onLogin }: AnimatedLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const handleLogin = () => {
    onLogin?.(email, password);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.content, { paddingTop: insets.top + 20 }]}>
        <View style={styles.header}>
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
        </View>

        <View style={styles.monsterContainer}>
          <AnimatedMonster
            isCoveringEyes={isPasswordFocused && password.length > 0}
            isPasswordVisible={isPasswordVisible}
          />
        </View>
    
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.passwordHeader}>
              <Text style={styles.label}>Contraseña</Text>
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                style={styles.eyeButton}
              >
                <Text style={styles.eyeButtonText}>
                  {isPasswordVisible ? 'Ver' : 'Ocultar'}
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.loginButton,
              (!email || !password) && styles.loginButtonDisabled,
            ]}
            onPress={handleLogin}
            disabled={!email || !password}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e27',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '500',
  },
  monsterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    marginBottom: 40,
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eyeButton: {
    padding: 4,
  },
  eyeButtonText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  loginButton: {
    backgroundColor: '#00f5ff',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  loginButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    shadowOpacity: 0,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0a0e27',
    letterSpacing: 1,
  },
});

