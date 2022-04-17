import { View, Button, Alert } from 'react-native';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';

const ImagePicker = () => {
  const [cameraPermission, requestPermission] = useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermission.status === PermissionStatus.UNDETERMINED) {
      const response = await requestPermission();

      return response.granted;
    }

    if (cameraPermission.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions',
        'You need to grant camera permission to use this app.'
      );
      return false;
    }
    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
  }
  return (
    <View>
      <View></View>
      <Button title="Take a photo" onPress={takeImageHandler} />
    </View>
  );
};

export default ImagePicker;
