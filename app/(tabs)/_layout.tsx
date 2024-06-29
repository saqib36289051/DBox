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
          tabBarLabelStyle: {
            display: 'none'
          },
          tabBarIcon: ({ color, focused }) => (
            <View className="w-[75] h-[75] bg-white flex items-center justify-center rounded-full -mt-7">
              <View className="w-[60] h-[60] bg-cyan-700 flex items-center justify-center rounded-full">
                <ScanIcon
                  width={48}
                  height={48}
                  fill={"#fff"}
                />
              </View>
            </View>
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
