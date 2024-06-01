import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import * as SecureStore from 'expo-secure-store';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import { useNavigation, useRouter } from 'expo-router';
import Button from '@/components/ui/Button';


type Props = {}

const Login = (props: Props) => {
  const { value } = useSelector((state: RootState) => state.user)
  const router = useRouter()
  const [userId, setUserId] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onLogin = async () => {
    router.navigate('/')
    try {

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View className="flex-1 bg-white justify-around">
      <View className="flex h-1/3 items-center justify-center">
        <Label type="H3" className=" text-green-600 font-black">
          DBox
        </Label>
      </View>

      <View className="space-y-2 px-4 w-full">
        <View>
          <Input
            label={<Label className="text-gray-600 font-medium mb-1">User ID</Label>}
            onChangeText={v => setUserId(v)}
            value={userId}
            placeholder="User ID"
          />
        </View>
        <View>
          <Input
            label={<Label className="text-gray-600 font-medium mb-1">Password</Label>}
            onChangeText={v => setPassword(v)}
            value={password}
            placeholder="Password"
            secureTextEntry
          />
        </View>

        <View>
          <Button onPress={onLogin} title="Login" />
        </View>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({

})