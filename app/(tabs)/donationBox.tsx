import LayoutContainer from '@/components/container/LayoutContainer';
import { View, FlatList, useColorScheme } from 'react-native';
import data from "@/assets/json/donationListData.json"
import Input from '@/components/ui/Input';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import DonationListItem from '@/components/donationbox/DonationListItem';
import DonationListHeader from '@/components/donationbox/DonationListHeader';
import DonationListFooter from '@/components/donationbox/DonationListFooter';
import Button from '@/components/ui/Button';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function DonationBox() {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const router = useRouter()
  const colorScheme = useColorScheme()

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
      <View className='py-1 flex-row gap-2'>
        <View className='flex-1'>
          <Input
            icon={<Feather name="search" size={24} color={Colors[colorScheme ?? 'light'].icon} />}
            placeholder='Search for Donation Box'
            onChangeText={onFilterList}
            value={search}
          />
        </View>
        <Button className='bg-green-700 py-1 px-4' iconBtn={<MaterialIcons name="add" size={24} color="white" />} onPress={() => router.navigate("/form/addBox")} />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <DonationListItem {...item} />}
        ListHeaderComponent={<DonationListHeader />}
        ListFooterComponent={<DonationListFooter />}
        style={{
          marginBottom: 50
        }}
      />
    </LayoutContainer>
  );
}
