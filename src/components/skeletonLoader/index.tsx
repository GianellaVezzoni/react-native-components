import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useStyles } from './styles';

export const SkeletonLoader = ({
  isLoading,
  isDark,
}: {
  isLoading: boolean;
  isDark: boolean;
}) => {
  const styles = useStyles();
  if (!isLoading) return null;

  const skeletonBgColor = isDark ? '#1e2532' : '#e1e8ed';
  const skeletonHighlightColor = isDark ? '#2a3441' : '#f0f4f8';

  return (
    <View style={styles.skeletonContainer}>
      <SkeletonPlaceholder
        backgroundColor={skeletonBgColor}
        highlightColor={skeletonHighlightColor}
        speed={1200}
      >
        <View style={styles.skeletonContent}>
          {[1, 2, 3, 4, 5].map(item => (
            <SkeletonPlaceholder.Item
              key={item}
              borderRadius={16}
              padding={16}
              marginBottom={16}
              backgroundColor={isDark ? '#1a1f2e' : '#ffffff'}
            >
              <View style={styles.skeletonCardHeader}>
                <SkeletonPlaceholder.Item
                  width={50}
                  height={50}
                  borderRadius={25}
                />
                <View style={styles.skeletonHeaderText}>
                  <SkeletonPlaceholder.Item
                    width="65%"
                    height={18}
                    marginBottom={8}
                    borderRadius={8}
                  />
                  <SkeletonPlaceholder.Item
                    width="45%"
                    height={14}
                    borderRadius={8}
                  />
                </View>
              </View>
              <View style={styles.skeletonCardBody}>
                <SkeletonPlaceholder.Item
                  width="100%"
                  height={16}
                  marginBottom={8}
                  borderRadius={8}
                />
                <SkeletonPlaceholder.Item
                  width="100%"
                  height={16}
                  marginBottom={8}
                  borderRadius={8}
                />
                <SkeletonPlaceholder.Item
                  width="92%"
                  height={16}
                  marginBottom={8}
                  borderRadius={8}
                />
                <SkeletonPlaceholder.Item
                  width="75%"
                  height={16}
                  borderRadius={8}
                />
              </View>
            </SkeletonPlaceholder.Item>
          ))}
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};
