import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PopupMenu from './PopupMenu'
import { MenuItemType } from '@/constants/Types'

type Props = {
    isShowMenu?: boolean
    menuItems?: MenuItemType[]
}

const TopBar = (props: Props) => {
    return (
        <View
            style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            }}
            className=' h-[94px] w-full bg-white px-4 flex-row items-end '>
            <View className='flex-row justify-between w-full items-center'>
                <Image source={require("@/assets/images/print-line-logo.png")}
                    style={{ width: 160, height: 48, resizeMode: "contain" }}
                />
                {props?.isShowMenu &&
                    <PopupMenu menuItems={props?.menuItems} />
                }
            </View>
        </View>
    )
}

export default TopBar

const styles = StyleSheet.create({})