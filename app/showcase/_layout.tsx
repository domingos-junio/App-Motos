import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import BikesTab from './bikes';
import GearTab from './gear';
import RegisterTab from './register';

const Tab = createMaterialTopTabNavigator();

export default function ShowcaseLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.surface,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: colors.textPrimary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarIndicatorStyle: {
          backgroundColor: colors.primary,
          height: 3,
          borderRadius: 2,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
          textTransform: 'none',
        },
        tabBarShowIcon: true,
      }}
    >
      <Tab.Screen
        name="bikes"
        component={BikesTab}
        options={{
          title: 'Galeria',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="image-multiple" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="gear"
        component={GearTab}
        options={{
          title: 'Acessórios',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="shield-half-full" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="register"
        component={RegisterTab}
        options={{
          title: 'Formulário',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-plus-outline" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
