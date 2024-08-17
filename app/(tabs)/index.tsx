import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useEffect } from 'react'
import LayoutContainer from '@/components/container/LayoutContainer'
import Label from '@/components/ui/Label'
import { useGetDownloadReportMutation, useGetTransactionGraphDataQuery, useGetTransactionsQuery, useGetTransactionTotalsQuery } from '@/store/services/transactionApi'
import { AntDesign, Feather, FontAwesome, FontAwesome5, FontAwesome6, Ionicons } from '@expo/vector-icons'
import { LineChart } from 'react-native-gifted-charts'
import { formatNumberExtended, getCurrentMonthStartAndEnd, getDate, getTime } from '@/utils/utils'
import { Slot, useRouter } from 'expo-router'
import useAuthHook from '@/hooks/useAuthHook'
import TopBar from '@/components/ui/TopBar'

type Props = {}

const DashboardScreen = (props: Props) => {
  const { data, isSuccess, isLoading, refetch, isFetching } = useGetTransactionTotalsQuery({})
  const { data: graph = {}, isLoading: isLoadingGraph, refetch: graphDataRefetch } = useGetTransactionGraphDataQuery({})
  const [getDownloadReport, { isLoading: isDownloading }] = useGetDownloadReportMutation();
  const { data: transactionList = {}, refetch: transactionListLatest } = useGetTransactionsQuery({})
  const { width, height } = useWindowDimensions()
  const router = useRouter()
  const user = useAuthHook()

  const ffElementList = transactionList?.results?.slice(0, 3)

  const formattedData = graph?.line_data?.map((item) => ({
    value: item?.value,
    label: item?.label?.slice(0, 2)
  }))

  useEffect(() => {
    refetch()
    graphDataRefetch()
    transactionListLatest()
  }, [])

  const downloadPdfReport = async () => { }

  const menuItems = [
    {
      label: 'Download Report',
      icon: <FontAwesome name="file-pdf-o" size={16} color="green" />,
      onPress: () => router.push('/download-report')
    },
    {
      label: 'About Us',
      icon: <Feather name="info" size={16} color="green" />,
      onPress: () => router.push('/download-report')
    },
  ]

  return (
    <>
      <TopBar isShowMenu={true} menuItems={menuItems} />
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View className='pt-3 px-3'>
          <View className="flex-row gap-2 gap-x-2  w-full">
            <View className='flex-1 rounded bg-white shadow-sm p-2 gap-y-1'>
              <AntDesign name="calendar" size={16} color="orange" />
              <Label type='xs' weight='medium' >Current Month Calc.</Label>
              <Label type='sm' weight='bold' >Rs. {data?.current_month_total}</Label>
            </View>
            <View className='flex-1 rounded bg-white shadow-sm p-2 gap-y-1'>
              <Ionicons name="calendar-number-outline" size={16} color="orange" />
              <Label type='xs' weight='medium' >Previous Month Calc.</Label>
              <Label type='sm' weight='bold' >Rs. {data?.previous_month_total}</Label>
            </View>
          </View>
          <View className="flex-row gap-1 gap-x-2  w-full mt-1">
            <View className='flex-1 rounded bg-white shadow-sm p-2 gap-y-1'>
              <Ionicons name="today-outline" size={16} color="green" />
              <Label type='xs' weight='medium' >Today Calculation</Label>
              <Label type='h6' weight='bold'>Rs. {data?.daily_total}</Label>
            </View>
            <View>
              <Pressable
                onPress={() => router.navigate("/form/addBox")}
                className='flex rounded bg-white shadow-sm p-2 mb-1'>
                <Ionicons name="add" size={16} color="green" />
                <Label type='xs' weight='regular' >Add New Box</Label>
              </Pressable>

              <Pressable
                onPress={() => router.navigate("/form/addTransaction")}
                className='flex rounded bg-white shadow-sm p-2'>
                <FontAwesome6 name="money-bill-transfer" size={16} color="green" />
                <Label type='xs' weight='regular' >Add New Transaction</Label>
              </Pressable>
            </View>
          </View>
          <View
            style={{ width: width - 32 }}
            className="mt-2 bg-white rounded shadow-sm p-2">
            <Label type='sm' weight='bold' className='mb-3' >Weekly Transaction Graph</Label>
            {
              isLoadingGraph && <ActivityIndicator color={'green'} size={'large'} />

            }
            {
              formattedData?.length > 0 &&
              <LineChart
                data={formattedData}
                width={width - 110}
                // height={height / 4}
                curved
                initialSpacing={6}
                color="green"
                dataPointsColor={'darkgreen'}
                yAxisColor="green"
                xAxisColor={'green'}
                yAxisTextStyle={{ color: 'darkgreen' }}
                xAxisLabelTextStyle={{ color: 'darkgreen' }}
                hideRules
              />
            }
          </View>

          <View className="mt-5">
            <View className='flex-row justify-between mb-1'>
              <Label type='sm' weight='bold'>Recent Transactions</Label>
              <Pressable
                onPress={() => router.navigate("/(tabs)/transaction")}
                className='flex-row gap-x-2 items-center mr-4'>
                <Label type='sm' weight='bold'>See All</Label>
                <FontAwesome6 name="arrow-right-long" size={16} color="green" />
              </Pressable>
            </View>

            {
              ffElementList?.map((i, index) => (
                <View key={i?.id}
                  className={`${index == 1
                    ? 'bg-sky-200'
                    : index == 2
                      ? "bg-red-200"
                      : 'bg-green-200'} rounded-md p-2 my-1 flex-row justify-between`}>
                  <View>
                    <Label type='sm' weight='medium'
                      className={`${index == 1
                        ? 'text-sky-700'
                        : index == 2
                          ? 'text-red-700 '
                          : 'text-green-700'}`}>{i?.name}</Label>
                    <View className='flex-row gap-x-2'>
                      <Label type='xs' weight='regular'
                        className={`${index == 1
                          ? 'text-sky-700'
                          : index == 2
                            ? 'text-red-700 '
                            : 'text-green-700'}`}>{getDate(i?.created_at)}</Label>
                      <Label type='xs' weight='regular'
                        className={`${index == 1
                          ? 'text-sky-700'
                          : index == 2
                            ? 'text-red-700 '
                            : 'text-green-700'}`}>{getTime(i?.created_at)}</Label>
                    </View>
                  </View>
                  <View className="w-1/4 items-center">
                    <View
                      className={`${index == 1
                        ? 'bg-sky-400'
                        : index == 2
                          ? 'bg-red-400 '
                          : 'bg-green-400'} rounded-full w-full flex items-center justify-center h-5`}>
                      <Label type='xs' weight='regular'
                        className={`${index == 1
                          ? 'text-sky-700'
                          : index == 2
                            ? 'text-red-700 '
                            : 'text-green-700'}`}>Rs. {i?.amount}</Label>
                    </View>
                    <Label type='xs' weight='medium'
                      className={`${index == 1
                        ? 'text-sky-700'
                        : index == 2
                          ? 'text-red-700 '
                          : 'text-green-700'}`}>Type. {i?.donation_type}</Label>
                  </View>
                </View>
              ))
            }


          </View>
        </View >
      </ScrollView>

    </>
  )
}

export default DashboardScreen