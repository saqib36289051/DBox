import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import HomeIcon from '@/components/navigation/Home';
import DonationBoxIcon from '@/components/navigation/DonationBox';
import DashboardIcon from '@/components/navigation/Dashboard';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import ScanIcon from '@/components/navigation/ScanIcon';
import Setting from '@/components/navigation/Setting';
import TransactionHistory from '@/components/navigation/TransactionHistory';
import Map from '@/components/navigation/Map';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle: {
          height: 56,
          paddingVertical: 4,
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, focused }) => (
            <DashboardIcon
              width={36}
              height={36}
              strokeWidth={3}
              stroke={focused ? Colors[colorScheme ?? 'light'].tint : color}
              fill={focused ? Colors[colorScheme ?? 'light'].tint : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="transaction"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ color, focused }) => (
            <TransactionHistory
              width={32}
              height={32}
              strokeWidth={3}
              stroke={focused ? Colors[colorScheme ?? 'light'].tint : color}
              fill={focused ? Colors[colorScheme ?? 'light'].tint : color}
            />
          ),
        }}
      />


      <Tabs.Screen
        name="donationBox"
        options={{
          title: 'Donation Box',
          tabBarIcon: ({ color, focused }) => (
            <DonationBoxIcon
              width={42}
              height={42}
              strokeWidth={1}
              stroke={focused ? Colors[colorScheme ?? 'light'].tint : color}
              fill={focused ? Colors[colorScheme ?? 'light'].tint : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          href: null,
          title: 'Scan',
          tabBarIcon: ({ color, focused }) => (

            <ScanIcon
              width={42}
              height={42}
              strokeWidth={1.2}
              stroke={focused ? Colors[colorScheme ?? 'light'].tint : color}
            />

          ),
        }}
      />

      <Tabs.Screen
        name="boxMap"
        options={{
          title: 'Box Map',
          tabBarIcon: ({ color, focused }) => (
            <Map
              width={42}
              height={42}
              strokeWidth={1.5}
              stroke={focused ? Colors[colorScheme ?? 'light'].tint : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Setting
              width={42}
              height={42}
              strokeWidth={1}
              stroke={focused ? Colors[colorScheme ?? 'light'].tint : color}
              fill={focused ? Colors[colorScheme ?? 'light'].tint : color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
