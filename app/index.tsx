import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import { useRouter } from "expo-router";
import Button from "@/components/ui/Button";
import { useLoginMutation } from "@/store/services/authApi";
import { storeData } from "@/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import loginSchema from "@/schemas/loginSchema";
import { FormType } from "@/types/loginForm";

const Login = () => {
  const dispatch = useDispatch();
  const [login, { isLoading, reset }] = useLoginMutation();
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(loginSchema),
  });

  const onLogin = async (data: FormType) => {
    try {
      const response = await login({
        phone_number: data.phone_number,
        password: data.password,
      });
      if (response.error?.status == 401) {
        return;
      }
      dispatch({
        type: "user/setUser",
        payload: response?.data,
      });
      storeData("userInfo", response?.data);
      router.navigate("/tabs");
    } catch (error) {
      console.log(error);
    } finally {
      reset();
    }
  };

  return (
    <View className="flex-1 bg-white justify-around">
      <View className="flex h-1/3 items-center justify-center">
        <Image
          source={require("../assets/images/login-icon.png")}
          resizeMode="contain"
          style={{ width: 120, height: 120 }}
        />
      </View>

      <View className="space-y-2 px-4 w-full">
        <View>
          <Controller
            control={control}
            name="phone_number"
            render={({ field: { onChange, value } }) => (
              <Input
                label={
                  <Label className="text-gray-600 font-medium mb-1">
                    Phone Number
                  </Label>
                }
                onChangeText={onChange}
                value={value}
                placeholder="Phone Number"
              />
            )}
          />
          {errors.phone_number && (
            <Label type="xs" className="text-red-500">
              {errors.phone_number.message}
            </Label>
          )}
        </View>

        <View>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                label={
                  <Label className="text-gray-600 font-medium mb-1">
                    Password
                  </Label>
                }
                onChangeText={onChange}
                value={value}
                placeholder="Password"
                secureTextEntry
              />
            )}
          />
          {errors.password && (
            <Label type="xs" className="text-red-500">
              {errors.password.message}
            </Label>
          )}
        </View>

        <View>
          <Button
            onPress={handleSubmit(onLogin)}
            title="Login"
            isLoading={isLoading}
          />
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
