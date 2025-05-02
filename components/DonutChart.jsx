// components/DonutChart.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PieChart from 'react-native-pie-chart';

const DonutChart = ({ data = [] }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackText}>No data available</Text>
      </View>
    );
  }

  const values = data.map(d => Number(d.value));
  const colors = data.map(d => d.color);

  // Validate: all values must be numbers, all colors must be defined
  const isValid = values.every(v => typeof v === 'number') && colors.every(c => typeof c === 'string');

  if (!isValid) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackText}>Invalid data</Text>
      </View>
    );
  }

  return (
    <PieChart
      widthAndHeight={200}
      series={values}
      sliceColor={colors}
      doughnut={true}
      coverRadius={0.6}
      coverFill={'#000'}
    />
  );
};

const styles = StyleSheet.create({
  fallback: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    color: '#666',
  },
});

export default DonutChart;
