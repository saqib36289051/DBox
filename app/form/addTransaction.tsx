import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, View, useColorScheme, Alert, ScrollView, ToastAndroid } from 'react-native';
import ThermalPrinterModule from 'react-native-thermal-printer';
import { Colors } from '@/constants/Colors';
import LayoutContainer from '@/components/container/LayoutContainer';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Button from '@/components/ui/Button';
import DropDown from '@/components/ui/DropDown';
import { useTransactionMutation } from '@/store/services/transactionApi';
import { useRouter } from 'expo-router';
import { GENERAL_TRANSACTION_TYPE } from '@/constants/Enum';
import { printReceipt } from '@/utils/utils';

ThermalPrinterModule.defaultConfig = {
    ...ThermalPrinterModule.defaultConfig,
    ip: '192.168.100.246',
    port: 9100,
    timeout: 30000,
};

type State = {
    mobile_number: string;
    name: string;
    donation_type: string;
    amount: string;
}

type Action = Partial<State>;

const AddTransaction = () => {
    const colorScheme = useColorScheme();
    const router = useRouter()
    const [errors, setErrors] = useState<any>({})
    const [transaction, { isLoading, isError, error }] = useTransactionMutation()
    const [state, dispatch] = useReducer((state: State, action: Action) => {
        return { ...state, ...action }
    }, {
        mobile_number: '',
        name: '',
        donation_type: "",
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
            error.mobile_number = 'Mobile Number is required'
        }

        if (state.name === '') {
            error.name = 'Name is required'
        }

        if (state.amount === '') {
            error.amount = 'Amount is required'
        }

        if (state.donation_type === '') {
            error.donation_type = 'Donation Type is required'
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
                    <Label weight='medium'>Fill out the form value to collect the donation from the custodian.</Label>
                </View>
                <View>
                    <Label type='sm' weight='regular' className='mb-2 text-gray-600'>Donation Type</Label>
                    <DropDown
                        data={GENERAL_TRANSACTION_TYPE}
                        onChangeValue={(value) => dispatch({ donation_type: value })}
                        position="bottom"
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
                    onPress={print}
                    title="Print Reciept"
                    className='mb-2'
                    isLoading={isLoading}
                />
            </ScrollView>
        </LayoutContainer>
    );
};

export default AddTransaction;

const styles = StyleSheet.create({});
