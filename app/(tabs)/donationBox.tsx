import LayoutContainer from '@/components/container/LayoutContainer';
import { View, FlatList, useColorScheme, RefreshControl } from 'react-native';
import Input from '@/components/ui/Input';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import DonationListItem from '@/components/donationbox/DonationListItem';
import DonationListHeader from '@/components/donationbox/DonationListHeader';
import DonationListFooter from '@/components/donationbox/DonationListFooter';
import Button from '@/components/ui/Button';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useGetBoxQuery } from '@/store/services/boxApi';

export default function DonationBox() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const router = useRouter()
  const colorScheme = useColorScheme()
  const { data, error, isLoading, refetch, isFetching } = useGetBoxQuery({
    search: debouncedSearch
  })
  console.log("🚀 ~ DonationBox ~ data:", data)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(search);
      refetch({ force: true })
    }, 500)

    return () => clearTimeout(timerId);
  }, [search]);


  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <LayoutContainer>
      <View className='py-1 flex-row gap-2'>
        <View className='flex-1'>
          <Input
            icon={<Feather name="search" size={24} color={Colors[colorScheme ?? 'light'].icon} />}
            placeholder='Search for Donation Box'
            onChangeText={(e)=>handleSearch(e)}
            value={search}
          />
        </View>
        <Button className='bg-green-700 py-1 px-4' iconBtn={<MaterialIcons name="add" size={24} color="white" />} onPress={() => router.navigate("/form/addBox")} />
      </View>
      <FlatList
        data={data?.results}
        keyExtractor={(item, index) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <DonationListItem {...item} />}
        ListHeaderComponent={<DonationListHeader />}
        ListFooterComponent={<DonationListFooter />}
        style={{
          // marginBottom: 50,
          // backgroundColor:'red',
          // height: '100%'
        }}
        refreshControl={<RefreshControl
          refreshing={isFetching}
          onRefresh={refetch}
        />
        }
      />
    </LayoutContainer>
  );
}
