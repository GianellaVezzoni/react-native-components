import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useStyles } from './styles';

interface CardsSectionProps {
  isDark: boolean;
}

export const CardsSection = ({ isDark }: CardsSectionProps) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, isDark && styles.titleDark]}>Cards</Text>
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardsContainer}
      >
        <TouchableOpacity
          style={[styles.addCardButton, isDark && styles.addCardButtonDark]}
          activeOpacity={0.7}
        >
          <Text style={styles.addCardIcon}>+</Text>
        </TouchableOpacity>

        <View style={[styles.card, styles.card1]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardType}>Credit</Text>
          </View>
          <View style={styles.cardNumberContainer}>
            <Text style={styles.cardNumber}>4802</Text>
            <Text style={styles.cardNumber}>2215</Text>
            <Text style={styles.cardNumber}>1185</Text>
            <Text style={styles.cardNumber}>4289</Text>
          </View>
          <Text style={styles.cardName}>MICHAEL SCOTT</Text>
        </View>

        <View style={[styles.card, styles.card2]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardType}>Credit</Text>
          </View>
          <View style={styles.cardNumberContainer}>
            <Text style={styles.cardNumber}>4802</Text>
            <Text style={styles.cardNumber}>2215</Text>
            <Text style={styles.cardNumber}>1185</Text>
            <Text style={styles.cardNumber}>4289</Text>
          </View>
          <Text style={styles.cardName}>MICHAEL SCOTT</Text>
        </View>
      </ScrollView>
    </View>
  );
};

