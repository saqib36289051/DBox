import { Modal, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Animated, Easing } from 'react-native'
import React, { useRef } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { MenuItemType } from '@/constants/Types'
import Label from './Label'

type Props = {
    menuItems?: MenuItemType[]
}

const PopupMenu = (props: Props) => {
    const [isShow, setIsShow] = React.useState(false)
    const scale = useRef(new Animated.Value(0)).current

    function anim(to: number) {
        to === 1 && setIsShow(true)
        Animated.timing(scale, {
            toValue: to,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.linear,
        }).start(() => to === 0 && setIsShow(false))
    }
    return (
        <>
            <Pressable
                onPress={() => anim(1)}
                className="">
                <AntDesign name="pluscircleo" size={20} color="green" />
            </Pressable>
            <Modal transparent visible={isShow}>
                <SafeAreaView className="flex-1" onTouchStart={() => anim(0)}>
                    <Animated.View
                        style={{ transform: [{ scale }] }}
                        className='rounded-md border-gray-200 border bg-white px-2 absolute top-12 right-5'>
                        {
                            props?.menuItems?.map((item, index) => (
                                <TouchableOpacity
                                    style={{
                                        borderBottomWidth: index === props?.menuItems?.length - 1 ? 0 : 1,
                                    }}
                                    className='flex-row justify-between items-center py-2 border-b border-gray-200'
                                    key={index}>
                                    <Label type='sm' className='mr-4'>{item?.label}</Label>
                                    {item?.icon}
                                </TouchableOpacity>
                            ))
                        }
                    </Animated.View>

                </SafeAreaView>
            </Modal>
        </>
    )
}

export default PopupMenu

const styles = StyleSheet.create({})