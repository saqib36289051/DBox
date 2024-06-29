import React from 'react';
import LayoutContainer from '@/components/container/LayoutContainer';
import { View, FlatList, Modal, Platform, StyleSheet, Text, useColorScheme } from 'react-native';
import data from "@/assets/json/donationTransactionList.json"
import Input from '@/components/ui/Input';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import ListItemCard from '@/components/dashboard/ListItemCard';
import ListHeader from '@/components/dashboard/ListHeader';
import ListFooter from '@/components/dashboard/ListFooter';

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import Button from '@/components/ui/Button';
import TransactionIcon from '@/components/navigation/TransactionIcon';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

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

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const router = useRouter()
  const colorScheme = useColorScheme()

  const handlePdfView = async () => {
    const { uri } = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };



  const onFilterList = (text: string) => {
    setSearch(text);
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.custodianName ? item.custodianName.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <LayoutContainer>
      <View className='py-1 flex-row gap-2'>
        <View className='flex-1'>
          <Input
            icon={<Feather name="search" size={24} color={Colors[colorScheme ?? 'light'].icon} />}
            placeholder='Search for transaction'
            onChangeText={onFilterList}
            value={search}
          />
        </View>
        <Button className='bg-green-700 py-1 px-2' iconBtn={<TransactionIcon width={38} height={38} />} onPress={() => router.navigate("/form/addTransaction")} />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => item.transactionId.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ListItemCard handlePdfPrint={handlePdfView} handlePdfShare={handlePdfView} {...item} />}
        ListHeaderComponent={<ListHeader />}
        ListFooterComponent={<ListFooter />}
        style={{
          marginBottom: 50
        }}
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