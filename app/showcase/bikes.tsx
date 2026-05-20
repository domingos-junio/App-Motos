import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import MotoCard from '../../components/MotoCard';
import { motorcycles } from '../../data/motorcycles';
import { colors } from '../../theme/colors';

export default function BikesTab() {
  return (
    <FlatList
      data={motorcycles ?? []}
      keyExtractor={(item) => item?.id ?? ''}
      renderItem={({ item }) => <MotoCard moto={item} />}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: 16,
    paddingBottom: 32,
  },
});
