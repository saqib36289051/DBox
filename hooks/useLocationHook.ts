import { useEffect, useState } from "react";
import * as Location from "expo-location";

export const useLocationHook = () => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    fetchLocation();
  }, []);

  async function fetchLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
  }

  return {
    latitude: location.latitude,
    longitude: location.longitude,
    fetchLocation,
  };
};
