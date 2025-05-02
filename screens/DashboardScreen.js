import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import MetricCard from "../components/MetricCard";
import UserHeader from "../components/UserHeader";
import AirQualityGauge from "../components/AirQualityGauge";
import { useRouter } from 'expo-router';

const Dashboard = () => {
  const router = useRouter();

  const pollutants = [
    { title: 'CO', value: '1.2', status: 'Moderate' },
    { title: 'NH₃', value: '0.03', status: 'Low' },
    { title: 'CO₂', value: '420', status: 'High' },
    { title: 'NO₂', value: '25', status: 'Moderate' },
    { title: 'Benzene', value: '5', status: 'High' },
    { title: 'Toluene', value: '3', status: 'Low' },
    { title: 'H₂', value: '0.9', status: 'Low' },
    { title: 'LPG', value: '0.5', status: 'Moderate' },
    { title: 'Smoke', value: '45', status: 'High' },
  ];

  const groupedPollutants = pollutants.reduce((acc, item, i) => {
    if (i % 2 === 0) acc.push([item]);
    else acc[acc.length - 1].push(item);
    return acc;
  }, []);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <UserHeader />
        <AirQualityGauge value={58} />
        <View style={styles.overviewSection}>
          <Text style={styles.overviewTitle}>Overview</Text>
        </View>

        {groupedPollutants.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((pollutant, colIndex) => (
              <MetricCard
                key={colIndex}
                title={pollutant.title}
                value={pollutant.value}
                status={pollutant.status}
                onPress={() => router.push('/pollutant-detail')}
              />
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Dashboard;
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#0b0b0b"
  },
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
  },
  overviewSection: {
    marginTop: -36,
    paddingBottom: 15
  },
  overviewTitle: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 12
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12
  },
  title: {
    fontSize: 26,
    color: '#b4dbdc',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#08566e',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
  },
});
