import { StyleSheet, Text, View } from 'react-native';
import React, { Suspense, forwardRef, useCallback, useMemo } from 'react';
import {
    BottomSheetBackdrop,
    BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

type Props = {
    children: React.ReactNode;
    ref: React.Ref<BottomSheetModal>;
    snapPoints?: string[];
};

type Ref = BottomSheetModal;

const BottomSheetModalReusable = forwardRef<Ref, Props>((props, ref) => {
    const defaultSnappoints = props?.snapPoints || ['50%'];
    const snapPoints = useMemo(() => defaultSnappoints, []);
    const renderBackdrop = useCallback(
        (
            props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
        ) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={0}
                appearsOnIndex={1}
                opacity={1}
            />
        ),
        [],
    );

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            enablePanDownToClose={true}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}>
            {props?.children}
        </BottomSheetModal>
    );
});

export default BottomSheetModalReusable;

const styles = StyleSheet.create({});
