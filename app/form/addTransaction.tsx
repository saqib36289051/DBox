import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useState } from 'react'
import LayoutContainer from '@/components/container/LayoutContainer'
import Input from '@/components/ui/Input'
import { Feather, SimpleLineIcons } from '@expo/vector-icons'
import Label from '@/components/ui/Label'
import { Colors } from '@/constants/Colors'
import DropDown from '@/components/ui/DropDown'


type Props = {}
const data = [
    { label: 'Punjab', value: '1' },
    { label: 'Sindh', value: '2' },
    { label: 'KPK', value: '3' },
    { label: 'Balochistan', value: '4' },
    { label: 'Kashmir', value: '5' },
    { label: 'GB', value: '6' },

];

const AddTransaction = (props: Props) => {
    const colorScheme = useColorScheme();
    return (
        <LayoutContainer>
            <View className=" gap-y-2">
                <View className='h-20 justify-center'>
                    <Label type='h6' weight='medium'>Fill out the form value to collect the donation from the custodian.</Label>
                </View>
                <View>
                    <Input
                        label={<Label weight='medium' className='mb-1 text-cyan-700'>Mobile Number</Label>}
                        onChangeText={(e) => { }}
                        value=''
                        keyboardType='phone-pad'
                        placeholder='+920000000000'
                        placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
                    />
                </View>
                <View>
                    <Input
                        label={<Label weight='medium' className='mb-1 text-cyan-700'>Name</Label>}
                        onChangeText={(e) => { }}
                        value=''
                        placeholder='Enter Custodian Name'
                        placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
                    />
                </View>
                <View>
                    <Input
                        label={<Label weight='medium' className='mb-1 text-cyan-700'>State / Province</Label>}
                        onChangeText={(e) => { }}
                        value=''
                        placeholder='State / Province'
                        placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
                    />
                </View>
                <View>
                    <Input
                        label={<Label weight='medium' className='mb-1 text-cyan-700'>City</Label>}
                        onChangeText={(e) => { }}
                        value=''
                        placeholder='City'
                        placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
                    />
                </View>
                <View>
                    <Input
                        label={<Label weight='medium' className='mb-1 text-cyan-700'>Area</Label>}
                        onChangeText={(e) => { }}
                        value=''
                        placeholder='Area'
                        placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
                    />
                </View>
                <View>
                    <Input
                        label={<Label weight='medium' className='mb-1 text-cyan-700'>Complete Address</Label>}
                        onChangeText={(e) => { }}
                        value=''
                        placeholder='Complete Address'
                        multiline={true}
                        numberOfLines={2}
                        className='h-18'
                        textAlignVertical='top'
                        placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
                    />
                </View>
                <View>
                    <Input
                        label={<Label weight='medium' className='mb-1 text-cyan-700'>Gender</Label>}
                        onChangeText={(e) => { }}
                        value=''
                        placeholder='Gender'
                        placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
                    />
                </View>
                <View>
                    <Input
                        label={<Label weight='medium' className='mb-1 text-cyan-700'>Date</Label>}
                        onChangeText={(e) => { }}
                        value=''
                        placeholder='Date'
                        placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
                    />
                </View>

                <DropDown data={data} />

            </View>
        </LayoutContainer>
    )
}

export default AddTransaction

const styles = StyleSheet.create({})