import { ActivityIndicator, Text, View } from 'react-native';
import { useStyles } from './styles';

export const SimpleLoader = ({
  isLoading,
  isDark,
}: {
  isLoading: boolean;
  isDark: boolean;
}) => {
  const styles = useStyles();
  if (!isLoading) return null;

  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color={isDark ? '#667eea' : '#7c3aed'} />
      <Text style={[styles.loaderText, isDark && styles.loaderTextDark]}>
        Loading data...
      </Text>
    </View>
  );
};
