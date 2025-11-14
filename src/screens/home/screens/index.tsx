import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);

  const recipients = [
    { id: 1, name: 'Willam Smoth', date: '17th Sep', amount: '$1200.00', color: '#8B5CF6' },
    { id: 2, name: 'Hena Aminia', date: '17th Sep', amount: '$100.00', color: '#10B981' },
    { id: 3, name: 'Alex Fleix', date: '17th Sep', amount: '$90.00', color: '#EC4899' },
  ];

  const cards = [
    { id: 1, number: '4802 2215 1185 4289', name: 'MICHAEL SCOTT' },
    { id: 2, number: '4802 2215 1185 4289', name: 'MICHAEL SCOTT' },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F0B1F" />
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.notificationBadge}>
              <Icon name="bell-outline" size={24} color="#FFFFFF" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </View>
          </View>
          <Text style={styles.greeting}>Welcome Back!</Text>
        </View>

        <View style={styles.balanceContainer}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Wallet Balance</Text>
            <TouchableOpacity
              onPress={() => setBalanceVisible(!balanceVisible)}
              style={styles.eyeButton}
            >
              <Icon
                name={balanceVisible ? 'eye-outline' : 'eye-off-outline'}
                size={24}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.balanceAmount}>
            {balanceVisible ? '$17,298.92' : '••••••'}
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Cards</Text>
          </View>
          <View style={styles.cardsContainer}>
            <TouchableOpacity style={styles.addCardButton}>
              <Icon name="plus" size={32} color="#FFFFFF" />
            </TouchableOpacity>
            {cards.map((card) => (
              <View key={card.id} style={styles.card}>
                <Text style={styles.cardLabel}>Credit</Text>
                <Text style={styles.cardNumber}>{card.number}</Text>
                <Text style={styles.cardName}>{card.name}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionButtonIcon}>
              <Icon name="arrow-up" size={24} color="#3B82F6" />
            </View>
            <Text style={styles.actionButtonText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionButtonIcon}>
              <Icon name="arrow-down" size={24} color="#3B82F6" />
            </View>
            <Text style={styles.actionButtonText}>Request</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recipients</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.recipientsGrid}>
            {recipients.map((recipient) => (
              <TouchableOpacity key={recipient.id} style={styles.recipientCard}>
                <View style={[styles.recipientAvatar, { backgroundColor: recipient.color }]}>
                  <Text style={styles.recipientInitials}>
                    {getInitials(recipient.name)}
                  </Text>
                </View>
                <Text style={styles.recipientName} numberOfLines={1}>
                  {recipient.name}
                </Text>
                <Text style={styles.recipientDate}>{recipient.date}</Text>
                <Text style={styles.recipientAmount}>{recipient.amount}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.addRecipientCard}>
              <Icon name="plus" size={32} color="#6B7280" />
              <Text style={styles.addRecipientText}>Add More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
