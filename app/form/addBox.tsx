import { Image, Pressable, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useCallback, useMemo, useReducer, useRef, useState } from 'react'
import LayoutContainer from '@/components/container/LayoutContainer'
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerResult } from 'expo-image-picker';
import Label from '@/components/ui/Label'
import CheckboxGroup from '@/components/ui/CheckboxGroup'
import Input from '@/components/ui/Input'
import { BoxEditPropsType, GenderListType } from '@/constants/Types'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { useBoxMutation, useUpdateBoxMutation } from '@/store/services/boxApi'
import Button from '@/components/ui/Button'
import {
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import BottomSheetModalReusable from '@/components/ui/BottomSheet';
import { Entypo, Ionicons } from '@expo/vector-icons';

type State = {
  mobile_number: string;
  name: string;
  province: string;
  city: string;
  area: string;
  complete_address: string;
  gender: GenderListType[]
  image: string | null;
}

type Action = Partial<State>;

const initValues = [{
  id: 1,
  text: "Male",
  isChecked: false,
},
{
  id: 2,
  text: "Female",
  isChecked: false,
}]

const AddBox = () => {
  const params = useLocalSearchParams<BoxEditPropsType>()
  const isEdit = params?.id ? true : false
  console.log("🚀 ~ AddBox ~ params?.id:", params?.id)
  const colorScheme = useColorScheme();
  const router = useRouter()
  const [box, { isLoading, isError, error }] = useBoxMutation()
  const [updateBox, { isLoading: isUpdateLoading, isError: isUpdateError, error: updateError }] = useUpdateBoxMutation()
  const [errors, setErrors] = useState<any>({})
  const [state, dispatch] = useReducer((state: State, action: Action) => {
    return { ...state, ...action }
  }, {
    mobile_number: params?.mobile_number || '',
    name: params?.name || '',
    province: params?.province || '',
    city: params?.city || '',
    area: params?.area || '',
    complete_address: params?.complete_address || '',
    gender: isEdit ? getGenderVals() : initValues,
    image: params?.image || null
  })


  function getGenderVals(): GenderListType[] {
    const genderVal = initValues?.find(i => i?.text === params?.gender)
    const mutated = initValues?.map(i => {
      if (i?.text === genderVal?.text) {
        return { ...i, isChecked: true }
      }
      return { ...i, isChecked: false }
    })
    return mutated
  }

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['25%'], []);

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
    if (state.image) {
      const uriParts = state.image.split('.');
      const fileType = uriParts[uriParts.length - 1];
      formData.append('image', {
        uri: state.image,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
    }

    try {
      const res = await box(formData)
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

  async function iUpdateBox() {
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
    if (state.image) {
      const uriParts = state.image.split('.');
      const fileName = state.image.split('/').pop()
      const fileType = uriParts[uriParts.length - 1];
      formData.append('image', {
        uri: state.image,
        name: fileName,
        type: `image/${fileType}`,
      });
    }

    try {
      const res = await updateBox({
        id: params?.id,
        formData,
      })
      if (res?.error) {
        console.log("🚀 ~ iUpdateBox ~ res?.error:", res?.error)
        ToastAndroid.show(`${res?.error?.data}`, ToastAndroid.SHORT)
        // Object.entries(res?.error?.data)?.map(([key, value]) => {
        // })
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
    if (typeof state.gender !== "string" && !state.gender.find(g => g.isChecked === true)) {
      error.gender = 'Select Gender'
    }

    setErrors(error)

    return !(error.mobile_number || error.name || error.province || error.city || error.area || error.complete_address || error.gender)
  }

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result: ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    bottomSheetModalRef?.current?.dismiss()

    if (!result.canceled) {
      dispatch({ image: result.assets[0].uri });
      bottomSheetModalRef?.current?.dismiss()
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result: ImagePickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    bottomSheetModalRef?.current?.dismiss()

    if (!result.canceled) {
      dispatch({ image: result.assets[0].uri });
      bottomSheetModalRef?.current?.dismiss()
    }
  };

  return (
    <View className="flex-1">
      <LayoutContainer>
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="gap-y-2">
          <View className='h-20 justify-center'>
            <Label weight='medium'>Fill out the form value to collect the donation from the custodian.</Label>
          </View>
          <View className='flex-row justify-center rounded-full'>
            {state.image != "null" && state.image ? (
              <Pressable
                onPress={() => bottomSheetModalRef?.current?.present()}
              >
                <>
                  <Image
                    source={{ uri: state.image }}
                    style={{ width: 160, height: 160, borderRadius: 100 }}
                  />
                </>
                <View className="absolute z-10 bottom-0 top-0 left-0 right-0 rounded-full flex items-center justify-center">
                  <Ionicons name="camera" size={32} color="#fff" />
                </View>
              </Pressable>
            ) : (
              <TouchableOpacity
                onPress={() => bottomSheetModalRef?.current?.present()}
                style={{ width: 160, height: 160, borderRadius: 100 }}
                className="bg-gray-400 flex items-center justify-center"
              >
                <Ionicons name="camera" size={32} color="#fff" />
              </TouchableOpacity>
            )

            }
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
            onPress={isEdit ? iUpdateBox : addBox}
            title={isEdit ? "UpdateBox" : "Add New Box"}
            className='mb-2'
            isLoading={isLoading}
          />
        </ScrollView>
      </LayoutContainer >

      {/* Bottom Sheet Modal */}
      <BottomSheetModalReusable
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
      >
        <View className='flex-row h-full items-center justify-around'>
          <View className='flex flex-col items-center space-y-3'>
            <Pressable
              onPress={pickImage}
              android_ripple={{ color: 'lightgray', radius: 36 }}
              className="bg-gray-100 p-5 rounded-full">
              <Entypo name="images" size={36} color="green" />
            </Pressable>
            <Label type='xs'>Gallery</Label>
          </View>
          <View className='flex flex-col items-center space-y-3'>
            <Pressable
              onPress={takePhoto}
              android_ripple={{ color: 'lightgray', radius: 36 }}
              className="bg-gray-100 p-5 rounded-full">
              <Entypo name="camera" size={36} color="green" />
            </Pressable>
            <Label type='xs'>Camera</Label>
          </View>
        </View>
      </BottomSheetModalReusable>
    </View>
  )
}

export default AddBox

const styles = StyleSheet.create({

})