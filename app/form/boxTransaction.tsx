import { ScrollView, StyleSheet, Text, ToastAndroid, useColorScheme, View } from 'react-native'
import React, { useReducer, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import LayoutContainer from '@/components/container/LayoutContainer'
import Label from '@/components/ui/Label'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import DropDown from '@/components/ui/DropDown'
import { GENERAL_TRANSACTION_TYPE, Transaction_TYPES } from '@/constants/Enum'
import Input from '@/components/ui/Input'
import { useTransactionMutation } from '@/store/services/transactionApi'
import Button from '@/components/ui/Button'
import { printReceipt } from '@/utils/utils'

type Props = {}

type State = {
    mobile_number: string;
    name: string;
    donation_type: string;
    amount: string;
}

type Action = Partial<State>;

const BoxTransaction = (props: Props) => {
    const params = useLocalSearchParams<{ id: string, name: string, mobile_number: string, city: string, complete_address: string }>()
    const { id, name, mobile_number, city, complete_address } = params
    const colorScheme = useColorScheme()
    const [errors, setErrors] = useState<any>({})
    const [transaction, { isLoading, isError, error }] = useTransactionMutation()
    const [state, dispatch] = useReducer((state: State, action: Action) => {
        return { ...state, ...action }
    }, {
        mobile_number: mobile_number || '',
        name: name || '',
        donation_type: "BOX",
        amount: "",
    })

    const text =
        "[C]<u><font size='big'>JAMIA NIZAM-E-MUSTAFA</font></u>\n" +
        "[L]\n" +
        `[L]<b>NAME:</b>[R]${state.name}\n` +
        `[L]<b>MOBILE:</b>[R]${state.mobile_number}\n` +
        `[L]<b>Donation:</b>[R]${state.amount}\n` +
        `[L]<b>Collection Mode:</b>[R]${state.donation_type}\n` +
        "[L]\n" +
        `[L]<b><u>Jamia Niazame Mustafa</u></b> will use your funds wherever it deems fit for religious and charitable purposes.\n` +
        "[C]<qrcode size='20'>JAMIA NIZAM-E-MUSTAFA</qrcode>";

    const validation = () => {
        let error = {
            mobile_number: '',
            name: '',
            amount: '',
            donation_type: ""
        }

        if (state.mobile_number === '') {
            error.mobile_number = 'Mobile Number is required.'
        }
        if (state.name === '') {
            error.name = 'Name is required.'
        }
        if (state.amount === '') {
            error.amount = 'Amount is required.'
        }
        if (state.donation_type === '') {
            error.donation_type = 'Donation Type is required.'
        }
        setErrors(error)
        return !(error.mobile_number || error.name || error.amount || error.donation_type)
    }

    const print = async () => {

        try {
            if (!validation()) {
                return
            }
            const res = await transaction({
                ...state,
                box: id,
                city,
                complete_address,
            })
            if (res?.error) {
                Object.entries(res?.error?.data)?.map(([key, value]) => {
                    ToastAndroid.show(`${value}`, ToastAndroid.SHORT)
                })
                return
            }
            printReceipt(text)
            router.back()
        } catch (err) {
            console.error('Error printing:', err);
        }
    };

    return (
        <LayoutContainer>
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="gap-y-2">
                <View className='h-20 justify-center'>
                    <Label weight='medium'>Fill out the form value to collect the donation from the box.</Label>
                </View>
                <View>
                    <Label type='sm' weight='regular' className='mb-2 text-gray-600'>Donation Type</Label>
                    <DropDown
                        data={[{ label: 'BOX', value: Transaction_TYPES.BOX }]}
                        onChangeValue={(value) => dispatch({ donation_type: value })}
                        position="bottom"
                        value={state.donation_type}
                    />
                    {errors.donation_type !== '' && <Label type='xs' weight='medium' className='text-red-500'>{errors.donation_type}</Label>}
                </View>
                <View>
                    <Input
                        label={<Label type='sm' weight='regular' className='mb-1 text-gray-600'>Mobile Number</Label>}
                        onChangeText={(e) => dispatch({ mobile_number: e })}
                        value={state.mobile_number}
                        keyboardType='phone-pad'
                        placeholder='+920000000000'
                        placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
                    />
                    {errors.mobile_number && <Label type='xs' weight='medium' className='text-red-500'>{errors.mobile_number}</Label>}
                </View>
                <View>
                    <Input
                        label={<Label type='sm' weight='regular' className='mb-1 text-gray-600'>Name</Label>}
                        onChangeText={(e) => dispatch({ name: e })}
                        value={state.name}
                        placeholder='Enter Custodian Name'
                        placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
                    />
                    {errors.name && <Label type='xs' weight='medium' className='text-red-500'>{errors.name}</Label>}
                </View>
                <View>
                    <Input
                        label={<Label type='sm' weight='regular' className='mb-1 text-gray-600'>Amount (PKR)</Label>}
                        onChangeText={(e) => dispatch({ amount: e })}
                        value={state.amount}
                        placeholder='Amount'
                        placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
                    />
                    {errors.amount && <Label type='xs' weight='medium' className='text-red-500'>{errors.amount}</Label>}
                </View>

                <Button
                    title="Print"
                    onPress={print}
                    isLoading={isLoading}
                    className="mt-4"
                />
            </ScrollView>
        </LayoutContainer>
    )
}

export default BoxTransaction

const styles = StyleSheet.create({})