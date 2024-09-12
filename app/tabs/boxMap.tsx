import { Feather } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

type Props = {}

const BoxMap = (props: Props) => {
    let dataMarkers = [
        {
            coordinate: {
                longitude: 70.36768661811948,
                latitude: 31.598928191991682,
            },
            title: 'DBox',
            description: 'DBox'
        }
    ]
    return (
        <View className="flex-1">
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
                    dataMarkers.map((marker) => (
                        <Marker
                            key={marker.title}
                            coordinate={marker.coordinate}
                            title={marker.title}
                            description={marker.description}
                            icon={require("@/assets/images/box.png")}
                        />
                    ))
                }
            </MapView>
        </View>
    )
}

export default BoxMap