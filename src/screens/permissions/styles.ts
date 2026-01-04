import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    letterSpacing: 0.1,
    fontWeight: '500',
  },
  resetButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  resetButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
  warningBox: {
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  warningText: {
    fontSize: 14,
    color: '#DC2626',
    lineHeight: 22,
    letterSpacing: 0.1,
    fontWeight: '500',
  },
  infoBox: {
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  infoText: {
    fontSize: 14,
    color: '#059669',
    lineHeight: 22,
    letterSpacing: 0.1,
    fontWeight: '500',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 32,
    marginBottom: 24,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 15,
    color: '#6B7280',
    letterSpacing: 0.1,
    fontWeight: '500',
  },
  permissionsList: {
    marginBottom: 32,
  },
  actionsContainer: {
    marginTop: 8,
  },
  actionsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
    letterSpacing: 0.2,
  },
  actionButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 28,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  actionButtonSuccess: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  actionButtonText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  actionButtonSuccessText: {
    color: '#FFFFFF',
  },
});
