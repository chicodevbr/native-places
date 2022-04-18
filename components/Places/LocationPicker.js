import { StyleSheet, View, Alert } from 'react-native';

import OutlinedButton from '../UI/OutlinedButton';
import { GlobalStyles } from '../../constants/styles';
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from 'expo-location';

const LocationPicker = () => {
  const [locationPermission, requestPermission] = useForegroundPermissions();

  async function verifyPermissions() {
    if (locationPermission.status === PermissionStatus.UNDETERMINED) {
      const response = await requestPermission();

      return response.granted;
    }

    if (locationPermission.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions',
        'You need to grant location permission to use this app.'
      );
      return false;
    }
    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    console.log(location);
  }
  function pickOnMapHandler() {}
  return (
    <View>
      <View style={styles.mapPreview}></View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
