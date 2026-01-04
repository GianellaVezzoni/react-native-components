import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useStyles } from './styles';

interface Recipient {
  name: string;
  date: string;
  amount: string;
  avatar: string;
}

interface RecipientsSectionProps {
  isDark: boolean;
}

const recipients: Recipient[] = [
  { name: 'Willam Smoth', date: '17th Sep', amount: '$1.200,00', avatar: '👤' },
  { name: 'Hena Aminia', date: '17th Sep', amount: '$10.000,00', avatar: '👤' },
  { name: 'Alex Fleix', date: '17th Sep', amount: '$9.000,00', avatar: '👤' },
];

export const RecipientsSection = ({ isDark }: RecipientsSectionProps) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, isDark && styles.titleDark]}>Recipients</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={[styles.seeAll, isDark && styles.seeAllDark]}>See all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.recipientsGrid}>
        {recipients.map((recipient, index) => (
          <View
            key={index}
            style={[styles.recipientCard, isDark && styles.recipientCardDark]}
          >
            <View style={styles.avatarContainer}>
              <Text style={styles.avatar}>{recipient.avatar}</Text>
            </View>
            <Text style={[styles.recipientName, isDark && styles.recipientNameDark]}>
              {recipient.name}
            </Text>
            <Text style={[styles.recipientDate, isDark && styles.recipientDateDark]}>
              {recipient.date}
            </Text>
            <Text style={[styles.recipientAmount, isDark && styles.recipientAmountDark]}>
              {recipient.amount}
            </Text>
          </View>
        ))}

        <TouchableOpacity
          style={[styles.addRecipientCard, isDark && styles.addRecipientCardDark]}
          activeOpacity={0.7}
        >
          <Text style={styles.addIcon}>+</Text>
          <Text style={[styles.addText, isDark && styles.addTextDark]}>Add More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

