import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { colors } from '../theme/colors';

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página não encontrada</Text>
      <Link href="/" style={styles.link}>Voltar ao início</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { color: colors.textPrimary, fontSize: 20, fontWeight: '700', marginBottom: 16 },
  link: { color: colors.primary, fontSize: 16 },
});
