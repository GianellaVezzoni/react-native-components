import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AnimatedLogin from "./src/components/animatedLogin";

export default function App() {
  const handleLogin = (email: string, password: string) => {
    console.log("Login attempt:", { email, password });
    // Aquí puedes agregar la lógica de autenticación
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AnimatedLogin onLogin={handleLogin} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}