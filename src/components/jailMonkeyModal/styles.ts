import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#EF4444',
    marginBottom: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  messageContainer: {
    marginBottom: 24,
  },
  message: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
    textAlign: 'center',
  },
  detailsContainer: {
    width: '100%',
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#111827',
    borderRadius: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  detailText: {
    fontSize: 13,
    color: '#D1D5DB',
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exitButton: {
    backgroundColor: '#EF4444',
  },
  exitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: '#374151',
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

