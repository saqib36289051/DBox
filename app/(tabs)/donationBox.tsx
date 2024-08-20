import React from 'react';
import LayoutContainer from '@/components/container/LayoutContainer';
import { View, FlatList, useColorScheme, RefreshControl, Platform } from 'react-native';
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
import { DonationTransactinList } from '@/constants/Types';

export default function DonationBox() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<DonationTransactinList[]>([])
  const [bottomLoader, setBottomLoader] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const router = useRouter()
  const colorScheme = useColorScheme()
  const { data: initialData, error, isLoading, refetch, isFetching } = useGetBoxQuery({
    search: debouncedSearch,
    page: currentPage,
    page_size: 10,
  })

  // useEffect(() => {
  //   const timerId = setTimeout(() => {
  //     setDebouncedSearch(search);
  //     refetch({ force: true })
  //   }, 500)

  //   return () => clearTimeout(timerId);
  // }, [search]);

  useEffect(() => {
    if (initialData) {
      if (currentPage === 1) {
        setData(initialData?.results);
      } else {
        setData((prevItems) => [...prevItems, ...initialData.results]);
      }
      setTotalCount(initialData.count);
    }
  }, [initialData]);


  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleReachedEnd = () => {
    alert("")
    // if (data.length >= totalCount) {
    //   return;
    // } else {
    //   if (!isFetching) {
    //     setBottomLoader(true);
    //     setCurrentPage((prevPage) => prevPage + 1);
    //     refetch().finally(() => setBottomLoader(false));
    //   }
    // }
  };

  return (
    <LayoutContainer>
      <View className='py-1 flex-row gap-2'>
        <View className='flex-1'>
          <Input
            icon={<Feather name="search" size={24} color={Colors[colorScheme ?? 'light'].icon} />}
            placeholder='Search for Donation Box'
            onChangeText={(e) => handleSearch(e)}
            value={search}
          />
        </View>
        <Button className='bg-green-700 py-1 px-4' iconBtn={<MaterialIcons name="add" size={24} color="white" />} onPress={() => router.navigate("/form/addBox")} />
      </View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <DonationListItem {...item} />}
        ListHeaderComponent={<DonationListHeader />}
        ListFooterComponent={<DonationListFooter reload={refetch} isShowReloadBtn={data?.length > 0} />}
        style={{
          // marginBottom: 50,
          // backgroundColor:'red',
          // height: '100%'
        }}
        onEndReached={handleReachedEnd}
        onEndReachedThreshold={0.7} // Adjust the threshold
        scrollEventThrottle={16} // Add this prop
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
        initialNumToRender={10} // Adjust this if needed
      />
    </LayoutContainer>
  );
}
