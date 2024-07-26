import { StyleSheet, Text, View, Image, Platform, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import Label from '@/components/ui/Label';
import { getDate, getFirstLetters, getTime } from '@/utils/utils';
import Badge from '@/components/ui/Badge';
import { AntDesign, Entypo, Feather, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { DonationList, DonationTransactinList } from '@/constants/Types';
import { Transaction_TYPES } from '@/constants/Enum';

type Props = DonationTransactinList & {
    handlePdfPrint: () => void;
    handlePdfShare: () => void;
}

const ListItemCard: React.FC<Props> = ({
    id,
    amount,
    created_at,
    name,
    city,
    complete_address,
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
        // className="flex-row space-x-2 border bg-white border-gray-200 my-1 rounded-md px-3 pt-3 pb-1"
        >
            <View>
                {
                    // custodianImg ?
                    //     <Image
                    //         className="rounded-full w-12 h-12 object-contain shadow"
                    //         source={{ uri: custodianImg }} />
                    //     :
                    <View className="bg-green-700 w-12 h-12 rounded-full flex items-center justify-center">
                        <Label type='p' weight='bold' className='text-white'>{getFirstLetters(name)}</Label>
                    </View>
                }
            </View>

            <View className='flex-1'>
                <Label
                    type="p"
                    weight="medium"
                >
                    {name}
                </Label>
                <View className='flex w-[50%] h-[1] bg-slate-400 mt-1'></View>
                <View className='flex mt-1 space-y-1'>

                    <View className="flex-row space-x-2 items-center">
                        <MaterialCommunityIcons name="currency-rupee" size={14} color="rgb(21,128,61)" />
                        <Label
                            type="xs"
                            weight="medium"
                            className='text-gray-600'
                        >
                            Collected Amount:
                        </Label>
                        <Label type='xs' weight='medium' className={'text-red-600'}>{amount}</Label>

                    </View>
                    <View className="flex-row space-x-2 items-center">
                        <MaterialCommunityIcons name="clock-time-three-outline" size={14} color="rgb(21,128,61)" />
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
                            <View className="flex-row space-x-2 items-center">
                                <MaterialCommunityIcons name="map-search" size={12} color="rgb(21,128,61)" />
                                <Label
                                    type="xs"
                                    weight="medium"
                                    className='text-gray-600'
                                >
                                    District:
                                </Label>
                                <Label type='xs' weight='regular' className={'text-gray-600'}>{city}</Label>

                            </View>
                            <View className="flex-row space-x-2 items-center">
                                <Entypo name="address" size={14} color="rgb(21,128,61)" />
                                <Label
                                    type="xs"
                                    weight="medium"
                                    className='text-gray-600'
                                >
                                    Address:
                                </Label>
                                <Label type='xs' weight='regular' className={'text-gray-600'}>{complete_address}</Label>

                            </View>
                        </>
                    }
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

                    <View className='flex flex-row justify-end'>
                        <Pressable
                            onPress={handlePdfPrint}
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

export default ListItemCard

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        columnGap: 8,
        marginVertical: 4,
        marginHorizontal: 2,
        borderRadius: 16,
        paddingVertical: 8,
        paddingHorizontal: 12,
        paddingBottom: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 16,
        elevation: 2,
    }
})


