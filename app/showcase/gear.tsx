import React from 'react';
import { ScrollView, StyleSheet, Alert, Platform } from 'react-native';
import SectionHeader from '../../components/SectionHeader';
import ReusableCard from '../../components/ReusableCard';
import { accessories, maintenanceTips } from '../../data/accessories';
import { colors } from '../../theme/colors';

function showSnackbar() {
  if (Platform.OS === 'web') {
    window?.alert?.('Em breve — fique ligado!');
  } else {
    Alert.alert('Em breve', 'Funcionalidade em breve — fique ligado!');
  }
}

export default function GearTab() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <SectionHeader icon="shield-check" title="Acessórios Essenciais" />
      {(accessories ?? []).map((item) => (
        <ReusableCard
          key={item?.id}
          icon={item?.icon}
          iconColor={item?.accentColor}
          title={item?.title ?? ''}
          description={item?.description ?? ''}
          ctaLabel={item?.ctaLabel ?? 'Ver Mais'}
          onCtaPress={showSnackbar}
        />
      ))}

      <SectionHeader icon="wrench" title="Dicas de Manutenção" />
      {(maintenanceTips ?? []).map((item) => (
        <ReusableCard
          key={item?.id}
          icon={item?.icon}
          title={item?.title ?? ''}
          description={item?.description ?? ''}
          ctaLabel={item?.ctaLabel ?? 'Saiba Mais'}
          onCtaPress={showSnackbar}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
});
