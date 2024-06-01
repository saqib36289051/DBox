import LayoutContainer from '@/components/container/LayoutContainer';
import { View, FlatList } from 'react-native';
import data from "@/assets/json/donationListData.json"
import Input from '@/components/ui/Input';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import DonationListItem from '@/components/donationbox/DonationListItem';
import DonationListHeader from '@/components/donationbox/DonationListHeader';
import DonationListFooter from '@/components/donationbox/DonationListFooter';

export default function DonationBox() {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const onFilterList = (text: string) => {
    setSearch(text);
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
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
        keyExtractor={(item, index) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <DonationListItem {...item} />}
        ListHeaderComponent={<DonationListHeader />}
        ListFooterComponent={<DonationListFooter />}
        style={{
          marginBottom:50
        }}
      />
    </LayoutContainer>
  );
}
