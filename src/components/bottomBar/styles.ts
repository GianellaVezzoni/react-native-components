import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  floatingBar: {
    flexDirection: 'row',
    backgroundColor: colors.quaternary,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  slidingContainer: {
    flexDirection: 'row',
    backgroundColor: colors.quinary,
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
    paddingVertical: 8,
    position: 'relative',
  },
  slidingIndicator: {
    position: 'absolute',
    top: 0,
    left: 10,
    height: 3,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  scaleContainer: {
    flexDirection: 'row',
    backgroundColor: colors.quinary,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
    justifyContent: 'space-around',
  },
  scaleBubble: {
    backgroundColor: colors.secondary,
    borderRadius: 25,
    padding: 8,
  },
  morphingContainer: {
    flexDirection: 'row',
    backgroundColor: colors.quinary,
    paddingVertical: 16,
    paddingHorizontal: 12,
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
  },
  morphingTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 8,
  },
  morphingLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.quinary,
  },
  waveContainer: {
    flexDirection: 'row',
    backgroundColor: colors.quaternary,
    paddingVertical: 16,
    justifyContent: 'space-around',
  },
  waveBubble: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 8,
  },
  waveLabel: {
    fontSize: 10,
    color: colors.tertiary,
    marginTop: 4,
  },
  activeWaveLabel: {
    color: colors.primary,
    fontWeight: '600',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 24,
  },
  activeIcon: {
    fontSize: 26,
  },
  whiteIcon: {
    opacity: 1,
  },
  label: {
    fontSize: 11,
    color: colors.tertiary,
    marginTop: 4,
  },
  activeLabel: {
    fontSize: 11,
    color: colors.quinary,
    fontWeight: '600',
    marginTop: 4,
  },
  smallLabel: {
    fontSize: 10,
    color: colors.tertiary,
    marginTop: 6,
  },
  activeSmallLabel: {
    color: colors.primary,
    fontWeight: '600',
  },
});

