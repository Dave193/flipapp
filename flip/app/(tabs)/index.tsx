import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

import { useProducts, MAX_PRODUCTS } from '@/context/ProductContext';
import { ProductTable } from '@/components/ProductTable';
import { LimitModal } from '@/components/LimitModal';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function HomeScreen() {
  const router = useRouter();
  const { state } = useProducts();
  const [modalVisible, setModalVisible] = useState(false);

  const productCount = state.products.length;
  const isLimitReached = productCount >= MAX_PRODUCTS;

  useEffect(() => {
    if (isLimitReached) {
      setModalVisible(true);
    }
  }, [isLimitReached]);

  const handleAddPress = () => {
    if (isLimitReached) {
      setModalVisible(true);
    } else {
      router.push('/add-product');
    }
  };

  const animatedFabStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(1) }],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Products</ThemedText>
        <ThemedText style={styles.counterBadge}>
          {productCount}/{MAX_PRODUCTS} products added
        </ThemedText>
      </View>

      {productCount === 0 ? (
        <View style={styles.emptyState}>
          <ThemedText style={styles.emptyText}>No products added yet.</ThemedText>
          <TouchableOpacity onPress={handleAddPress} style={styles.largeAddButton}>
            <IconSymbol name="plus" size={48} color="#fff" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.content}>
          <ProductTable products={state.products} />
          
          {!isLimitReached && (
            <Animated.View style={[styles.fabContainer, animatedFabStyle]}>
              <TouchableOpacity onPress={handleAddPress} style={styles.fab}>
                <IconSymbol name="plus" size={32} color="#fff" />
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
      )}

      <LimitModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  counterBadge: {
    backgroundColor: '#0a7ea4',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    overflow: 'hidden',
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginBottom: 24,
    fontSize: 16,
    color: '#888',
  },
  largeAddButton: {
    backgroundColor: '#0a7ea4',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  content: {
    flex: 1,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  fab: {
    backgroundColor: '#0a7ea4',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
});
