import React from "react";
import { HomeScreen } from "./src/screens/home";
import { FeatureFlagsProvider } from "./src/contexts/FeatureFlagsContext";

export default function App() {
  return (
    <FeatureFlagsProvider>
      <HomeScreen />
    </FeatureFlagsProvider>
  );
}