import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Label from './Label'

type Props = {
    status: string
}

const Badge = (props: Props) => {
    return <Label type='xs' weight='regular' className={`${props?.status === 'active' ? 'text-green-600' : 'text-orange-600'}`}>{props?.status}</Label>

}

export default Badge

const styles = StyleSheet.create({})