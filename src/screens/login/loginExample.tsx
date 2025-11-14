import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { makeStyles } from './styles';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const LoginExample = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const styles = makeStyles(width, height);

  const handleLogin = () => {
    console.log('Login pressed');
  };

  const handleMetamask = () => {
    console.log('Metamask login');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />
      <View style={styles.decorativeCircle3} />

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <LottieView 
            source={require('../../assets/animation.json')} 
            autoPlay 
            loop
            style={styles.lottieAnimation}
          />
        </View>
        <Text style={styles.title}>Crypto</Text>
        <Text style={styles.subtitle}>Completa los datos para ingresar</Text>

        <View style={styles.inputContainer}>
          <Icon name="account-outline" size={22} color="#E89BB5" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#8B7FA8"
            value={login}
            onChangeText={setLogin}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock-outline" size={22} color="#E89BB5" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#8B7FA8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
          >
            <Icon 
              name={showPassword ? 'eye-outline' : 'eye-off-outline'} 
              size={22} 
              color="#A89FC6" 
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#FF6B9D', '#FFA07A', '#FF8C94']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <Text style={styles.loginButtonText}>Ingresar</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.linksContainer}>
          <TouchableOpacity>
            <Text style={styles.linkText}>Crear cuenta</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.metamaskButton}
          onPress={handleMetamask}
          activeOpacity={0.8}
        >
          <Icon name="google" size={24} color="#E89BB5" />
          <Text style={styles.metamaskText}>Ingresar con Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginExample;
