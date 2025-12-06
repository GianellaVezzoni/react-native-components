import { StyleSheet } from 'react-native';

export const useStyles = () => StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    zIndex: 1000,
  },
  mascotWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mascotTouchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mascotBody: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});


