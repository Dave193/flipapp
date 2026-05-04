import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

export const SplashScreen: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/flip-logo.svg')} style={styles.logo} />
      <Text style={styles.title}>Welcome{'\n'}To{'\n'}Flip.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
  },
});
