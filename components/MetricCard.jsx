import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function MetricCard({ title, value, onPress }) {
  const params = useLocalSearchParams();

  const getStatus = (gas, val) => {
    switch (gas.toUpperCase()) {
  case 'CO': // Carbon Monoxide in ppm
    if (val <= 1.0) return 'Compliant';
    if (val <= 4.4) return 'Near Limit';
    if (val <= 9.0) return 'Non-Compliant';
    return 'Hazardous';

  case 'NH3': // Ammonia in ppm
    if (val <= 17.5) return 'Compliant';
    if (val <= 45.0) return 'Near Limit';
    if (val <= 75.5) return 'Non-Compliant';
    return 'Hazardous';

  case 'CO2': // Carbon Dioxide in ppm
    if (val <= 1000) return 'Compliant';
    if (val <= 1500) return 'Near Limit';
    if (val <= 3000) return 'Non-Compliant';
    return 'Hazardous';

  case 'NO2': // Nitrogen Dioxide in ppm
    if (val <= 10.03) return 'Compliant';
    if (val <= 40.05) return 'Near Limit';
    if (val <= 70.1) return 'Non-Compliant';
    return 'Hazardous';

  case 'BENZENE': // ppm
    if (val <= 12.01) return 'Compliant';
    if (val <= 40.05) return 'Near Limit';
    if (val <= 80.2) return 'Non-Compliant';
    return 'Hazardous';

  case 'TOLUENE': // ppm
    if (val <= 10.1) return 'Compliant';
    if (val <= 40.3) return 'Near Limit';
    if (val <= 71.0) return 'Non-Compliant';
    return 'Hazardous';

  case 'H2': // Hydrogen in ppm (leaks in fuel cell vehicles)
    if (val <= 50) return 'Compliant';
    if (val <= 100) return 'Near Limit';
    if (val <= 300) return 'Non-Compliant';
    return 'Hazardous';

  case 'LPG': // ppm
    if (val <= 50) return 'Compliant';
    if (val <= 100) return 'Near Limit';
    if (val <= 500) return 'Non-Compliant';
    return 'Hazardous';

  case 'SMOKE': // general smoke index in ppm
    if (val <= 100) return 'Compliant';
    if (val <= 150) return 'Near Limit';
    if (val <= 300) return 'Non-Compliant';
    return 'Hazardous';

  default:
    return 'Unknown';
}
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Compliant':
        return '#4CAF50';
      case 'Near Limit':
        return '#FFC107';
      case 'Non-Compliant':
        return '#F44336';
      case 'Hazardous':
        return '#9C27B0';
      default:
        return '#999';
    }
  };

  const numericValue = parseFloat(value);
  const status = getStatus(title, numericValue);

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={{ display: 'flex', alignItems: 'space-evenly' }}>
        <Text style={styles.value}>{numericValue.toFixed(3)}</Text>
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
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 5,
    justifyContent: 'space-between',
  },
  title: {
    color: '#b4dbdc',
    fontSize: 20,
  },
  value: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 8,
  },
  status: {
    fontSize: 14,
  },
});
