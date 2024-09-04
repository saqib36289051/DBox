import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LayoutContainer from '@/components/container/LayoutContainer'
import { useLogoutMutation } from '@/store/services/authApi'
import Label from '@/components/ui/Label'
import { AntDesign, Entypo, FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import { getData, removeData } from '@/utils/utils'
import { useNavigation, useRouter } from 'expo-router'
import { useAppSelector } from '@/hooks/useReduxHook'
import Seprator from '@/components/ui/Seprator'

type Props = {}

const Setting = (props: Props) => {
  const [logout, { isSuccess, isLoading }] = useLogoutMutation({})
  const { user } = useAppSelector(state => state.user)
  const router = useRouter()

  async function onLogout() {
    const result = await getData("userInfo")
    if (result) {
      const res = await logout(result?.refresh)
      await removeData("userInfo").finally(() => router.replace("/"))
    }
  }

  return (
    <LayoutContainer>
      <View className='mt-10 bg-white shadow-sm rounded-lg p-4'>
        <Label type='h6' weight='bold' className='text-center'>User Info</Label>
        <Seprator />
        <View className='flex-row space-x-2 mt-2 items-center'>
          <AntDesign name="user" size={18} color="darkgray" />
          <Label type='sm' weight='bold' className='text-gray-500'>Name:</Label>
          <Label type='sm' className='text-center text-gray-500'>{user?.user_info?.first_name} {user?.user_info?.last_name}</Label>
        </View>
        <Seprator />
        <View className='flex-row space-x-2 mt-2'>
          <MaterialIcons name="alternate-email" size={18} color="darkgray" />
          <Label type='sm' weight='bold' className='text-gray-500'>Email:</Label>
          <Label type='sm' weight='regular' className='text-gray-500'>{user?.user_info?.email}</Label>
        </View>
        <Seprator />
        <View className='flex-row space-x-2 mt-2'>
          <Entypo name="mobile" size={18} color="darkgray" />
          <Label type='sm' weight='bold' className='text-gray-500'>Mobile:</Label>
          <Label type='sm' weight='regular' className='text-gray-500'>{user?.user_info?.phone_number}</Label>
        </View>
        <Seprator />
        <View className='flex-row space-x-2 mt-2'>
          <FontAwesome6 name="user-gear" size={18} color="darkgray" />
          <Label type='sm' weight='bold' className='text-gray-500'>User Type:</Label>
          <Label type='sm' weight='regular' className='text-gray-500'>{user?.user_info?.user_type}</Label>
        </View>

      </View>
      <Pressable
        onPress={() => onLogout()}
        className="w-full p-2 bg-green-200 rounded flex-row justify-between px-3 mt-2">
        <Label type='p' weight='medium'>Logout</Label>
        <AntDesign name="logout" size={24} color="green" />
      </Pressable>
    </LayoutContainer>
  )
}

export default Setting

const styles = StyleSheet.create({})