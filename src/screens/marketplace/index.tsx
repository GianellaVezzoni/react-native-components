import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyles } from './styles';
import { CATEGORIES, PRODUCTS } from './data';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PRODUCT_CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;
    

export const MarketplaceScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = useStyles(isDark);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  const renderProduct = ({ item }: { item: typeof PRODUCTS[0] }) => (
    <TouchableOpacity 
      style={[styles.productCard, { width: PRODUCT_CARD_WIDTH }]}
      activeOpacity={0.8}
    >
      <View style={styles.productImageContainer}>
        <Text style={styles.productImage}>{item.image}</Text>
        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountBadgeText}>-{item.discount}%</Text>
          </View>
        )}
        {item.isNew && !item.discount && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NUEVO</Text>
          </View>
        )}
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>⭐ {item.rating}</Text>
        </View>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>{item.price}</Text>
          <Text style={styles.originalPrice}>{item.originalPrice}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>{getGreeting()}! 👋</Text>
            <Text style={styles.headerTitle}>¿Qué buscas hoy?</Text>
          </View>
          <TouchableOpacity style={styles.cartButton} activeOpacity={0.7}>
            <Text style={styles.cartIcon}>🛒</Text>
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.promoBanner}>
          <View style={styles.promoContent}>
            <View style={styles.promoLeft}>
              <Text style={styles.promoTitle}>Flash Sale</Text>
              <Text style={styles.promoSubtitle}>Hasta 50% OFF</Text>
            </View>
            <View style={styles.promoRight}>
              <Text style={styles.promoEmoji}>⚡</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categorías</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todas</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  { 
                    backgroundColor: category.color,
                    transform: [{ scale: selectedCategory === category.id ? 1.05 : 1 }],
                  },
                ]}
                onPress={() => setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )}
                activeOpacity={0.8}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Productos destacados</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todo →</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={PRODUCTS}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.productsRow}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.offerBanner}>
            <View style={styles.offerContent}>
              <Text style={styles.offerEmoji}>🎁</Text>
              <Text style={styles.offerTitle}>Oferta Especial</Text>
              <Text style={styles.offerSubtitle}>
                Hasta 50% OFF en productos seleccionados
              </Text>
              <TouchableOpacity style={styles.offerButton} activeOpacity={0.8}>
                <Text style={styles.offerButtonText}>Explorar ofertas</Text>
                <Text style={styles.offerButtonArrow}>→</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

