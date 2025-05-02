import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

export default function MetricCard({ title, value, status, onPress }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Low':
        return '#4CAF50';
      case 'Moderate':
        return '#FFC107';
      case 'High':
        return '#F44336';
      default:
        return '#999';
    }
  };
  
  return (
    <TouchableOpacity  onPress={onPress} style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={{display:"flex",alignItems:"space-evenly"}}>
        <Text style={styles.value}>{value}</Text>
        <Text style={{ color: getStatusColor(status), fontWeight: 'bold' }}>{status}</Text>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 12,
    flex: 1,
    display:'flex',
    flexDirection:'row',
    marginHorizontal: 5,
    justifyContent:"space-between"
  },
  title: {
    color: '#b4dbdc',
    fontSize: 16,
  },
  value: {
    color: '#fff',
    fontSize: 24,
    marginVertical: 8,
  },
  status: {
    
    fontSize: 14,
  },
});
