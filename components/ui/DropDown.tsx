import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

type Props = {
    data: {
        label: string;
        value: string;
    }[],
    position?: 'top' | 'bottom';
    onChangeValue: (value: string) => void;
};

type DropDownItem = {
    label: string;
    value: string;
}

const DropDown = (props: Props) => {
    const [value, setValue] = useState<string | null>(null);

    const renderItem = (item: DropDownItem) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                {item.value === value && (
                    <AntDesign
                        style={styles.icon}
                        color="black"
                        name="Safety"
                        size={20}
                    />
                )}
            </View>
        );
    };

    const onChangeValue = (item: DropDownItem) => {
        setValue(item.value);
        props?.onChangeValue(item?.value);
    }

    return (
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={props?.data}
            dropdownPosition={props?.position || 'top'}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select Donation Type"
            value={value}
            onChange={onChangeValue}
            renderLeftIcon={() => (
                <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            )}
            renderItem={renderItem}
        />
    );
};

export default DropDown;

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        backgroundColor: 'transparent',
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: 'lightgray',
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});