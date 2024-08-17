import React, { useEffect } from 'react';
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
    const [page, setPage] = useState(1);
    const { data: initialData, error, isLoading, refetch, isFetching } = useGetTransactionsQuery({
        page: page,
        page_size: 20,
        search: search
    })
    const router = useRouter()
    const colorScheme = useColorScheme()

    useEffect(() => {
        if (initialData) {
            if (page === 1) {
                setData(initialData?.results);
            } else {
                setData((prevItems) => [...prevItems, ...initialData.results]);
            }
            setTotalCount(initialData?.count);
        }
    }, [initialData]);

    const debouncedSearch = React.useCallback(
        _.debounce((searchQuery: string) => handleSearch(searchQuery), 500),
        []
    );

    const handleSearch = (searchQuery: string) => {
        setPage(1);
        setSearch(searchQuery);
        refetch();
    };

    const handleReachedEnd = () => {
        if (data.length >= totalCount) {
            return;
        } else {
            if (!isFetching) {
                setBottomLoader(true);
                setPage((prevPage) => prevPage + 1);
                refetch().finally(() => setBottomLoader(false));
            }
        }
    };


    const handlePdfView = async (name: string, mobile_number: string, amount: number, donation_type: string) => {
        const text =
            "[C]<u><font size='big'>JAMIA NIZAM-E-MUSTAFA</font></u>\n" +
            "[L]\n" +
            `[L]<b>NAME:</b>[R]${name}\n` +
            `[L]<b>MOBILE:</b>[R]${mobile_number}\n` +
            `[L]<b>Donation:</b>[R]${amount}\n` +
            `[L]<b>Collection Mode:</b>[R]${donation_type}\n` +
            "[L]\n" +
            `[L]<b><u>Jamia Niazame Mustafa</u></b> will use your funds wherever it deems fit for religious and charitable purposes.\n` +
            "[C]<qrcode size='20'>JAMIA NIZAM-E-MUSTAFA</qrcode>";
        await printReceipt(text)
    };

    return (
        <LayoutContainer>
            <View className='py-1 flex-row gap-2'>
                <View className='flex-1'>
                    <Input
                        icon={<Feather name="search" size={24} color={Colors[colorScheme ?? 'light'].icon} />}
                        placeholder='Search for transaction'
                        onChangeText={(e) => handleSearch(e)}
                        value={search}
                    />
                </View>
                <Button className='bg-green-700 py-1 px-2' iconBtn={<TransactionIcon width={38} height={38} />} onPress={() => router.navigate("/form/addTransaction")} />
            </View>
            {isFetching || isLoading && <ActivityIndicator className="mt-4" color={"green"} />}
            <FlatList
                data={data}
                keyExtractor={(item, index) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <ListItemCard handlePdfPrint={handlePdfView} handlePdfShare={handlePdfView} {...item} />}
                ListHeaderComponent={<ListHeader />}
                ListFooterComponent={<>
                    {bottomLoader && <ActivityIndicator className="mt-4" color={"green"} />}
                    {data.length === 0 && !isLoading && !isFetching && <Text className='text-center text-green-700 text-xl mt-4'>No Transaction Found</Text>}
                </>
                }
                style={{
                    height: '100%'
                }}
                onEndReached={handleReachedEnd}
                onEndReachedThreshold={0.5}
                refreshControl={<RefreshControl
                    refreshing={isFetching}
                    onRefresh={refetch}
                />
                }
                initialNumToRender={20}
                maxToRenderPerBatch={20}
                windowSize={6}
                removeClippedSubviews={Platform.OS === 'android'}
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