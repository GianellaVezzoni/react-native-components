import { StyleSheet } from 'react-native';

export const useStyles = () => StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
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
  cardsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 20,
  },
  addCardButton: {
    width: 60,
    borderRadius: 16,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addCardButtonDark: {
    backgroundColor: '#3b82f6',
  },
  addCardIcon: {
    fontSize: 32,
    color: '#ffffff',
    fontWeight: '300',
  },
  card: {
    width: 280,
    height: 160,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
  },
  card1: {
    backgroundColor: '#8b5cf6',
  },
  card2: {
    backgroundColor: '#7c3aed',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    opacity: 0.9,
  },
  cardNumberContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 20,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 2,
  },
  cardName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    opacity: 0.8,
    marginTop: 20,
    letterSpacing: 1,
  },
});

