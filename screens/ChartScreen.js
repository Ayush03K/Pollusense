import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Svg, Circle } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;

  

// const pieData = [
//   { name: 'CO', value: sdata['CO'], color: '#7B61FF' },
//   { name: 'NH3', value: sdata['NH3'], color: '#FF5A5F' },
//   { name: 'CO2', value: sdata['CO2'], color: '#00BFFF' },
//   { name: 'NO₂', value: sdata['NO2'], color: '#FFD700' },
//   { name: 'Benzene', value: sdata['Benzene'], color: '#00FA9A' },
//   { name: 'Toluene', value: sdata['Toluene'], color: '#FF69F5' },
//   { name: 'H2', value: sdata['H3'], color: '#FFA500' },
//   { name: 'LPG', value: sdata['LPG'], color: '#FFA500' },
//   { name: 'Smoke', value: sdata['Smoke'], color: '#FFA500' },
// ];

export default function ChartScreen() {
  const chartSize = screenWidth - 32;
  const centerCircleRadius = 60;
  const [sdata,setSdata] = useState([]);  

  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbyDi4zWr1V4zEgiPg0SvWYNrAwB1MErgzIqRVogGzITikrP0EcJc-sWJnyEjBCUHxYyZQ/exec')
      .then(res => res.json())
      .then(json => {
        if (json.length > 0) {
          const lastRow = json[json.length - 1];
          // console.log(lastRow);
          setSdata(lastRow);
           // Store only the last row
        }
      })
      .catch(err => console.error("Error fetching sheet:", err));
  }, []);
  const pieData = [
    { name: 'CO', value: parseFloat(sdata['CO']) || 0, color: '#7B61FF' },
    { name: 'NH3', value: parseFloat(sdata['NH3']) || 0, color: '#FF5A5F' },
    { name: 'CO2', value: parseFloat(sdata['CO2']) || 0, color: '#00BFFF' },
    { name: 'NO₂', value: parseFloat(sdata['NO2']) || 0, color: '#FFD700' },
    { name: 'Benzene', value: parseFloat(sdata['Benzene']) || 0, color: '#00FA9A' },
    { name: 'Toluene', value: parseFloat(sdata['Toluene']) || 0, color: '#FF69F5' },
    { name: 'H2', value: parseFloat(sdata['H2']) || 0, color: '#FFA500' },
    { name: 'LPG', value: parseFloat(sdata['LPG']) || 0, color: '#00CED1' },
    { name: 'Smoke', value: parseFloat(sdata['Smoke']) || 0, color: '#FF8C00' },
  ];
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