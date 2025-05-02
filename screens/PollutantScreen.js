import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function PollutantDetail() {
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [39, 47, 87, 39, 135, 48],
        color: () => 'yellow', // optional
        strokeWidth: 2,
      },
    ],
    legend: ['PM2.5 Levels'],
  };
  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [85, 102, 97, 88, 135, 91], // average values
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backArrow}>{'\u2190'}</Text>
      </TouchableOpacity>

      {/* Summary Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>PM2.5 Summary</Text>
          <Text style={styles.updatedText}>Last Updated: <Text style={styles.timeText}>2:30 PM</Text></Text>
        </View>

        <View style={styles.row}>
          <View style={styles.statBox}>
            <Text style={styles.label}>Current</Text>
            <Text style={styles.value}>115 <Text style={styles.green}>↑ 12.5%</Text></Text>
            <Text style={styles.unit}>µg/m³</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.label}>24h Average</Text>
            <Text style={styles.value}>112 <Text style={styles.green}>↑ 8.2%</Text></Text>
            <Text style={styles.unit}>µg/m³</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.statBox}>
            <Text style={styles.label}>Today's High</Text>
            <Text style={styles.green}>138  <Text style={styles.timeText}>2:30 PM</Text></Text>
            <Text style={styles.unit}>µg/m³</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.label}>Today's Low</Text>
            <Text style={styles.red}>87  <Text style={styles.timeText}>6:00 AM</Text></Text>
            <Text style={styles.unit}>µg/m³</Text>
          </View>
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: 'lightgreen' }]} />
            <Text style={styles.legendText}>Below Threshold</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: 'red' }]} />
            <Text style={styles.legendText}>Above Threshold</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: 'white' }]} />
            <Text style={styles.legendText}>Threshold: 100 µg/m³</Text>
          </View>
        </View>
      </View>

      {/* Weekly Summary */}
      <View style={styles.weekRow}>
        {['M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <View key={i} style={styles.dayBubble}>
            <Text style={styles.dayValue}>{[39, 47, 87, 39, 135, 48][i]}</Text>
            <Text style={styles.dayLabel}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Chart Filters */}
      <View style={styles.filterRow}>
        <Text style={styles.sectionTitle}>Air Quality Trends</Text>
        <View style={styles.toggleGroup}>
          <Text style={[styles.toggleButton, styles.active]}>Line</Text>
          <Text style={styles.toggleButton}>Bar</Text>
        </View>
      </View>

      <View style={styles.toggleGroupAlt}>
        {['All', 'Min', 'Max', 'Average'].map((label, i) => (
          <Text key={i} style={[styles.altButton, i === 0 && styles.activeAlt]}>{label}</Text>
        ))}
      </View>

      {/* Actual Chart */}
      <LineChart
        data={chartData}
        width={screenWidth - 30}
        height={220}
        yAxisSuffix="µg"
        chartConfig={{
          backgroundColor: '#111',
          backgroundGradientFrom: '#111',
          backgroundGradientTo: '#111',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`,
          labelColor: () => '#ccc',
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: 'yellow',
          },
        }}
        style={styles.chart}
        bezier
      />
      <BarChart
  data={barData}
  width={screenWidth - 30}
  height={220}
  yAxisSuffix="µg"
  chartConfig={{
    backgroundColor: '#111',
    backgroundGradientFrom: '#111',
    backgroundGradientTo: '#111',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 215, 0, ${opacity})`, // yellowish bars
    labelColor: () => '#ccc',
    propsForBackgroundLines: {
      stroke: '#333',
    },
  }}
  style={styles.chart}
  verticalLabelRotation={0}
/>

      {/* Stats Summary */}
      <View style={styles.bottomStats}>
        <Text style={styles.statLabel}>Average</Text>
        <Text style={styles.statValue}>123 µg/m³</Text>
        <Text style={styles.statLabel}>Min</Text>
        <Text style={[styles.statValue, { color: 'lightgreen' }]}>85 µg/m³</Text>
        <Text style={styles.statLabel}>Max</Text>
        <Text style={[styles.statValue, { color: 'red' }]}>180 µg/m³</Text>
        <Text style={styles.statLabel}>Safe Threshold</Text>
        <Text style={styles.statValue}>100 µg/m³</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', paddingHorizontal: 15, paddingTop: 40 },
  backButton: { marginBottom: 10 },
  backArrow: { color: '#fff', fontSize: 22 },
  card: { backgroundColor: '#1a1a1a', borderRadius: 15, padding: 15, marginBottom: 15 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  cardTitle: { color: '#fff', fontSize: 18 },
  updatedText: { color: '#888', fontSize: 14 },
  timeText: { color: '#ccc' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  statBox: { width: '48%' },
  label: { color: '#888', fontSize: 14 },
  value: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  green: { color: 'lightgreen' },
  red: { color: 'red' },
  unit: { color: '#999', fontSize: 14 },
  legend: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, alignItems: 'center' },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 6 },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 6 },
  legendText: { color: '#aaa', fontSize: 12 },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  dayBubble: {
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'yellow',
    padding: 10,
    width: 50,
    height: 70,
  },
  dayValue: { color: '#fff', fontSize: 16 },
  dayLabel: { color: '#aaa', fontSize: 12 },
  sectionTitle: { color: '#fff', fontSize: 18 },
  filterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  toggleGroup: { flexDirection: 'row', gap: 8 },
  toggleButton: { color: '#999', fontSize: 14, paddingHorizontal: 10 },
  active: { color: 'yellow', fontWeight: 'bold' },
  toggleGroupAlt: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  altButton: { color: '#aaa', fontSize: 14, paddingHorizontal: 10 },
  activeAlt: { color: '#fff', fontWeight: 'bold' },
  chart: { marginVertical: 10, borderRadius: 12 },
  bottomStats: { backgroundColor: '#1a1a1a', padding: 15, borderRadius: 12, marginBottom: 20 },
  statLabel: { color: '#aaa', fontSize: 14 },
  statValue: { color: '#fff', fontSize: 18, marginBottom: 10 },
});
