import { ScrollView, StyleSheet, Text, ToastAndroid, useColorScheme, View } from 'react-native'
import React, { useReducer, useState } from 'react'
import LayoutContainer from '@/components/container/LayoutContainer'
import Label from '@/components/ui/Label'
import CheckboxGroup from '@/components/ui/CheckboxGroup'
import Input from '@/components/ui/Input'
import { GenderListType } from '@/constants/Types'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { useBoxMutation } from '@/store/services/boxApi'
import Button from '@/components/ui/Button'

type Props = {}

type State = {
  mobile_number: string;
  name: string;
  province: string;
  city: string;
  area: string;
  complete_address: string;
  gender: GenderListType[];
  image: string | null;
}

type Action = Partial<State>;

const AddBox = (props: Props) => {
  const colorScheme = useColorScheme();
  const router = useRouter()
  const [box, { isLoading, isError, error }] = useBoxMutation()
  const [errors, setErrors] = useState<any>({})
  const [state, dispatch] = useReducer((state: State, action: Action) => {
    return { ...state, ...action }
  }, {
    mobile_number: '',
    name: '',
    province: '',
    city: '',
    area: '',
    complete_address: '',
    gender: [{
      id: 1,
      text: "Male",
      isChecked: false,
    },
    {
      id: 2,
      text: "Female",
      isChecked: false,
    }],
    image: null
  })

  async function addBox() {
    if (!validation()) {
      return
    }
    const formData = new FormData()
    formData.append('mobile_number', state.mobile_number)
    formData.append('name', state.name)
    formData.append('province', state.province)
    formData.append('city', state.city)
    formData.append('area', state.area)
    formData.append('complete_address', state.complete_address)
    const gender = state.gender.find(g => g.isChecked === true)?.text
    if (gender) {
      formData.append("gender", gender)
    }
    // formData.append('image', state.image)

    try {
      const res = await box(formData)
      console.log("🚀 ~ addBox ~ res:", res)
      if (res?.error) {
        Object.entries(res?.error?.data)?.map(([key, value]) => {
          ToastAndroid.show(`${value}`, ToastAndroid.SHORT)
        })
        return
      }
      router.back()
    } catch (error) {
      console.log(error)
    }
  }


  const validation = () => {
    let error = {
      mobile_number: '',
      name: '',
      province: '',
      city: '',
      area: '',
      complete_address: '',
      gender: ''
    }

    if (state.mobile_number === '') {
      error.mobile_number = 'Mobile Number is required'
    }

    if (state.name === '') {
      error.name = 'Name is required'
    }

    if (state.province === '') {
      error.province = 'Province is required'
    }

    if (state.city === '') {
      error.city = 'City is required'
    }

    if (state.area === '') {
      error.area = 'Area is required'
    }

    if (state.complete_address === '') {
      error.complete_address = 'Complete Address is required'
    }
    if (!state.gender.find(g => g.isChecked === true)) {
      error.gender = 'Select Gender'
    }

    setErrors(error)

    return !(error.mobile_number || error.name || error.province || error.city || error.area || error.complete_address || error.gender)
  }

  return (
    <LayoutContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="gap-y-2">
        <View className='h-20 justify-center'>
          <Label weight='medium'>Fill out the form value to collect the donation from the custodian.</Label>
        </View>
        <View>
          <Input
            label={<Label type='sm' weight='regular' className='mb-1 text-gray-600'>Mobile Number</Label>}
            onChangeText={(e) => dispatch({ mobile_number: e })}
            value={state.mobile_number}
            keyboardType='phone-pad'
            placeholder='+920000000000'
            placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
          />
          {errors.mobile_number && <Label type='xs' weight='medium' className='text-red-500'>{errors.mobile_number}</Label>}
        </View>
        <View>
          <Input
            label={<Label type='sm' weight='regular' className='mb-1 text-gray-600'>Name</Label>}
            onChangeText={(e) => dispatch({ name: e })}
            value={state.name}
            placeholder='Enter Custodian Name'
            placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
          />
          {errors.name && <Label type='xs' weight='medium' className='text-red-500'>{errors.name}</Label>}
        </View>
        <View>
          <Input
            label={<Label type='sm' weight='regular' className='mb-1 text-gray-600'>State / Province</Label>}
            onChangeText={(e) => dispatch({ province: e })}
            value={state.province}
            placeholder='State / Province'
            placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
          />
          {errors.province && <Label type='xs' weight='medium' className='text-red-500'>{errors.province}</Label>}
        </View>
        <View>
          <Input
            label={<Label type='sm' weight='regular' className='mb-1 text-gray-600'>City</Label>}
            onChangeText={(e) => dispatch({ city: e })}
            value={state.city}
            placeholder='City'
            placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
          />
          {errors.city && <Label type='xs' weight='medium' className='text-red-500'>{errors.city}</Label>}
        </View>
        <View>
          <Input
            label={<Label type='sm' weight='regular' className='mb-1 text-gray-600'>Area</Label>}
            onChangeText={(e) => dispatch({ area: e })}
            value={state.area}
            placeholder='Area'
            placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
          />
          {errors.area && <Label type='xs' weight='medium' className='text-red-500'>{errors.area}</Label>}
        </View>
        <View>
          <Input
            label={<Label type='sm' weight='regular' className='mb-1 text-gray-600'>Complete Address</Label>}
            onChangeText={(e) => dispatch({ complete_address: e })}
            value={state.complete_address}
            placeholder='Complete Address'
            multiline={true}
            numberOfLines={2}
            className='h-18'
            textAlignVertical='top'
            placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
          />
          {errors.complete_address && <Label type='xs' weight='medium' className='text-red-500'>{errors.complete_address}</Label>}
        </View>
        <View>
          <Label type='sm' weight='regular' className='mb-3 text-gray-600'>Gender</Label>
          <CheckboxGroup
            data={state.gender}
            onCheckChange={(data) => dispatch({ gender: data })}
          />
          {errors.gender && <Label type='xs' weight='medium' className='text-red-500'>{errors.gender}</Label>}
        </View>
        <Button
          onPress={addBox}
          title="Add New Box"
          className='mb-2'
          isLoading={isLoading}
        />
      </ScrollView>


    </LayoutContainer >
  )
}

export default AddBox

const styles = StyleSheet.create({})