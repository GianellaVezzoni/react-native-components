import { StyleSheet } from 'react-native';

export const useStyles = () => StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e2e8f0',
  },
  titleDark: {
    color: '#e2e8f0',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
  },
  seeAllDark: {
    color: '#60a5fa',
  },
  recipientsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  recipientCard: {
    width: '47%',
    backgroundColor: '#1a1f2e',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  recipientCardDark: {
    backgroundColor: '#1a1f2e',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatar: {
    fontSize: 24,
  },
  recipientName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e2e8f0',
    marginBottom: 4,
    textAlign: 'center',
  },
  recipientNameDark: {
    color: '#e2e8f0',
  },
  recipientDate: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 4,
  },
  recipientDateDark: {
    color: '#a0aec0',
  },
  recipientAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#e2e8f0',
  },
  recipientAmountDark: {
    color: '#e2e8f0',
  },
  addRecipientCard: {
    width: '47%',
    backgroundColor: '#1a1f2e',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#374151',
    borderStyle: 'dashed',
  },
  addRecipientCardDark: {
    backgroundColor: '#1a1f2e',
    borderColor: '#374151',
  },
  addIcon: {
    fontSize: 24,
    color: '#3b82f6',
    marginBottom: 4,
  },
  addText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#a0aec0',
  },
  addTextDark: {
    color: '#a0aec0',
  },
});

