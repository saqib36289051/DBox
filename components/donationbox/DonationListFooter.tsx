import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Label from '../ui/Label'
import { Ionicons } from '@expo/vector-icons'

type Props = {
  reload?: () => void,
  isShowReloadBtn?: boolean,
  bottomLoader?: boolean
}

const DonationListFooter = (props: Props) => {
  return (
    <View className='flex items-center justify-center my-1'>
      {props?.bottomLoader && <ActivityIndicator className="mt-4" color={"green"} />}
      {/* {
        props?.isShowReloadBtn &&
        <Pressable onPress={props?.reload}>
          <Ionicons name="reload" size={24} color="black" />
        </Pressable>
      } */}
      <Label type='xs' weight='medium' className='text-green-700'>No more Item</Label>
    </View>
  )
}

export default DonationListFooter

const styles = StyleSheet.create({})