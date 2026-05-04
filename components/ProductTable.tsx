import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

export type Product = {
  id: string;
  name: string;
  price: string;
  photoUri: string;
};

interface ProductTableProps {
  products: Product[];
}

export const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  return (
    <View style={styles.table}>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>#</Text>
        <Text style={styles.headerCell}>Photo</Text>
        <Text style={styles.headerCell}>Name</Text>
        <Text style={styles.headerCell}>Price</Text>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={[styles.row, index % 2 === 0 && styles.altRow]}>
            <Text style={styles.cell}>{index + 1}</Text>
            <Image source={{ uri: item.photoUri }} style={styles.thumbnail} />
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    marginVertical: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 12,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  altRow: {
    backgroundColor: '#fafafa',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginHorizontal: 8,
  },
});
