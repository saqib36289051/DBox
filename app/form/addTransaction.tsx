import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, View, useColorScheme, Alert, ScrollView } from 'react-native';
import ThermalPrinterModule from 'react-native-thermal-printer';
import { Colors } from '@/constants/Colors';
import LayoutContainer from '@/components/container/LayoutContainer';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Button from '@/components/ui/Button';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import CheckboxGroup from '@/components/ui/CheckboxGroup';
import { GenderListType } from '@/constants/Types';
import DropDown from '@/components/ui/DropDown';

ThermalPrinterModule.defaultConfig = {
    ...ThermalPrinterModule.defaultConfig,
    ip: '192.168.100.246',
    port: 9100,
    timeout: 30000,
};

type State = {
    mobile: string;
    name: string;
    state: string;
    city: string;
    area: string;
    address: string;
    donationType: string;
    amount: string;
    gender: GenderListType[];
    date: string;
}

type Action = Partial<State>;

const AddTransaction = () => {
    const colorScheme = useColorScheme();
    const [state, dispatch] = useReducer((state: State, action: Action) => {
        return { ...state, ...action }
    }, {
        mobile: '',
        name: '',
        state: '',
        city: '',
        area: '',
        address: '',
        donationType: "",
        amount: "",
        date: "",
        gender: [{
            id: 1,
            text: "Male",
            isChecked: false,
        },
        {
            id: 2,
            text: "Female",
            isChecked: false,
        }]
    })
    const text =
        '[L]--------------------\n' +
        '[L]JAMIA NIZAME MUSTAFA\n' +
        '[L]--------------------\n' +
        `[L]NAME: ${state.name}\n` +
        `[L]MOBILE: ${state.mobile}\n` +
        `[L]Donation: ${state.amount}\n` +
        '[L]WE ARE VERY THANKFUL FOR YOUR DONATION AND IT WILL USE FOR THE CHILDRENS TO PROVIDE FREE FOOD AND EDUCATION JAZAK ALLAH'

    const scanBluetoothDevices = async () => {
        try {
            const devices = await ThermalPrinterModule.getBluetoothDeviceList();
            console.log('Bluetooth devices:', devices);
            return devices;
        } catch (err) {
            console.error('Error scanning Bluetooth devices:', err.message);
            return [];
        }
    };

    const print = async () => {
        const devices = await scanBluetoothDevices();
        if (devices.length === 0) {
            Alert.alert('No Bluetooth devices found');
            return;
        }

        const printer = devices.find(device => device.deviceName === 'InnerPrinter'); // Adjust this to your printer's name

        if (!printer) {
            Alert.alert('Bluetooth Printer not found');
            return;
        }

        try {
            // await ThermalPrinterModule.printTcp({ payload: text });
            await ThermalPrinterModule.printBluetooth({
                payload: text,
                macAddress: printer.macAddress,
                printerNbrCharactersPerLine: 32,
            });
            console.log('done printing');
        } catch (err) {
            console.error('Error printing:', err.message);
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
                    <Input
                        label={<Label type='sm' weight='regular' className='mb-1 text-gray-600'>Mobile Number</Label>}
                        onChangeText={(e) => dispatch({ mobile: e })}
                        value={state.mobile}
                        keyboardType='phone-pad'
                        placeholder='+920000000000'
                        placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
                    />
                </View>
                <View>
                    <Input
                        label={<Label type='sm' weight='regular' className='mb-1 text-gray-600'>Name</Label>}
                        onChangeText={(e) => dispatch({ name: e })}
                        value={state.name}
                        placeholder='Enter Custodian Name'
                        placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
                    />
                </View>
                <View>
                    <Input
                        label={<Label type='sm' weight='regular' className='mb-1 text-gray-600'>State / Province</Label>}
                        onChangeText={(e) => dispatch({ state: e })}
                        value={state.state}
                        placeholder='State / Province'
                        placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
                    />
                </View>
                <View>
                    <Input
                        label={<Label type='sm' weight='regular' className='mb-1 text-gray-600'>City</Label>}
                        onChangeText={(e) => dispatch({ city: e })}
                        value={state.city}
                        placeholder='City'
                        placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
                    />
                </View>
                <View>
                    <Input
                        label={<Label type='sm' weight='regular' className='mb-1 text-gray-600'>Area</Label>}
                        onChangeText={(e) => dispatch({ area: e })}
                        value={state.area}
                        placeholder='Area'
                        placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
                    />
                </View>
                <View>
                    <Input
                        label={<Label type='sm' weight='regular' className='mb-1 text-gray-600'>Complete Address</Label>}
                        onChangeText={(e) => dispatch({ address: e })}
                        value={state.address}
                        placeholder='Complete Address'
                        multiline={true}
                        numberOfLines={2}
                        className='h-18'
                        textAlignVertical='top'
                        placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
                    />
                </View>
                <View>
                    <Label type='sm' weight='regular' className='mb-3 text-gray-600'>Gender</Label>
                    <CheckboxGroup
                        data={state.gender}
                        onCheckChange={(data) => dispatch({ gender: data })}
                    />
                </View>
                <View>
                    <Input
                        label={<Label type='sm' weight='regular' className='mb-1 text-gray-600'>Date</Label>}
                        onChangeText={(e) => { }}
                        value={state.date}
                        placeholder='Date'
                        placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
                    />
                </View>
                <View>
                    <Label type='sm' weight='regular' className='mb-2 text-gray-600'>Donation Type</Label>
                    <DropDown
                        data={[{ label: 'Box', value: '1' }, { label: 'Sadqa', value: '2' }, { label: 'Zakat', value: '3' }]}
                        onChangeValue={(value) => dispatch({ donationType: value })}
                    />
                </View>
                <View>
                    <Input
                        label={<Label type='sm' weight='regular' className='mb-1 text-gray-600'>Amount (PKR)</Label>}
                        onChangeText={(e) => dispatch({ amount: e })}
                        value={state.amount}
                        placeholder='Amount'
                        placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
                    />
                </View>

                <Button
                    onPress={print}
                    title="Print Reciept"
                    className='mb-2'
                />
            </ScrollView>
        </LayoutContainer>
    );
};

export default AddTransaction;

const styles = StyleSheet.create({});
