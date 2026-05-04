import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface ProductFormProps {
  onSubmit: (name: string, price: string, photoUri: string) => void;
  disabled?: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, disabled }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [error, setError] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!name || !price || !photoUri) {
      setError('All fields are required.');
      return;
    }
    setError('');
    onSubmit(name, price, photoUri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Product Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter product name"
      />
      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Enter price"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Photo</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.imagePreview} />
        ) : (
          <Text>Select Image</Text>
        )}
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Add Product" onPress={handleSubmit} disabled={disabled} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },
  imagePicker: {
    height: 80,
    width: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    backgroundColor: '#fafafa',
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});
