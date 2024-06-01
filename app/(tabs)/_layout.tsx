import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import HomeIcon from '@/components/navigation/Home';
import DonationBoxIcon from '@/components/navigation/DonationBox';
import DashboardIcon from '@/components/navigation/Dashboard';

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
              width={32}
              height={32}
              strokeWidth={8}
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
              width={32}
              height={32}
              strokeWidth={8}
              stroke={focused ? Colors[colorScheme ?? 'light'].tint : color}
              fill={focused ? Colors[colorScheme ?? 'light'].tint : color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
