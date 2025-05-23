import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Label from '../ui/Label'

type Props = {}

const ListFooter = (props: Props) => {
  return (
    <View className='flex items-center justify-center my-1'>
      <Label type='xs' weight='medium' className='text-green-700'>No more Item</Label>
    </View>
  )
}

export default ListFooter

const styles = StyleSheet.create({})