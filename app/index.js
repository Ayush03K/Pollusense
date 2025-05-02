// app/welcome.js
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Pollusense</Text>
      <TouchableOpacity onPress={() => router.replace('/tabs')} style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0b0b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#b4dbdc',
    fontSize: 22,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#065f73',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
