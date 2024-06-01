import { styled } from 'nativewind';
import React, { useState } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
type InputProps = TextInputProps & {
  icon?: React.ReactNode;
  label?: React.ReactNode;
  onChangeText: (text: string) => void;
  value: string;
}

const Input: React.FC<InputProps> = ({ onChangeText, value, ...props }) => {
  return (
    <>
      {props?.label && props?.label}

      {props?.icon ? (
        <View className="flex-row items-center border border-gray-400 text-gray-600 focus:border-cyan-600 focus:text-gray-600 rounded-md px-2 py-2 text-base">
          {props?.icon}
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={props?.placeholder}
            className="flex-1 ml-2"
            {...props}
          />
        </View>
      ) : (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={props?.placeholder}
          className={` font-regular border border-gray-400 text-gray-600 focus:border-cyan-600 focus:text-gray-600 rounded-md px-2 py-2 text-base ${props?.className}`}
          {...props}
        />
      )
      }
    </>
  );
};

export default Input