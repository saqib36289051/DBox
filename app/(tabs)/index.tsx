import { Link } from 'expo-router';
import { Image, StyleSheet, Platform, View, Text } from 'react-native';
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Link href="/login">Hello World</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
});
