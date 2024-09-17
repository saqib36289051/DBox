import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { GenderListType } from '@/constants/Types'
import Label from './Label'

type Props = {
    data: GenderListType[],
    onCheckChange: (data: GenderListType[]) => void,
}

const CheckboxGroup = (props: Props) => {
    const { data, onCheckChange } = props;
    const [checkBoxes, setCheckBoxes] = useState(data);

    const handleCheckboxPress = (checked: boolean, id: number) => {
        const updatedCheckBoxes = checkBoxes.map(item =>
            item.id === id ? { ...item, isChecked: checked } : { ...item, isChecked: false },
        );

        setCheckBoxes(updatedCheckBoxes);
        onCheckChange(updatedCheckBoxes);
    };
    return (
        <View className='flex-row'>
            {
                props?.data?.map((item, index) => {
                    return (
                        <View
                            key={index}
                            className="flex-row mx-2">
                            <BouncyCheckbox
                                size={22}
                                fillColor={item?.isChecked ? "green" : 'gray'}
                                unFillColor="transparent"
                                text={item?.text}
                                isChecked={item.isChecked}
                                iconStyle={{ borderColor: "red" }}
                                innerIconStyle={{ borderWidth: 2 }}
                                textStyle={{
                                    textDecorationLine: "none",
                                }}
                                onPress={(isChecked) => handleCheckboxPress(isChecked, item.id)}
                            />
                            <Label className='text-gray-700'>{item.label}</Label>
                        </View>
                    )
                })
            }
        </View>
    )
}

export default CheckboxGroup

const styles = StyleSheet.create({})