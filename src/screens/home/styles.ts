import { StyleSheet } from 'react-native';

export const useStyles = () => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1419',
  },
  containerDark: {
    backgroundColor: '#0f1419',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: '#a0aec0',
    marginBottom: 4,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: '#e2e8f0',
  },
  balanceCard: {
    backgroundColor: '#1a1f2e',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#a0aec0',
  },
  eyeIcon: {
    fontSize: 14,
    color: '#a0aec0',
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '800',
    color: '#e2e8f0',
    letterSpacing: -0.5,
  },
  quickActions: {
    flex: 1,
    justifyContent: 'center',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#1a1f2e',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  sendIcon: {
    backgroundColor: '#3b82f6',
  },
  requestIcon: {
    backgroundColor: '#3b82f6',
  },
  actionIconText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: '600',
  },
  actionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e2e8f0',
  },
  spacer: {
    height: 24,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    justifyContent: 'space-between',
    gap: 10,
    width: '98%',
  }
});

