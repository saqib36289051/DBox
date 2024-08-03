import { ActivityIndicator, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import LayoutContainer from '@/components/container/LayoutContainer'
import Label from '@/components/ui/Label'
import { useGetTransactionGraphDataQuery, useGetTransactionsQuery, useGetTransactionTotalsQuery } from '@/store/services/transactionApi'
import { AntDesign, FontAwesome, FontAwesome5, FontAwesome6, Ionicons } from '@expo/vector-icons'
import { LineChart } from 'react-native-gifted-charts'
import { formatNumberExtended, getDate, getTime } from '@/utils/utils'

type Props = {}

const DashboardScreen = (props: Props) => {
  const { data, isSuccess, isLoading, refetch, isFetching } = useGetTransactionTotalsQuery({})
  const { data: graph = {}, isLoading: isLoadingGraph } = useGetTransactionGraphDataQuery({})
  const { data: transactionList = {} } = useGetTransactionsQuery({})
  // i want to get the array of first 4 elements form the trasactionList

  const ffElementList = transactionList?.results?.slice(0, 3)

  const { width, height } = useWindowDimensions()
  const formattedData = graph?.line_data?.map((item) => ({
    value: item?.value,
    label: item?.label?.slice(0, 2)
  }))
  return (
    <LayoutContainer>
      <View className="flex-row gap-2  w-full">
        <View className='flex-1 rounded bg-white shadow-sm p-2 gap-y-1'>
          <AntDesign name="calendar" size={24} color="green" />
          <Label type='sm' weight='bold' >Current Month Calc.</Label>
          <Label type='h3' weight='medium' >{formatNumberExtended(data?.current_month_total)}</Label>
        </View>
        <View className='flex-1 rounded bg-white shadow-sm p-2 gap-y-1'>
          <FontAwesome name="calendar-check-o" size={24} color="green" />
          <Label type='sm' weight='bold' >Previous Month Calc.</Label>
          <Label type='h3' weight='medium' >{formatNumberExtended(data?.previous_month_total)}</Label>
        </View>
      </View>
      <View className="flex-row gap-2  w-full mt-1">
        <View className='flex-1 rounded bg-white shadow-sm p-2 justify-around'>
          <FontAwesome5 name="file-pdf" size={48} color="green" />
          <Label type='sm' weight='bold' >Download Pdf Report</Label>
        </View>
        <View>
          <View className='flex rounded bg-white shadow-sm p-2 mb-1'>
            <Ionicons name="add" size={24} color="green" />
            <Label type='xs' weight='medium' >Add New Box</Label>
          </View>

          <View className='flex rounded bg-white shadow-sm p-2'>
            <FontAwesome6 name="money-bill-transfer" size={24} color="green" />
            <Label type='xs' weight='medium' >Add New Transaction</Label>
          </View>
        </View>
      </View>
      <View
        style={{ width: width - 40 }}
        className="mt-3 bg-white rounded shadow-sm p-2">
        <Label type='sm' weight='bold' className='mb-3' >Weekly Transaction Graph</Label>
        {
          isLoadingGraph && <ActivityIndicator color={'green'} size={'large'} />

        }
        {
          formattedData?.length > 0 &&
          <LineChart
            data={formattedData}
            width={width - 110}
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
          <View className='flex-row gap-x-2 items-center mr-4'>
            <Label type='sm' weight='bold'>See All</Label>
            <FontAwesome6 name="arrow-right-long" size={16} color="green" />
          </View>
        </View>

        {
          ffElementList?.map((i, index) => (
            <View key={i?.id} className={`${index == 1 ? 'bg-sky-200' : 'bg-green-200'} rounded-md p-2 my-1 flex-row justify-between`}>
              <View>
                <Label type='sm' weight='medium' className={`${index == 1 ? 'text-sky-700' : 'text-green-700'}`}>{i?.name}</Label>
                <View className='flex-row gap-x-2'>
                  <Label type='xs' weight='regular' className={`${index == 1 ? 'text-sky-700' : 'text-green-700'}`}>{getDate(i?.created_at)}</Label>
                  <Label type='xs' weight='regular' className={`${index == 1 ? 'text-sky-700' : 'text-green-700'}`}>{getTime(i?.created_at)}</Label>
                </View>
              </View>
              <View className="w-1/4 items-center">
                <View className={`${index == 1 ? "bg-sky-400" : "bg-green-400"} rounded-full w-full flex items-center justify-center h-5`}>
                  <Label type='xs' weight='regular' className={`${index == 1 ? 'text-sky-700' : 'text-green-700'}`}>Rs. {i?.amount}</Label>
                </View>
                <Label type='xs' weight='medium' className={`${index == 1 ? 'text-sky-700' : 'text-green-700'}`}>Type. {i?.donation_type}</Label>
              </View>
            </View>
          ))
        }


      </View>
    </LayoutContainer >
  )
}

export default DashboardScreen