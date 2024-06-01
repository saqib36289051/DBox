import { StyleSheet, Text, View, Image, Platform, Pressable } from 'react-native'
import React from 'react'
import Label from '@/components/ui/Label';
import { getFirstLetters } from '@/utils/utils';
import Badge from '@/components/ui/Badge';
import { AntDesign, Feather, FontAwesome6 } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { DonationList } from '@/constants/Types';

type Props = DonationList & {}

const ListItemCard: React.FC<Props> = ({
    id,
    name,
    collectedAmount,
    status,
    district,
    address,
    img
}) => {
    return (
        <View key={id} className="flex-row space-x-2 shadow border border-gray-200 bg-white my-1 rounded-md px-3 pt-3 pb-1">
            <View>
                {
                    img ?
                        <Image
                            className="rounded-full w-12 h-12 object-cover shadow"
                            source={{ uri: img }} />
                        :
                        <View className="bg-cyan-700 w-12 h-12 rounded-full flex items-center justify-center">
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
                <View className='flex mt-2 space-y-1'>
                    <View className="flex-row space-x-2 items-center">
                        <Label
                            type="xs"
                            weight="medium"
                            className='text-gray-600'
                        >
                            Status:
                        </Label>
                        <Label type='xs' weight='regular' className={`${status === 'Active' ? 'text-green-600' : 'text-yellow-600'}`}>{status}</Label>

                    </View>
                    <View className="flex-row space-x-2 items-center">
                        <Label
                            type="xs"
                            weight="medium"
                            className='text-gray-600'
                        >
                            District:
                        </Label>
                        <Label type='xs' weight='regular' className={'text-gray-600'}>{district}</Label>

                    </View>
                    <View className="flex-row space-x-2 items-center">
                        <Label
                            type="xs"
                            weight="medium"
                            className='text-gray-600'
                        >
                            Address:
                        </Label>
                        <Label type='xs' weight='regular' className={'text-gray-600'}>{address}</Label>

                    </View>

                    <View className='flex flex-row justify-end'>
                        <Pressable
                            onPress={() => { }}
                            style={({ pressed }) => [
                                {
                                    backgroundColor: pressed ? '#ecfeff' : 'white',
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

                        <Pressable
                            onPress={() => { }}
                            style={({ pressed }) => [
                                {
                                    backgroundColor: pressed ? '#ecfeff' : 'white',
                                    padding: 8,
                                    borderRadius: 100
                                }
                            ]}
                        >
                            {({ pressed }) => (
                                <FontAwesome6 name="share-square" size={22} color={`${pressed ? "#0e7490" : "#4b5563"}`} />
                            )
                            }
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ListItemCard

const styles = StyleSheet.create({})