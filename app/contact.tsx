import React from 'react';
import { ScrollView, StyleSheet, View, Text, Pressable, Linking, Alert, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GradientButton from '../components/GradientButton';
import { colors } from '../theme/colors';

function openUrl(url: string) {
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        if (Platform.OS === 'web') {
          window?.open?.(url, '_blank');
        } else {
          Alert.alert('Erro', 'Não foi possível abrir o link.');
        }
      }
    })
    .catch(() => {
      if (Platform.OS === 'web') {
        window?.open?.(url, '_blank');
      }
    });
}

interface ContactCardProps {
  icon: string;
  title: string;
  detail: string;
  ctaLabel: string;
  onPress: () => void;
}

function ContactCard({ icon, title, detail, ctaLabel, onPress }: ContactCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <View style={styles.iconWrap}>
          <MaterialCommunityIcons
            name={icon as keyof typeof MaterialCommunityIcons.glyphMap}
            size={28}
            color={colors.primary}
          />
        </View>
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDetail}>{detail}</Text>
        </View>
      </View>
      <GradientButton label={ctaLabel} onPress={onPress} small style={styles.cardCta} />
    </View>
  );
}

export default function ContactScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Text style={styles.headerTitle}>Entre em Contato</Text>
      <Text style={styles.headerSub}>Adoraríamos ouvir você</Text>

      {/* Contact Cards */}
      <ContactCard
        icon="email"
        title="Email"
        detail="contato@motoshowcase.app"
        ctaLabel="Enviar Email"
        onPress={() => openUrl('mailto:contato@motoshowcase.app')}
      />
      <ContactCard
        icon="phone"
        title="Telefone"
        detail="+55 (11) 99999-MOTO"
        ctaLabel="Ligar Agora"
        onPress={() => openUrl('tel:+5511999990000')}
      />
      <ContactCard
        icon="map-marker"
        title="Endereço"
        detail="Av. Paulista, 1000 - São Paulo, SP"
        ctaLabel="Ver no Mapa"
        onPress={() => openUrl('https://maps.google.com/?q=Av.+Paulista,+1000,+São+Paulo')}
      />

      {/* Social */}
      <Text style={styles.socialTitle}>Redes Sociais</Text>
      <View style={styles.socialRow}>
        {[
          { icon: 'instagram', url: 'https://instagram.com' },
          { icon: 'youtube', url: 'https://youtube.com' },
          { icon: 'twitter', url: 'https://twitter.com' },
          { icon: 'facebook', url: 'https://facebook.com' },
        ].map((s) => (
          <Pressable
            key={s.icon}
            onPress={() => openUrl(s.url)}
            style={styles.socialBtn}
            accessibilityRole="button"
            accessibilityLabel={s.icon}
          >
            <MaterialCommunityIcons
              name={s.icon as keyof typeof MaterialCommunityIcons.glyphMap}
              size={26}
              color={colors.textPrimary}
            />
          </Pressable>
        ))}
      </View>

      {/* Hours */}
      <View style={styles.hoursCard}>
        <View style={styles.hoursHeader}>
          <MaterialCommunityIcons name="clock-outline" size={20} color={colors.accent} />
          <Text style={styles.hoursTitle}>Horário de Funcionamento</Text>
        </View>
        <Text style={styles.hoursText}>Seg–Sex: 9h – 18h</Text>
        <Text style={styles.hoursText}>Sáb: 10h – 16h</Text>
        <Text style={styles.hoursText}>Dom: Fechado</Text>
      </View>
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
    paddingBottom: 40,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
  },
  headerSub: {
    color: colors.textSecondary,
    fontSize: 15,
    marginBottom: 24,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(229,57,53,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  cardDetail: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 2,
  },
  cardCta: {
    alignSelf: 'flex-end',
    marginTop: 12,
  },
  socialTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 12,
  },
  socialRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  socialBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
  },
  hoursCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
  },
  hoursHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  hoursTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  hoursText: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 24,
  },
});
