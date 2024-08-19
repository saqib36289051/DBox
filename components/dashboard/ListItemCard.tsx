import { StyleSheet, Text, View, Image, Platform, Pressable, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import Label from '@/components/ui/Label';
import { getDate, getFirstLetters, getTime } from '@/utils/utils';
import Badge from '@/components/ui/Badge';
import { AntDesign, Entypo, Feather, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { DonationList, DonationTransactinList } from '@/constants/Types';
import { Transaction_TYPES } from '@/constants/Enum';

type Props = DonationTransactinList & {
    handlePdfPrint: (id: string, name: string, mobile_number: string, amount: number, donation_type: string) => void;
    handlePdfShare: () => void;
}

const ListItemCard: React.FC<Props> = ({
    id,
    amount,
    created_at,
    name,
    city,
    complete_address,
    mobile_number,
    donation_type,
    handlePdfPrint,
    handlePdfShare
}) => {
    return (
        <Pressable
            onPress={() => { }}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? "#e0f2fe" : "#fff",
                },
                styles.card
            ]
            }
            key={id}
        >
            <View className='flex-1'>
                <Label
                    type="sm"
                    weight="medium"
                    style={{ textDecorationLine: 'underline' }}
                >
                    {name}
                </Label>
                <View className="flex-row space-x-2 items-center">
                    <Label
                        type="xs"
                        weight="medium"
                        className='text["rgb(21,128,61)"]'
                    >
                        TYPE:
                    </Label>
                    <Label type='xs' weight='medium' className={'text["rgb(21,128,61)"]'}>{donation_type}</Label>
                </View>
                <View className='flex mt-1'>
                    <View className="flex-row space-x-2">
                        <Label
                            type="xs"
                            weight="medium"
                            className='text-gray-600'
                        >
                            Collected Amount:
                        </Label>
                        <Label type='xs' weight='medium' className={'text-red-600'}>{amount}</Label>
                    </View>
                    <View className="flex-row space-x-2">
                        <Label
                            type="xs"
                            weight="medium"
                            className='text-gray-600'
                        >
                            Date & Time:
                        </Label>
                        <Label type='xs' weight='regular' className={'text-gray-600'}>{getDate(created_at)}</Label>
                        <Label type='xs' weight='regular' className={'text-gray-600'}>|| {getTime(created_at)}</Label>


                    </View>
                    {donation_type === Transaction_TYPES.BOX &&
                        <>
                            <View className="flex-row space-x-2">

                                <Label
                                    type="xs"
                                    weight="medium"
                                    className='text-gray-600'
                                >
                                    District:
                                </Label>
                                <Label type='xs' weight='regular' className={'text-gray-600'}>{city}</Label>

                            </View>
                            <View className="flex-row space-x-1">


                                <Label
                                    type="xs"
                                    weight="medium"
                                    className='text-gray-600'
                                >
                                    Address
                                </Label>
                                <Label type='xs' weight='regular' className={'text-gray-600 max-w-[95%]'}>{complete_address}</Label>

                            </View>
                        </>
                    }


                    <View className='flex flex-row justify-end'>
                        <Pressable
                            onPress={() => handlePdfPrint(id?.toString(), name, mobile_number, amount, donation_type)}
                            style={({ pressed }) => [
                                {
                                    padding: 8,
                                    borderRadius: 100
                                }
                            ]}
                        >
                            {({ pressed }) => (
                                <Feather name="printer" size={24} color={`${pressed ? "#0e7490" : "#4b5563"}`} />
                            )
                            }
                        </Pressable>

                        {/* <Pressable
                            onPress={handlePdfShare}
                            style={({ pressed }) => [
                                {
                                    padding: 8,
                                    borderRadius: 100
                                }
                            ]}
                        >
                            {({ pressed }) => (
                                <FontAwesome6 name="share-square" size={22} color={`${pressed ? "#0e7490" : "#4b5563"}`} />
                            )
                            }
                        </Pressable> */}
                    </View>
                </View>
            </View>
        </Pressable>


    )
}

export default memo(ListItemCard)

const styles = StyleSheet.create({
    card: {
        height: 160,
        marginVertical: 4,
        marginHorizontal: 2,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        paddingBottom: 4,
    }
})


