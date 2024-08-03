import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LayoutContainer from '@/components/container/LayoutContainer'
import { useLogoutMutation } from '@/store/services/authApi'
import Label from '@/components/ui/Label'
import { AntDesign } from '@expo/vector-icons'
import { getData, removeData } from '@/utils/utils'
import { useNavigation, useRouter } from 'expo-router'

type Props = {}

const Setting = (props: Props) => {
  const [logout, { isSuccess, isLoading }] = useLogoutMutation({})
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