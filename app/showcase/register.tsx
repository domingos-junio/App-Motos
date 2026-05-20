import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  Platform,
  KeyboardAvoidingView,
  Pressable,
  Modal,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GradientButton from '../../components/GradientButton';
import { colors } from '../../theme/colors';

const interestOptions = [
  'Consultar moto',
  'Manifestar interesse de compra',
  'Agendar test ride',
];

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  interesse: string;
  mensagem: string;
}

interface FormErrors {
  nome?: string;
  email?: string;
  telefone?: string;
  cidade?: string;
  interesse?: string;
}

const initialForm: FormData = {
  nome: '',
  email: '',
  telefone: '',
  cidade: '',
  interesse: '',
  mensagem: '',
};

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email ?? '');
}

export default function RegisterTab() {
  const [form, setForm] = useState<FormData>({ ...initialForm });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPicker, setShowPicker] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const updateField = useCallback((field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const validate = useCallback((): boolean => {
    const errs: FormErrors = {};
    if ((form?.nome?.length ?? 0) < 2) errs.nome = 'Nome é obrigatório (mín. 2 caracteres)';
    if (!validateEmail(form?.email ?? '')) errs.email = 'Email inválido';
    if ((form?.telefone?.replace?.(/\D/g, '')?.length ?? 0) < 10) errs.telefone = 'Telefone inválido (mín. 10 dígitos)';
    if ((form?.cidade?.length ?? 0) < 2) errs.cidade = 'Cidade/Estado é obrigatório';
    if (!form?.interesse) errs.interesse = 'Selecione um interesse';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [form]);

  const handleSubmit = useCallback(() => {
    if (!validate()) return;
    setShowSuccess(true);
  }, [validate]);

  const handleSuccessDismiss = useCallback(() => {
    setShowSuccess(false);
    setForm({ ...initialForm });
    setErrors({});
  }, []);

  const isFormValid =
    (form?.nome?.length ?? 0) >= 2 &&
    validateEmail(form?.email ?? '') &&
    (form?.telefone?.replace?.(/\D/g, '')?.length ?? 0) >= 10 &&
    (form?.cidade?.length ?? 0) >= 2 &&
    !!form?.interesse;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formCard}>
          {/* Header */}
          <View style={styles.headerRow}>
            <MaterialCommunityIcons name="account-plus" size={28} color={colors.primary} />
            <Text style={styles.headerTitle}>Registre Seu Interesse</Text>
          </View>

          {/* Nome */}
          <FormField
            icon="account-outline"
            label="Nome Completo"
            value={form?.nome ?? ''}
            onChangeText={(v) => updateField('nome', v)}
            error={errors?.nome}
          />

          {/* Email */}
          <FormField
            icon="email-outline"
            label="Email"
            value={form?.email ?? ''}
            onChangeText={(v) => updateField('email', v)}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors?.email}
          />

          {/* Telefone */}
          <FormField
            icon="phone-outline"
            label="Telefone"
            value={form?.telefone ?? ''}
            onChangeText={(v) => updateField('telefone', v)}
            keyboardType="phone-pad"
            error={errors?.telefone}
          />

          {/* Cidade */}
          <FormField
            icon="map-marker-outline"
            label="Cidade / Estado"
            value={form?.cidade ?? ''}
            onChangeText={(v) => updateField('cidade', v)}
            error={errors?.cidade}
          />

          {/* Interesse Picker */}
          <View style={styles.fieldContainer}>
            <View style={styles.labelRow}>
              <MaterialCommunityIcons name="star-outline" size={18} color={colors.primary} />
              <Text style={styles.fieldLabel}>Interesse</Text>
            </View>
            <Pressable
              onPress={() => setShowPicker(true)}
              style={[
                styles.pickerButton,
                errors?.interesse ? styles.inputError : null,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Selecionar interesse"
            >
              <Text style={form?.interesse ? styles.pickerText : styles.pickerPlaceholder}>
                {form?.interesse || 'Selecione uma opção'}
              </Text>
              <MaterialCommunityIcons name="chevron-down" size={20} color={colors.textMuted} />
            </Pressable>
            {errors?.interesse ? <Text style={styles.errorText}>{errors.interesse}</Text> : null}
          </View>

          {/* Mensagem */}
          <View style={styles.fieldContainer}>
            <View style={styles.labelRow}>
              <MaterialCommunityIcons name="message-text-outline" size={18} color={colors.primary} />
              <Text style={styles.fieldLabel}>Mensagem / Observações</Text>
            </View>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={form?.mensagem ?? ''}
              onChangeText={(v) => updateField('mensagem', v)}
              placeholder="Conte-nos mais sobre o que você procura..."
              placeholderTextColor={colors.textMuted}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Submit */}
          <GradientButton
            label="Enviar Registro"
            onPress={handleSubmit}
            disabled={!isFormValid}
            style={styles.submitBtn}
          />
        </View>
      </ScrollView>

      {/* Picker Modal */}
      <Modal visible={showPicker} transparent animationType="fade" onRequestClose={() => setShowPicker(false)}>
        <Pressable style={styles.pickerOverlay} onPress={() => setShowPicker(false)}>
          <View style={styles.pickerModal}>
            <Text style={styles.pickerTitle}>Selecione seu interesse</Text>
            {interestOptions.map((opt) => (
              <Pressable
                key={opt}
                style={[
                  styles.pickerOption,
                  form?.interesse === opt && styles.pickerOptionActive,
                ]}
                onPress={() => {
                  updateField('interesse', opt);
                  setShowPicker(false);
                }}
                accessibilityRole="button"
                accessibilityLabel={opt}
              >
                <Text
                  style={[
                    styles.pickerOptionText,
                    form?.interesse === opt && styles.pickerOptionTextActive,
                  ]}
                >
                  {opt}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* Success Modal */}
      <Modal visible={showSuccess} transparent animationType="fade" onRequestClose={handleSuccessDismiss}>
        <View style={styles.successOverlay}>
          <View style={styles.successModal}>
            <MaterialCommunityIcons name="check-circle" size={64} color={colors.success} />
            <Text style={styles.successTitle}>Registro Enviado!</Text>
            <Text style={styles.successSub}>Entraremos em contato em breve.</Text>
            <GradientButton label="Concluído" onPress={handleSuccessDismiss} style={{ marginTop: 24 }} />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

/* ------------- Reusable form field ------------- */
interface FormFieldProps {
  icon: string;
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  error?: string;
  keyboardType?: TextInput['props']['keyboardType'];
  autoCapitalize?: TextInput['props']['autoCapitalize'];
}

function FormField({ icon, label, value, onChangeText, error, keyboardType, autoCapitalize }: FormFieldProps) {
  return (
    <View style={styles.fieldContainer}>
      <View style={styles.labelRow}>
        <MaterialCommunityIcons
          name={icon as keyof typeof MaterialCommunityIcons.glyphMap}
          size={18}
          color={colors.primary}
        />
        <Text style={styles.fieldLabel}>{label}</Text>
      </View>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        value={value}
        onChangeText={onChangeText}
        placeholder={label}
        placeholderTextColor={colors.textMuted}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        selectionColor={colors.primary}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 10,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  fieldLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  input: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.textPrimary,
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  inputError: {
    borderColor: colors.error,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  pickerButton: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  pickerText: {
    color: colors.textPrimary,
    fontSize: 15,
  },
  pickerPlaceholder: {
    color: colors.textMuted,
    fontSize: 15,
  },
  submitBtn: {
    marginTop: 8,
  },
  // Picker modal
  pickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  pickerModal: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  pickerTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  pickerOption: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 6,
  },
  pickerOptionActive: {
    backgroundColor: 'rgba(229,57,53,0.15)',
  },
  pickerOptionText: {
    color: colors.textSecondary,
    fontSize: 15,
  },
  pickerOptionTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  // Success modal
  successOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  successModal: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 360,
  },
  successTitle: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '700',
    marginTop: 16,
  },
  successSub: {
    color: colors.textSecondary,
    fontSize: 15,
    marginTop: 8,
    textAlign: 'center',
  },
});
