import React from 'react';
import { Modal, View, Text, StyleSheet, Button } from 'react-native';

interface LimitModalProps {
  visible: boolean;
  onClose: () => void;
}

export const LimitModal: React.FC<LimitModalProps> = ({ visible, onClose }) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onClose}
  >
    <View style={styles.overlay}>
      <View style={styles.modalContent}>
        <Text style={styles.icon}>⚠️</Text>
        <Text style={styles.title}>Product Limit Reached</Text>
        <Text style={styles.message}>You can only upload up to 5 products.</Text>
        <Button title="OK" onPress={onClose} />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    width: 280,
    elevation: 4,
  },
  icon: {
    fontSize: 36,
    marginBottom: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  message: {
    fontSize: 15,
    marginBottom: 16,
    textAlign: 'center',
  },
});
