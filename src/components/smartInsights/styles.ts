import { StyleSheet } from 'react-native';

export const useStyles = () => StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  containerDark: {
    backgroundColor: '#1a1f2e',
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
    color: '#1a202c',
  },
  titleDark: {
    color: '#e2e8f0',
  },
  icon: {
    fontSize: 24,
  },
  insightRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  insightItem: {
    flex: 1,
  },
  divider: {
    width: 1,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 16,
  },
  insightLabel: {
    fontSize: 13,
    color: '#718096',
    marginBottom: 4,
  },
  insightLabelDark: {
    color: '#a0aec0',
  },
  insightValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a202c',
  },
  insightValueDark: {
    color: '#e2e8f0',
  },
  button: {
    backgroundColor: '#667eea',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonDark: {
    backgroundColor: '#7c3aed',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});

