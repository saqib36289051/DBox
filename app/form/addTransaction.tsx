import React, { useState, useEffect } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View, useColorScheme, Alert } from 'react-native';
import ThermalPrinterModule from 'react-native-thermal-printer';
import { Colors } from '@/constants/Colors';

ThermalPrinterModule.defaultConfig = {
    ...ThermalPrinterModule.defaultConfig,
    ip: '192.168.100.246',
    port: 9100,
    timeout: 30000,
};

const AddTransaction = (props) => {
    const colorScheme = useColorScheme();
    const [text, setText] = useState(
        '[C]=============\n' +
        '[L]\n' +
        '[L]<b>BEAUTIFUL\n' +
        '[L]  + Size : S'
    );

    const backgroundStyle = {
        backgroundColor: "#cc6789",
    };

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
                printerNbrCharactersPerLine: 48,
            });
            console.log('done printing');
        } catch (err) {
            console.error('Error printing:', err.message);
        }
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <TextInput
                value={text}
                onChangeText={setText}
            />
            <Button
                title="Click to invoke your native module!"
                color="#841584"
                onPress={print}
            />
        </SafeAreaView>
    );
};

export default AddTransaction;

const styles = StyleSheet.create({});
