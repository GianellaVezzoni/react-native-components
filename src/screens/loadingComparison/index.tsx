import React, { useState } from 'react';
import {
  StatusBar,
  ScrollView,
  useColorScheme,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useStyles } from './styles';
import { MockDataItem, MOCK_DATA } from './data';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SkeletonLoader } from '../../components/skeletonLoader';
import { SimpleLoader } from '../../components/simpleLoader';

enum LoaderType {
  SIMPLE = 'simple',
  SKELETON = 'skeleton',
}

export const LoadingComparisonScreen = () => {
  const systemTheme = useColorScheme();
  const styles = useStyles();
  const [loaderType, setLoaderType] = useState<LoaderType>(LoaderType.SIMPLE);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<MockDataItem[] | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  const isDark = systemTheme === 'dark';

  const handleLoadData = () => {
    setIsLoading(true);
    setData(null);
    fadeAnim.setValue(0);

    const loadingTime = 2000 + Math.random() * 1000;

    setTimeout(() => {
      setIsLoading(false);
      setData(MOCK_DATA);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, loadingTime);
  };

  const renderDataList = () => {
    if (!data || isLoading) return null;

    return (
      <Animated.View style={[styles.dataContainer, { opacity: fadeAnim }]}>
        {data.map(item => (
          <View
            key={item.id}
            style={[styles.dataCard, isDark && styles.dataCardDark]}
          >
            <View style={styles.dataCardHeader}>
              <View
                style={[styles.dataAvatar, isDark && styles.dataAvatarDark]}
              >
                <Text style={styles.dataAvatarText}>
                  {item.author.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.dataHeaderText}>
                <Text
                  style={[styles.dataAuthor, isDark && styles.dataAuthorDark]}
                >
                  {item.author}
                </Text>
                <Text
                  style={[styles.dataTitle, isDark && styles.dataTitleDark]}
                >
                  {item.title}
                </Text>
              </View>
            </View>
            <Text
              style={[
                styles.dataDescription,
                isDark && styles.dataDescriptionDark,
              ]}
            >
              {item.description}
            </Text>
          </View>
        ))}
      </Animated.View>
    );
  };

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={[styles.container, isDark && styles.containerDark]}
    >
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.controlsContainer}>
          <View
            style={[
              styles.segmentedControl,
              isDark && styles.segmentedControlDark,
            ]}
          >
            <TouchableOpacity
              style={[
                styles.segment,
                loaderType === LoaderType.SIMPLE && styles.segmentActive,
                loaderType === LoaderType.SIMPLE &&
                  isDark &&
                  styles.segmentActiveDark,
              ]}
              onPress={() => {
                setLoaderType(LoaderType.SIMPLE);
                setData(null);
                setIsLoading(false);
              }}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.segmentText,
                  loaderType === LoaderType.SIMPLE && styles.segmentTextActive,
                  loaderType === LoaderType.SIMPLE &&
                    isDark &&
                    styles.segmentTextActiveDark,
                ]}
              >
                Simple Loader
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.segment,
                loaderType === LoaderType.SKELETON && styles.segmentActive,
                loaderType === LoaderType.SKELETON &&
                  isDark &&
                  styles.segmentActiveDark,
              ]}
              onPress={() => {
                setLoaderType(LoaderType.SKELETON);
                setData(null);
                setIsLoading(false);
              }}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.segmentText,
                  loaderType === LoaderType.SKELETON &&
                    styles.segmentTextActive,
                  loaderType === LoaderType.SKELETON &&
                    isDark &&
                    styles.segmentTextActiveDark,
                ]}
              >
                Skeleton Loader
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.loadButton, isDark && styles.loadButtonDark]}
            onPress={handleLoadData}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <Text style={styles.loadButtonText}>
              {isLoading ? 'Loading...' : 'Load Data'}
            </Text>
          </TouchableOpacity>
        </View>

        {loaderType === LoaderType.SIMPLE && (
          <SimpleLoader isLoading={isLoading} isDark={isDark} />
        )}
        {loaderType === LoaderType.SKELETON && (
          <SkeletonLoader isLoading={isLoading} isDark={isDark} />
        )}
        {renderDataList()}
      </ScrollView>
    </SafeAreaView>
  );
};
