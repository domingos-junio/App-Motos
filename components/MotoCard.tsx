import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, ScrollView, Pressable, Platform, Image, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { WebView } from 'react-native-webview';
import GradientButton from './GradientButton';
import { colors } from '../theme/colors';
import type { Motorcycle } from '../data/motorcycles';

interface Props {
  moto: Motorcycle;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const videoUrlsByMotoId: Record<string, string> = {
  '1': 'https://www.youtube.com/watch?v=eoM76jr81dY',
  '2': 'https://www.youtube.com/watch?v=YWhY2g7sSGs',
  '3': 'https://www.youtube.com/watch?v=Lv8jfnqLNo8',
  '4': 'https://www.youtube.com/watch?v=--5baa8_vOM',
  '5': 'https://www.youtube.com/watch?v=BLo9ewJ63JU',
};

interface SpecItemProps {
  icon: string;
  label: string;
  value: string;
}

function SpecItem({ icon, label, value }: SpecItemProps) {
  return (
    <View style={specStyles.container}>
      <MaterialCommunityIcons
        name={icon as keyof typeof MaterialCommunityIcons.glyphMap}
        size={18}
        color={colors.primary}
      />
      <View style={specStyles.textCol}>
        <Text style={specStyles.label}>{label}</Text>
        <Text style={specStyles.value}>{value}</Text>
      </View>
    </View>
  );
}

const specStyles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, width: '50%' },
  textCol: { marginLeft: 6 },
  label: { color: colors.textMuted, fontSize: 11 },
  value: { color: colors.textSecondary, fontSize: 14, fontWeight: '600' },
});

export default function MotoCard({ moto }: Props) {
  const [detailOpen, setDetailOpen] = useState(false);
  const [showMotoVideo, setShowMotoVideo] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [modalImageLoaded, setModalImageLoaded] = useState(false);
  const [modalImageError, setModalImageError] = useState(false);
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const hasImage = !!(moto?.imageUrl);
  const motoVideoUrl = videoUrlsByMotoId[moto?.id ?? ''] ?? '';
  const hasMotoVideo = motoVideoUrl.length > 0;

  return (
    <>
      <AnimatedPressable
        onPressIn={() => { scale.value = withSpring(0.97); }}
        onPressOut={() => { scale.value = withSpring(1); }}
        style={[animStyle, styles.card]}
        accessibilityRole="button"
        accessibilityLabel={moto?.name ?? 'Moto'}
      >
        {/* Motorcycle image with gradient overlay */}
        <View style={styles.imageContainer}>
          {/* Fallback / loading state */}
          {(!imageLoaded || imageError || !hasImage) && (
            <LinearGradient
              colors={[(moto?.brandColor ?? colors.primary), colors.background] as const}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.imageFallback}
            >
              {!imageError && hasImage ? (
                <ActivityIndicator size="large" color="rgba(255,255,255,0.7)" />
              ) : (
                <MaterialCommunityIcons name="motorbike" size={72} color="rgba(255,255,255,0.7)" />
              )}
            </LinearGradient>
          )}

          {/* Actual image */}
          {hasImage && !imageError && (
            <Image
              source={{ uri: moto.imageUrl }}
              style={styles.motoImage}
              resizeMode="cover"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              accessibilityLabel={`Foto da ${moto?.name ?? 'moto'}`}
            />
          )}

          {/* Gradient overlay for brand label readability */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.6)'] as const}
            style={styles.imageOverlay}
          >
            <Text style={styles.brandLabel}>{moto?.brand ?? ''}</Text>
          </LinearGradient>
        </View>

        {/* Info section */}
        <View style={styles.infoSection}>
          <Text style={styles.name}>{moto?.name ?? ''}</Text>
          <View style={styles.specsGrid}>
            <SpecItem icon="engine-outline" label="Cilindrada" value={moto?.cilindrada ?? ''} />
            <SpecItem icon="flash" label="Potência" value={moto?.potencia ?? ''} />
            <SpecItem icon="speedometer" label="Vel. Máx" value={moto?.velocidadeMax ?? ''} />
            <SpecItem icon="weight" label="Peso" value={moto?.peso ?? ''} />
            <SpecItem icon="chip" label="Tecnologia" value={moto?.tecnologia ?? ''} />
            <SpecItem icon="calendar" label="Ano" value="2024" />
          </View>
          <GradientButton label="Ver Detalhes" onPress={() => setDetailOpen(true)} />
        </View>
      </AnimatedPressable>

      {/* Detail Modal */}
      <Modal
        visible={detailOpen}
        animationType="slide"
        transparent
        onRequestClose={() => {
          setDetailOpen(false);
          setShowMotoVideo(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{moto?.name ?? ''}</Text>
              <Pressable
                onPress={() => {
                  setDetailOpen(false);
                  setShowMotoVideo(false);
                }}
                hitSlop={12}
                accessibilityLabel="Fechar"
              >
                <MaterialCommunityIcons name="close" size={24} color={colors.textPrimary} />
              </Pressable>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Modal image */}
              <View style={styles.modalImageContainer}>
                {(!modalImageLoaded || modalImageError || !hasImage) && (
                  <LinearGradient
                    colors={[(moto?.brandColor ?? colors.primary), colors.surface] as const}
                    style={styles.modalGradient}
                  >
                    {!modalImageError && hasImage ? (
                      <ActivityIndicator size="large" color="rgba(255,255,255,0.6)" />
                    ) : (
                      <MaterialCommunityIcons name="motorbike" size={80} color="rgba(255,255,255,0.6)" />
                    )}
                  </LinearGradient>
                )}
                {hasImage && !modalImageError && (
                  <Image
                    source={{ uri: moto.imageUrl }}
                    style={styles.modalImage}
                    resizeMode="cover"
                    onLoad={() => setModalImageLoaded(true)}
                    onError={() => setModalImageError(true)}
                    accessibilityLabel={`Foto da ${moto?.name ?? 'moto'}`}
                  />
                )}
              </View>
              <Text style={styles.modalDescription}>{moto?.description ?? ''}</Text>
              <View style={styles.videoSection}>
                <Pressable
                  style={[styles.videoButton, !hasMotoVideo && styles.videoButtonDisabled]}
                  onPress={() => hasMotoVideo && setShowMotoVideo((prev) => !prev)}
                  disabled={!hasMotoVideo}
                  accessibilityRole="button"
                  accessibilityLabel={`Video da ${moto?.brand ?? 'moto'}`}
                >
                  <MaterialCommunityIcons
                    name={showMotoVideo ? 'close-circle-outline' : 'play-circle-outline'}
                    size={20}
                    color={colors.textPrimary}
                  />
                  <Text style={styles.videoButtonText}>
                    {showMotoVideo ? 'Fechar video' : 'Review Completo'}
                  </Text>
                </Pressable>
                {!hasMotoVideo && (
                  <Text style={styles.videoHint}>
                    Preencha a URL desta moto em `videoUrlsByMotoId`.
                  </Text>
                )}
                {showMotoVideo && hasMotoVideo && (
                  <View style={styles.videoContainer}>
                    <WebView source={{ uri: motoVideoUrl }} allowsFullscreenVideo />
                  </View>
                )}
              </View>
              <View style={styles.modalSpecs}>
                <SpecItem icon="engine-outline" label="Cilindrada" value={moto?.cilindrada ?? ''} />
                <SpecItem icon="flash" label="Potência" value={moto?.potencia ?? ''} />
                <SpecItem icon="speedometer" label="Vel. Máx" value={moto?.velocidadeMax ?? ''} />
                <SpecItem icon="weight" label="Peso" value={moto?.peso ?? ''} />
                <SpecItem icon="chip" label="Tecnologia" value={moto?.tecnologia ?? ''} />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    marginBottom: 16,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 200,
    position: 'relative',
    backgroundColor: colors.background,
  },
  imageFallback: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  motoImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    justifyContent: 'flex-end',
    paddingBottom: 10,
    paddingHorizontal: 16,
    zIndex: 3,
  },
  brandLabel: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  infoSection: {
    padding: 16,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    flex: 1,
  },
  modalImageContainer: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
    backgroundColor: colors.background,
  },
  modalGradient: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  modalImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    borderRadius: 16,
    zIndex: 2,
  },
  modalDescription: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 16,
  },
  modalSpecs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 32,
  },
  videoSection: {
    marginBottom: 16,
  },
  videoButton: {
    backgroundColor: colors.cardBorderSubtle,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  videoButtonDisabled: {
    opacity: 0.55,
  },
  videoButtonText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  videoHint: {
    color: colors.textMuted,
    fontSize: 12,
    marginBottom: 10,
  },
  videoContainer: {
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
});
