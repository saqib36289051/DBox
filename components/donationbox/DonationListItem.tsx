import { StyleSheet, Text, View, Image, Platform, Pressable } from 'react-native'
import React from 'react'
import Label from '@/components/ui/Label';
import { getFirstLetters } from '@/utils/utils';
import Badge from '@/components/ui/Badge';
import { AntDesign, Feather, FontAwesome6 } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { DonationList } from '@/constants/Types';

type Props = DonationList & {}

const DonationListItem: React.FC<Props> = ({
    id,
    name,
    status = 'Active',
    city,
    complete_address,
    mobile_number,
    image
}) => {
    return (
        <Pressable
            onPress={() => router.navigate(`/form/boxTransaction?id=${id}&name=${name}&mobile_number=${mobile_number}&city=${city}&complete_address=${complete_address}`)}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? "#e0f2fe" : "#fff",
                },
                styles.card
            ]
            }
            key={id} >
            <View>
                {image ?
                    <Image
                        className="rounded-full w-12 h-12 object-cover shadow"
                        source={{ uri: image }} />
                    :
                    <View className="bg-green-700 w-12 h-12 rounded-full flex items-center justify-center">
                        <Label type='p' weight='bold' className='text-white'>{getFirstLetters(name)}</Label>
                    </View>}
            </View>
            <View className='flex-1'>
                <Label
                    type="p"
                    weight="medium"
                >
                    {name}
                </Label>
                <View className='flex mt-2'>
                    {/* <View className="flex-row space-x-2 items-center">
                        <Label
                            type="xs"
                            weight="medium"
                            className='text-gray-600'
                        >
                            Status:
                        </Label>
                        <Label type='xs' weight='regular' className={`${status === 'Active' ? 'text-green-600' : 'text-yellow-600'}`}>{status}</Label>

                    </View> */}
                    <View className="flex-row space-x-2 items-center">
                        <Label
                            type="xs"
                            weight="medium"
                            className='text-gray-600'
                        >
                            District:
                        </Label>
                        <Label type='xs' weight='regular' className={'text-gray-600'}>{city}</Label>

                    </View>
                    <View className="gap-y-1">
                        <Label
                            type="xs"
                            weight="medium"
                            className='text-gray-600'
                        >
                            Address
                        </Label>
                        <Label type='xs' weight='regular' className={'text-gray-600 basis[80%] flex-wrap flex-1'}>{complete_address}</Label>

                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default DonationListItem

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        columnGap: 8,
        marginVertical: 4,
        marginHorizontal: 2,
        borderRadius: 16,
        paddingVertical: 8,
        paddingHorizontal: 12,
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