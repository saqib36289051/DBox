import React, { Children } from 'react'
import { View } from 'react-native';

type Props = {
    children: React.ReactNode;
}

const LayoutContainer = (props: Props) => {
    return (
        <View className="pt-10 px-4 mb-12">
            {props.children}
        </View>
    )
}

export default LayoutContainer