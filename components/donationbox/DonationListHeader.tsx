import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Label from '../ui/Label'

type Props = {}

const DonationListHeader = (props: Props) => {
  return (
    <View className='flex items-center justify-center my-1'>
      <Label type='p' weight='medium' className='text-cyan-700'>Donation Transaction List</Label>
    </View>
  )
}

export default DonationListHeader

const styles = StyleSheet.create({})