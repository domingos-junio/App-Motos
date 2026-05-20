import React from 'react';
import { StyleSheet, Text, Pressable, StyleProp, ViewStyle, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { colors } from '../theme/colors';

interface Props {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  small?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function GradientButton({ label, onPress, disabled, loading, style, small }: Props) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPressIn={() => { scale.value = withSpring(0.96); }}
      onPressOut={() => { scale.value = withSpring(1); }}
      onPress={disabled || loading ? undefined : onPress}
      style={[animStyle, style]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <LinearGradient
        colors={colors.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          small ? styles.smallGradient : styles.gradient,
          disabled && styles.disabled,
        ]}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" size="small" />
        ) : (
          <Text style={small ? styles.smallLabel : styles.label}>{label}</Text>
        )}
      </LinearGradient>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  gradient: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallGradient: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  smallLabel: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});
