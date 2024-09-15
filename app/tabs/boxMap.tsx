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
            title: 'Testing Box',
            description: 'Testing Box Deployed'
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
                    dataMarkers.map((marker, index) => (
                        <Marker
                            key={index}
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