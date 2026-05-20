import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

function StatCard({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <View style={styles.statCard}>
      <MaterialCommunityIcons
        name={icon as keyof typeof MaterialCommunityIcons.glyphMap}
        size={28}
        color={colors.primary}
      />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <LinearGradient
        colors={['rgba(229,57,53,0.35)', colors.background] as const}
        style={styles.hero}
      >
        <MaterialCommunityIcons name="motorbike" size={56} color={colors.primary} />
        <Text style={styles.heroTitle}>MotoShowcase</Text>
        <Text style={styles.heroSubtitle}>A Experiência Definitiva em Motos Esportivas</Text>
      </LinearGradient>

      {/* About Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="information" size={22} color={colors.primary} />
          <Text style={styles.cardTitle}>Sobre o App</Text>
        </View>
        <Text style={styles.cardBody}>
          MotoShowcase é o seu portal para o mundo das motocicletas esportivas de alta performance. Explore as superbikes mais icônicas do mundo, descubra equipamentos essenciais para pilotagem e conecte-se com a comunidade de velocidade. Construído com paixão por velocidade e engenharia de precisão.
        </Text>
      </View>

      {/* Mission Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="target" size={22} color={colors.accent} />
          <Text style={styles.cardTitle}>Nossa Missão</Text>
        </View>
        <Text style={styles.cardBody}>
          Inspirar e informar entusiastas de motocicletas, apresentando as melhores máquinas do mundo, fornecendo orientação especializada em manutenção e construindo uma comunidade de pilotos que compartilham a emoção da velocidade e da estrada aberta.
        </Text>
      </View>

      {/* History */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="history" size={22} color={colors.primary} />
          <Text style={styles.cardTitle}>Velocidade & Competição</Text>
        </View>
        <Text style={styles.cardBody}>
          Das primeiras corridas em circuitos europeus no início do século XX até os modernos campeonatos de MotoGP e WorldSBK, as motocicletas esportivas sempre representaram o ápice da engenharia automotiva. Marcas como Ducati, Yamaha, Honda, Kawasaki e Suzuki investem milhões em tecnologia de ponta que eventualmente chega às motos de rua — sistemas de controle de tração, eletrônica avançada, aerodinâmica ativa e materiais leves como fibra de carbono e titânio.
        </Text>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <StatCard icon="motorbike" value="5+" label="Superbikes" />
        <StatCard icon="shield" value="10+" label="Itens de Equip." />
        <StatCard icon="heart" value="24/7" label="Paixão" />
      </View>

      {/* Version */}
      <Text style={styles.version}>Versão 1.0.0 • Feito com ❤️ para pilotos</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 40,
  },
  hero: {
    padding: 32,
    alignItems: 'center',
  },
  heroTitle: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: '800',
    marginTop: 12,
  },
  heroSubtitle: {
    color: colors.textSecondary,
    fontSize: 15,
    marginTop: 6,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },
  cardBody: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    marginTop: 8,
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  version: {
    color: colors.textMuted,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 16,
  },
});
