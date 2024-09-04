import React, { useCallback, useEffect } from 'react';
import LayoutContainer from '@/components/container/LayoutContainer';
import { View, FlatList, Modal, Platform, StyleSheet, Text, useColorScheme, RefreshControl, Alert, Pressable, ActivityIndicator } from 'react-native';
import Input from '@/components/ui/Input';
import { Feather } from '@expo/vector-icons';
import _ from 'lodash';
import { useState } from 'react';
import ListItemCard from '@/components/dashboard/ListItemCard';
import ListHeader from '@/components/dashboard/ListHeader';
import ListFooter from '@/components/dashboard/ListFooter';
import * as Sharing from 'expo-sharing';
import Button from '@/components/ui/Button';
import TransactionIcon from '@/components/navigation/TransactionIcon';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useGetTransactionsQuery } from '@/store/services/transactionApi';
import { printReceipt } from '@/utils/utils';
import { TransactionListType } from '@/constants/Types';
import Label from '@/components/ui/Label';

const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Hello Expo!
    </h1>
    <img
      src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
      style="width: 90vw;" />
  </body>
</html>
`;

export default function TransactionScreen() {
    const [data, setData] = useState<TransactionListType[]>([])
    const [bottomLoader, setBottomLoader] = useState(false)
    const [totalCount, setTotalCount] = useState(0)
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1)
    const { data: initialData, error, isLoading, refetch, isFetching } = useGetTransactionsQuery({
        page: currentPage,
        page_size: 20,
        search: search
    })
    const router = useRouter()
    const colorScheme = useColorScheme()

    useEffect(() => {
        if (initialData) {
            if (currentPage === 1) {
                setData(initialData.results);
            } else {
                setData((prevItems) => [...prevItems, ...initialData.results]);
            }
            setBottomLoader(false)
            setTotalCount(initialData.count);
        }
    }, [initialData]);


    const debouncedSearch = useCallback(
        _.debounce((searchQuery: string) => handleSearch(searchQuery), 500),
        []
    );

    const handleSearch = (value: string) => {
        setCurrentPage(1);
        setSearch(value);
        refetch()
    };

    function handleChange(e: string) {
        setSearch(e);
        debouncedSearch(e);
    }

    const handleReachedEnd = () => {
        if (data.length >= totalCount) {
            return;
        } else {
            if (!isFetching) {
                setBottomLoader(true);
                setCurrentPage((prevPage) => prevPage + 1);
                refetch().finally(() => setBottomLoader(false));
            }
        }
    };


    const handlePdfView = async (id: string, name: string, mobile_number: string, amount: number, donation_type: string) => {
        const text =
            "[C]-------------------------------[C]\n" +
            "[C]<b><font size='normal'>JAMIA NIZAM-E-MUSTAFA</font></b>\n" +
            "[C]<b><font size='normal'>(Registered)</font></b>\n" +
            "[C]<font size='normal'>Thatthi Daudkhel, Tehsil & Disst: Mianwali</font>\n" +
            "[C]<font size='normal'>0306-8642243</font>\n" +
            "[C]<font size='normal'>Email: info@nizamemustafa.com</font>\n" +
            "[C]-------------------------------[C]\n" +
            `[L]<b>NAME:</b>[R]${name}\n` +
            `[L]<b>MOBILE:</b>[R]${mobile_number}\n` +
            `[L]<b>Donation:</b>[R]${amount}\n` +
            `[L]<b>Collection Mode:</b>[R]${donation_type}\n` +
            "[C]-------------------------------[C]\n" +
            `[L]<b><u>Mufti M Junaind Raza Khan Qadri</u></b>[L]\n` +
            `[L]Aap k channdy ko kisi bhi jaiz, deeni, islahi, rohani aur bhalai k kam mein kharch kia jaye ga[L]\n` +
            `<qrcode size='20'>JAMIA NIZAM-E-MUSTAFA</qrcode>`
        await printReceipt(text)
    };



    return (
        <LayoutContainer>
            <View className='py-1 flex-row gap-2'>
                <View className='flex-1'>
                    <Input
                        icon={<Feather name="search" size={24} color={Colors[colorScheme ?? 'light'].icon} />}
                        placeholder='Search for transaction'
                        onChangeText={(e) => handleChange(e)}
                        value={search}
                    />
                </View>
                <Button className='bg-green-700 py-1 px-2' iconBtn={<TransactionIcon width={38} height={38} />} onPress={() => router.navigate("/form/addTransaction")} />
            </View>
            <FlatList
                data={data}
                keyExtractor={(item, index) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <ListItemCard handlePdfPrint={handlePdfView} handlePdfShare={handlePdfView} {...item} />
                )}
                ListHeaderComponent={<ListHeader />}
                ListFooterComponent={
                    <View className='h-10 flex justify-center'>
                        {bottomLoader && <ActivityIndicator color={Colors[colorScheme ?? 'light'].tint} />}
                    </View>
                }
                onEndReached={handleReachedEnd}
                // onEndReachedThreshold={0.7} // Adjust the threshold
                // scrollEventThrottle={16} // Add this prop
                // refreshControl={
                //     <RefreshControl refreshing={isFetching} onRefresh={refetch} />
                // }
                initialNumToRender={20} // Adjust this if needed
            />

        </LayoutContainer>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        flexDirection: 'column',
        padding: 8,
    },
    spacer: {
        height: 8,
    },
    printer: {
        textAlign: 'center',
    },
});