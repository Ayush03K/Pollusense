import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Svg, Circle } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;

const pieData = [
  { name: 'PM2.5', value: 42.0, color: '#7B61FF' },
  { name: 'PM10', value: 65.0, color: '#FF5A5F' },
  { name: 'CO', value: 1.3, color: '#00BFFF' },
  { name: 'NO₂', value: 0.09, color: '#FFD700' },
  { name: 'SO₂', value: 0.045, color: '#00FA9A' },
  { name: 'VOC', value: 0.49, color: '#FF69F5' },
  { name: 'O₃', value: 0.03, color: '#FFA500' },
];

export default function ChartScreen() {
  const chartSize = screenWidth - 32;
  const centerCircleRadius = 60;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.card}>
        <Text style={styles.title}>Combined Air Quality Parameters</Text>
        
        {/* Chart Container */}
        <View style={styles.chartContainer}>
          <View style={{ width: chartSize, height: 220 }}>
            <PieChart
              data={pieData}
              width={chartSize}
              height={220}
              style={{marginLeft:65}}
              chartConfig={{
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              accessor="value"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
              hasLegend={false}
              center={[10, 0]}
              avoidFalseZero
            />
            <Svg style={styles.centerCircleSvg} width={chartSize} height={220}>
              <Circle cx={chartSize/2} cy={110} r={centerCircleRadius} fill="#111" />
            </Svg>
          </View>
        </View>

        {/* Legend */}
        <View style={styles.legendContainer}>
          {pieData.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>{item.name}</Text>
              {/* <Text style={styles.legendValue}>{item.value}</Text> */}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Parameter Details</Text>
        {pieData.map((item, index) => (
          <View key={index} style={styles.parameterRow}>
            <View style={styles.parameterLeft}>
              <View style={[styles.dot, { backgroundColor: item.color }]} />
              <Text style={styles.parameterLabel}>{item.name}</Text>
            </View>
            <Text style={styles.parameterValue}>{item.value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#000',
    padding: 16,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  card: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    width: '100%',
    maxWidth: 500,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  centerCircleSvg: {
    position: 'absolute',
    zIndex: 1,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    color: '#fff',
    fontSize: 12,
    flex: 1,
  },
  legendValue: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  parameterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  parameterLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  parameterLabel: {
    color: '#fff',
    fontSize: 14,
  },
  parameterValue: {
    color: '#fff',
    fontSize: 14,
  },
});