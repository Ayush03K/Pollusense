import { Slot } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Slot />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignContent:"center",
    // marginTop:,
    backgroundColor: '#0b0b0b', 
  },
});
