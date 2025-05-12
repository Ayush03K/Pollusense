import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import MetricCard from "../components/MetricCard";
import UserHeader from "../components/UserHeader";
import AirQualityGauge from "../components/AirQualityGauge";
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [sdata, setSdata] = useState([]);
  const [aqi,setAqi] = useState(null);
  const router = useRouter();

  const requiredKeys = [
    "PM2.5", "PM10", "NO", "NO2", "NOx", "NH3", "CO", "SO2", "O3", "Benzene", "Toluene", "Xylene"
  ];

  const parseFeatures = (sheetRow) => {
    return requiredKeys.map(key => {
      const value = sheetRow[key];
      return value !== undefined ? parseFloat(value).toFixed(3) : 0;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sheetRes = await fetch("https://script.google.com/macros/s/AKfycbyDi4zWr1V4zEgiPg0SvWYNrAwB1MErgzIqRVogGzITikrP0EcJc-sWJnyEjBCUHxYyZQ/exec");
        const sheetData = await sheetRes.json();
  
        if (sheetData.length === 0) return;
  
        const lastRow = sheetData[sheetData.length - 1];
  
        const lastRowStr = JSON.stringify(lastRow);
        const prevRowStr = JSON.stringify(sdata);
  
        if (lastRowStr !== prevRowStr) {
          setSdata(lastRow);
  
          // Delay prediction call by 2 seconds
          setTimeout(async () => {
            const features = parseFeatures(lastRow);
  
            const mlRes = await fetch("http://ec2-16-171-237-173.eu-north-1.compute.amazonaws.com:5000/predict", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ features }),
            });
  
            const result = await mlRes.json();
            console.log("Updated Prediction:", result);
            setAqi(result);
          }, 2000); // 2-second delay
        }
      } catch (err) {
        console.error("Polling or prediction error:", err);
        setError(err);
      }
    };
  
    fetchData(); // run immediately
    const interval = setInterval(fetchData, 10000); // then every 10 seconds
  
    return () => clearInterval(interval);
  }, [sdata]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: fetchedData, error: fetchError } = await supabase
          .from('pollutants_quality_data') // Make sure table name and column names match
          .select('*');

        if (fetchError) {
          console.error('Supabase fetch error:', fetchError);
          setError(fetchError);
        } else {
          console.log('Fetched data:', fetchedData);
          setData(fetchedData || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError(err);
      }
    };

    fetchData();
  }, []);

  const pollutants = data.map(item => ({
    title: item.Parameter || 'Unknown',
    Avg24: item['24H Avg'] || null,
    THigh:item['Today_High'] || null,
    TLow : item['Today_Low'] || null,
    Day1 : item['Day1'] || null,
    Day2 : item['Day2'] || null,
    Day3 : item['Day3'] || null,
    Day4 : item['Day4'] || null,
    Day5 : item['Day5'] || null,
    Day6 : item['Day6'] || null,
    Day7 : item['Day7'] || null,
    status: item.Status || 'Unknown',
  }));
  
  const groupedPollutants = pollutants.reduce((acc, item, i) => {
    if (i % 2 === 0) acc.push([item]);
    else acc[acc.length - 1].push(item);
    return acc;
  }, []);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <UserHeader />
        <AirQualityGauge value={aqi?.predictedAQI ?? 0} />

        <View style={styles.overviewSection}>
          <Text style={styles.overviewTitle}>Overview</Text>
        </View>

        {/* {error && (
          <Text style={{ color: 'red', marginBottom: 10 }}>
            Error: {error.message}
          </Text>
        )} */}
        {!error && data.length === 0 && (
          <Text style={{ color: 'white', marginBottom: 10 }}>
            No pollutant data available.
          </Text>
        )}
        {/* {console.log(sdata)} */}
        {groupedPollutants.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((pollutant, colIndex) => (
              <MetricCard
                key={colIndex}
                title={pollutant.title}
                value={sdata[pollutant.title]}
                status={pollutant.status}
                onPress={() => router.push({pathname:'/pollutant-detail',params:{title:pollutant.title,avg:pollutant.Avg24,THigh:pollutant.THigh,TLow:pollutant.TLow,Day1:pollutant.Day1,Day2:pollutant.Day2,Day3:pollutant.Day3,Day4:pollutant.Day4,Day5:pollutant.Day5,Day6:pollutant.Day6,Day7:pollutant.Day7,current: sdata?.[pollutant.title] ?? "N/A"}})}
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
  }
});
