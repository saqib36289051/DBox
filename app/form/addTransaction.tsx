import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import LayoutContainer from '@/components/container/LayoutContainer'
import Input from '@/components/ui/Input'
import { Feather, SimpleLineIcons } from '@expo/vector-icons'
import Label from '@/components/ui/Label'
import { Colors } from '@/constants/Colors'

type Props = {}

const AddTransaction = (props: Props) => {
    const colorScheme = useColorScheme();

    return (
        <LayoutContainer>
            <View className=" gap-y-2">
                <View>
                    <Input
                        icon={<SimpleLineIcons name="phone" size={24} color="gray" />}
                        label={<Label weight='medium' className='mb-1'>Mobile Number</Label>}
                        onChangeText={(e) => { }}
                        value=''
                        keyboardType='phone-pad'
                        placeholder='+92300-2520850'
                        placeholderTextColor={Colors[colorScheme ?? 'light'].text}
                    />
                </View>
                <View>
                    <Input
                        label={<Label weight='medium' className='mb-1'>Name</Label>}
                        onChangeText={(e) => { }}
                        value=''
                        placeholder='Enter Name'
                        placeholderTextColor={Colors[colorScheme ?? 'light'].text}
                    />
                </View>
                <View>
                    <Input
                        label={<Label weight='medium' className='mb-1'>State / Province</Label>}
                        onChangeText={(e) => { }}
                        value=''
                        placeholder='State / Province'
                        placeholderTextColor={Colors[colorScheme ?? 'light'].text}
                    />
                </View>
                <View>
                    <Input
                        label={<Label weight='medium' className='mb-1'>City</Label>}
                        onChangeText={(e) => { }}
                        value=''
                        placeholder='City'
                        placeholderTextColor={Colors[colorScheme ?? 'light'].text}
                    />
                </View>
                <View>
                    <Input
                        label={<Label weight='medium' className='mb-1'>Area</Label>}
                        onChangeText={(e) => { }}
                        value=''
                        placeholder='Area'
                        placeholderTextColor={Colors[colorScheme ?? 'light'].text}
                    />
                </View>
                <View>
                    <Input
                        label={<Label weight='medium' className='mb-1'>Complete Address</Label>}
                        onChangeText={(e) => { }}
                        value=''
                        placeholder='Complete Address'
                        multiline={true}
                        numberOfLines={4}
                        className='h-24'
                        textAlignVertical='top'
                        placeholderTextColor={Colors[colorScheme ?? 'light'].text}
                    />
                </View>
                <View>
                    <Input
                        label={<Label weight='medium' className='mb-1'>Gender</Label>}
                        onChangeText={(e) => { }}
                        value=''
                        placeholder='Gender'
                        placeholderTextColor={Colors[colorScheme ?? 'light'].text}
                    />
                </View>
                <View>
                    <Input
                        label={<Label weight='medium' className='mb-1'>Date</Label>}
                        onChangeText={(e) => { }}
                        value=''
                        placeholder='Date'
                        placeholderTextColor={Colors[colorScheme ?? 'light'].text}
                    />
                </View>

            </View>
        </LayoutContainer>
    )
}

export default AddTransaction

const styles = StyleSheet.create({})