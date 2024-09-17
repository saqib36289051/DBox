import Label from '@/components/ui/Label'
import { MapMarkerType } from '@/constants/Types'
import { useMapBoxListQuery } from '@/store/services/mapApi'
import React from 'react'
import { View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'



const BoxMap = () => {
    const { data, isLoading } = useMapBoxListQuery({})
    return (
        <View className="flex-1">
            {
                isLoading &&
                <View className='w-1/2 bg-white absolute z-50 top-12 self-center rounded-full shadow border border-gray-300' >
                    <Label type='sm' className='text-center py-1 text-gray-700'>Box Map Loading..</Label>
                </View>
            }
            <MapView
                className="w-full h-full"
                initialRegion={{
                    latitude: 31.598928191991682,
                    longitude: 70.36768661811948,
                    latitudeDelta: 12.848914110606888,
                    longitudeDelta: 7.229346223175526,
                }}
                showsUserLocation={true}
            >
                {
                    data?.results?.map((marker: MapMarkerType) => (
                        <Marker
                            key={marker?.id}
                            coordinate={{
                                latitude: parseFloat(marker?.coordinate?.latitude),
                                longitude: parseFloat(marker?.coordinate?.longitude),
                            }}
                            title={marker?.name}
                            description={marker?.complete_address}
                            icon={require("@/assets/images/box.png")}
                        />
                    ))
                }
            </MapView>
        </View>
    )
}

export default BoxMap