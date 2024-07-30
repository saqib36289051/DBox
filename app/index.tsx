import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import * as SecureStore from 'expo-secure-store';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import { useNavigation, useRouter } from 'expo-router';
import Button from '@/components/ui/Button';
import { useLoginMutation } from '@/store/services/authApi';
import { storeData } from '@/utils/utils';


type Props = {}

const Login = (props: Props) => {
  const { value } = useSelector((state: RootState) => state.user)
  const [login, { isLoading, isError, error, reset }] = useLoginMutation()
  const router = useRouter()
  const [userId, setUserId] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [errors, setErrors] = React.useState({
    userId: '',
    password: ''
  })

  const onLogin = async () => {
    const validation = validate()
    if (!validation) {
      return
    }
    try {

      const response = await login({ phone_number: userId, password: password })
      if (response.error?.status == 401) {
        setErrors({ userId: "", password: 'Invalid User ID or Password' })
        return
      }
      storeData('userInfo', response?.data)
      router.navigate('/(tabs)')

    } catch (error) {
      console.log(error)
    }
    finally {
      reset()
    }
  }

  const validate = () => {
    let errors = {
      userId: '',
      password: ''
    }

    if (userId === '') {
      errors.userId = 'User ID is required'
    }

    if (password === '') {
      errors.password = 'Password is required'
    }

    setErrors(errors)

    return !(errors.userId || errors.password)
  }

  return (
    <View className="flex-1 bg-white justify-around">
      <View className="flex h-1/3 items-center justify-center">
        <Image
          source={require('../assets/images/icon.png')}
          resizeMode='contain'
          style={{ width: 120, height: 120 }}
        />
      </View>

      <View className="space-y-2 px-4 w-full">
        <View>
          <Input
            label={<Label className="text-gray-600 font-medium mb-1">User ID</Label>}
            onChangeText={v => setUserId(v)}
            value={userId}
            placeholder="User ID"
          />
          {errors.userId && <Label type='xs' className="text-red-500">{errors.userId}</Label>}
        </View>
        <View>
          <Input
            label={<Label className="text-gray-600 font-medium mb-1">Password</Label>}
            onChangeText={v => setPassword(v)}
            value={password}
            placeholder="Password"
            secureTextEntry
          />
          {errors.password && <Label type='xs' className="text-red-500">{errors.password}</Label>}
        </View>

        <View>
          <Button onPress={onLogin} title="Login" isLoading={isLoading} />
        </View>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({

})