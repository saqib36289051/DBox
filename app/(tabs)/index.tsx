import LayoutContainer from '@/components/container/LayoutContainer';
import { View, FlatList } from 'react-native';
import data from "@/assets/json/donationTransactionList.json"
import Input from '@/components/ui/Input';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import ListItemCard from '@/components/dashboard/ListItemCard';
import ListHeader from '@/components/dashboard/ListHeader';
import ListFooter from '@/components/dashboard/ListFooter';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(data);

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
      <View className='py-1'>
        <Input
          icon={<Feather name="search" size={24} color="#0891b2" />}
          placeholder='Search for donation list'
          onChangeText={onFilterList}
          value={search}
        />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => item.transactionId.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ListItemCard {...item} />}
        ListHeaderComponent={<ListHeader />}
        ListFooterComponent={<ListFooter />}
        style={{
          marginBottom:50
        }}
      />

    </LayoutContainer>
  );
}
