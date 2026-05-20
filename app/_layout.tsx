import React from 'react';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerScroll}
    >
      <LinearGradient
        colors={colors.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.drawerHeader}
      >
        <MaterialCommunityIcons name="motorbike" size={40} color="#FFF" />
        <Text style={styles.drawerTitle}>MotoShowcase</Text>
        <Text style={styles.drawerSubtitle}>O Mundo das Esportivas</Text>
      </LinearGradient>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="light" />
        <Drawer
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            drawerStyle: {
              backgroundColor: colors.background,
              width: 280,
            },
            drawerActiveTintColor: colors.primary,
            drawerInactiveTintColor: colors.textSecondary,
            drawerActiveBackgroundColor: 'rgba(229,57,53,0.12)',
            drawerLabelStyle: {
              fontSize: 15,
              fontWeight: '600',
            },
            headerStyle: {
              backgroundColor: colors.background,
              ...(Platform.OS === 'ios' ? { shadowColor: 'transparent' } : { elevation: 0 }),
            },
            headerTintColor: colors.textPrimary,
            headerTitleStyle: {
              fontWeight: '700',
              fontSize: 18,
            },
            sceneStyle: {
              backgroundColor: colors.background,
            },
          }}
        >
          <Drawer.Screen
            name="showcase"
            options={{
              title: 'Motos Esportivas',
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="motorbike" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="about"
            options={{
              title: 'Sobre',
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="information-outline" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="contact"
            options={{
              title: 'Contato',
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="phone-outline" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="index"
            options={{ drawerItemStyle: { display: 'none' } }}
          />
          <Drawer.Screen
            name="+not-found"
            options={{ drawerItemStyle: { display: 'none' } }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  drawerScroll: {
    paddingTop: 0,
  },
  drawerHeader: {
    padding: 24,
    paddingTop: 48,
    marginBottom: 8,
  },
  drawerTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 8,
  },
  drawerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    marginTop: 2,
  },
});
