import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { BottomBarFactory, BarVariant, DEFAULT_TABS } from '../../components/bottomBar';
import { styles } from './styles';

const VARIANTS = [
  { id: BarVariant.Floating, name: 'Floating' },
  { id: BarVariant.Sliding, name: 'Sliding' },
  { id: BarVariant.Scale, name: 'Scale' },
  { id: BarVariant.Morphing, name: 'Morphing' },
  { id: BarVariant.Wave, name: 'Wave' },
];

export const BottomBarDemo = () => {
  const [selectedVariant, setSelectedVariant] = useState<BarVariant>(BarVariant.Floating);
  const [activeTab, setActiveTab] = useState('home');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bottom Bar Examples</Text>
      </View>

      <ScrollView 
        style={styles.variantSelector}
        contentContainerStyle={styles.variantContent}
      >
        {VARIANTS.map(variant => (
          <TouchableOpacity
            key={variant.id}
            onPress={() => setSelectedVariant(variant.id)}
            style={[
              styles.variantCard,
              selectedVariant === variant.id && styles.variantCardActive,
            ]}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.variantName,
              selectedVariant === variant.id && styles.variantNameActive,
            ]}>
              {variant.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <BottomBarFactory
        variant={selectedVariant}
        activeTab={activeTab}
        onTabPress={setActiveTab}
        tabs={DEFAULT_TABS}
      />
    </View>
  );
};

