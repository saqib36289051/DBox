import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

type Props = {}

const Login = (props: Props) => {
  const { value } = useSelector((state: RootState) => state.user)
  console.log("🚀 ~ Login ~ value:", value)
  return (
    <View>
      <Text>Login</Text>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})