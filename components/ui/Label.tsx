import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';
import React from 'react';

type Props = TextProps & {
  children: React.ReactNode;
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'sm' | 'xs';
  weight?: 'light' | 'regular' | 'medium' | 'thin' | 'black' | 'bold';
  className?: string;
  [key: string]: any;
  style?: TextStyle;
};

const Label = ({ className, type, weight, children, ...OtherProps }: Props) => {
  return (
    <Text
      style={OtherProps?.style}
      className={` ${className} ${implementType(type, weight)}`}
      {...OtherProps}>
      {children}
    </Text>
  );
};

let heading = {
  h1: 'text-6xl text-cyan-700',
  h2: 'text-5xl text-cyan-700',
  h3: 'text-4xl text-cyan-700',
  h4: 'text-3xl text-cyan-700',
  h5: 'text-2xl text-cyan-700',
  h6: 'text-xl text-cyan-700',
  p: 'text-base text-cyan-700',
  sm: 'text-sm text-cyan-700',
  xs: 'text-xs text-cyan-700',
};

let weightStyles = {
  light: 'font-light',
  regular: 'font-regular',
  medium: 'font-medium',
  thin: 'font-thin',
  black: 'font-black',
  bold: 'font-bold',
};

const implementType = (type: string = 'P', weight: string = 'regular') => {
  const textStyle = heading[type as keyof typeof heading]
  const weightStyle = weightStyles[weight as keyof typeof weightStyles]
  return `${textStyle} ${weightStyle}`;

};

export default Label;

const styles = StyleSheet.create({});
