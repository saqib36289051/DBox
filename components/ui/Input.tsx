import { styled } from 'nativewind';
import React, { useState } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
type InputProps = TextInputProps & {
  label: React.ReactNode;
  onChangeText: (text: string) => void;
  value: string;
}

const Input: React.FC<InputProps> = ({ onChangeText, value, ...props }) => {
  return (
    <>
      {props?.label && props?.label}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={props?.placeholder}
        className={` font-regular border border-gray-400 text-gray-600 focus:border-green-600 focus:bg-green-50 focus:text-gray-600 rounded-md px-2 py-2 text-base ${props?.className}`}
        {...props}
      />
    </>
  );
};

export default Input