import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Label from '../ui/Label'

type Props = {}

const DonationListHeader = (props: Props) => {
  return (
    <View className='justify-center items-center my-1 bg-green-200 w-[45%] rounded-full'>
      <Label type='xs' weight='medium' className='text-green-800'>Donation Transaction List</Label>
    </View>
  )
}

export default DonationListHeader

const styles = StyleSheet.create({})