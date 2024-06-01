import {StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import React from 'react';

type Props = TextProps & {
  children: React.ReactNode;
  type?: 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6' | 'P' | 'SM' | 'XS';
  className?: string;
  [key: string]: any;
  style?: TextStyle;
};

const Label = ({className, type, children, ...OtherProps}: Props) => {
  return (
    <Text
      style={OtherProps?.style}
      className={` ${className} ${implementType(type)}`}
      {...OtherProps}>
      {children}
    </Text>
  );
};

let heading = {
  H1: 'text-6xl text-primary-500',
  H2: 'text-5xl text-primary-500',
  H3: 'text-4xl text-primary-500',
  H4: 'text-3xl text-primary-500',
  H5: 'text-2xl text-primary-500',
  H6: 'text-xl text-primary-500',
  P: 'text-base text-primary-500 font-sans_regular',
  SM: 'text-sm text-primary-500',
  XS: 'text-xs text-primary-500',
};

const implementType = (type: string = '') => {
  if (type) {
    return heading[type as keyof typeof heading];
  }
  return heading['P'];
};

export default Label;

const styles = StyleSheet.create({});
