import React from 'react';
import { StyleSheet, Text, View, Pressable, StyleProp, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import GradientButton from './GradientButton';
import { colors } from '../theme/colors';

interface Props {
  icon?: string;
  iconColor?: string;
  title: string;
  description: string;
  ctaLabel: string;
  onCtaPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function ReusableCard({
  icon,
  iconColor = colors.primary,
  title,
  description,
  ctaLabel,
  onCtaPress,
  style,
}: Props) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPressIn={() => { scale.value = withSpring(0.97); }}
      onPressOut={() => { scale.value = withSpring(1); }}
      style={[animStyle, styles.container, style]}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <View style={styles.content}>
        {icon ? (
          <View style={[styles.iconWrap, { backgroundColor: `${iconColor}15` }]}>
            <MaterialCommunityIcons
              name={icon as keyof typeof MaterialCommunityIcons.glyphMap}
              size={28}
              color={iconColor}
            />
          </View>
        ) : null}
        <View style={styles.textWrap}>
          <Text style={styles.title} numberOfLines={1}>{title ?? ''}</Text>
          <Text style={styles.description} numberOfLines={3}>{description ?? ''}</Text>
        </View>
      </View>
      <View style={styles.ctaRow}>
        <GradientButton label={ctaLabel} onPress={onCtaPress} small />
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    padding: 16,
    marginBottom: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  ctaRow: {
    alignItems: 'flex-end',
    marginTop: 12,
  },
});
