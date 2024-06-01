import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import React from 'react';

type StyledButtonProps = TouchableOpacityProps &
  TextProps & {
    title: string;
    textStyle?: TextStyle;
    BtnStyle?: ViewStyle;
    className?: string;
    textClassName?: string;
    isLoading?: boolean;
  };

const Button: React.FC<StyledButtonProps> = ({
  title,
  textStyle,
  onPress,
  BtnStyle,
  className,
  textClassName,
  isLoading,
  ...OtherProps
}) => {
  return (
    <TouchableOpacity
      style={BtnStyle}
      onPress={onPress}
      className={`bg-green-600 rounded-md py-3 items-center justify-center ${className}`}
      {...OtherProps}>
      {
        isLoading ? <ActivityIndicator color={'#fff'} /> :
          <Text
            className={`text-white font-bold text-base ${textClassName}`}
            styale={textStyle}>
            {title}
          </Text>
      }
    </TouchableOpacity>
  );
};

export default Button;
