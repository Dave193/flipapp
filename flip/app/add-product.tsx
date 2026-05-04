import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { useProducts, MAX_PRODUCTS } from '@/context/ProductContext';
import { ProductForm } from '@/components/ProductForm';
import { LimitModal } from '@/components/LimitModal';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export default function AddProductScreen() {
  const router = useRouter();
  const { state, dispatch } = useProducts();
  const [modalVisible, setModalVisible] = useState(false);

  const productCount = state.products.length;
  const isLimitReached = productCount >= MAX_PRODUCTS;

  // If user opens form when already at 5, show modal immediately.
  // We can do this in useEffect or just render the modal.
  React.useEffect(() => {
    if (isLimitReached) {
      setModalVisible(true);
    }
  }, [isLimitReached]);

  const handleSubmit = (name: string, price: string, photoUri: string) => {
    if (isLimitReached) {
      setModalVisible(true);
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name,
      price,
      photoUri,
    };

    dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
    router.back();
  };

  const handleModalClose = () => {
    setModalVisible(false);
    if (isLimitReached) {
      router.back();
    }
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ThemedText type="title" style={styles.title}>
            Add New Product
          </ThemedText>
          <ProductForm onSubmit={handleSubmit} disabled={isLimitReached} />
        </ScrollView>
      </KeyboardAvoidingView>
      <LimitModal visible={modalVisible} onClose={handleModalClose} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 40,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
});
