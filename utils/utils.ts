import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import ThermalPrinterModule from "react-native-thermal-printer";

export const getFirstLetters = (str: string) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");
};

export const storeData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await SecureStore.setItemAsync(key, jsonValue);
  } catch (error) {
    console.log(error);
  }
};

export const getData = async (key: string) => {
  try {
    const jsonValue = await SecureStore.getItemAsync(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log(error);
  }
};

export const removeData = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log(error);
  }
};

export const getDate = (date: string) => {
  return date.split("T")[0];
};

export const getTime = (date: string) => {
  const d = new Date(date);

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const timeFormatter = new Intl.DateTimeFormat("en-US", options);

  return timeFormatter.format(d);
};

const scanBluetoothDevices = async () => {
  try {
    const devices = await ThermalPrinterModule.getBluetoothDeviceList();
    return devices;
  } catch (err) {
    console.error("Error scanning Bluetooth devices:", err?.message);
    return [];
  }
};

export const printReceipt = async (text: string) => {
  const devices = await scanBluetoothDevices();
  if (devices.length === 0) {
    Alert.alert("No Bluetooth devices found");
    return;
  }
  const printer = devices.find(
    (device) => device.deviceName === "InnerPrinter"
  );
  await ThermalPrinterModule.printBluetooth({
    payload: text,
    macAddress: printer?.macAddress,
    printerNbrCharactersPerLine: 32,
  });
};
