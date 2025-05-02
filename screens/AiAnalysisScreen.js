import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function AiAnalysisScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>AI Insight Summary</Text>
      <Text style={styles.subtext}>Based on real-time sensor & historical ML model</Text>

      <View style={styles.badgeContainer}>
        <Text style={styles.badge}>🏃‍♂️ Avoid outdoor jogs today</Text>
        <Text style={styles.badge}>😷 Use N95 if outdoors</Text>
      </View>

      <InsightCard
        title="PM2.5 Analysis"
        date="April 10"
        stats={[
          'Avg: 96 µg/m³',
          'Max: 138 ',
          'Min: 62 ',
        ]}
        colorDots={['red', 'yellow']}
        description="PM2.5 remained consistently high between 11 AM–4 PM due to peak traffic. Conditions improved after sunset. Suggested exposure reduction between 12–4 PM."
        icon="🔍"
      />

      <InsightCard
        title="Traffic Impact"
        date="April 10"
        stats={[
          'Avg: 1.2 ppm CO',
          'Max: 1.8 ppm ',
          'Min: 0.8 ppm ',
        ]}
        colorDots={['red', 'yellow']}
        description="CO levels indicate heavy traffic congestion during afternoon hours. NO2 levels correlate with peak commute times. Consider alternative routes between 2–4 PM."
        icon="🚗"
      />

      <InsightCard
        title="Ozone Warning"
        date="April 10"
        stats={[
          'Avg: 85 ppb',
          'Max: 102 ppb ',
          'Min: 45 ppb ',
        ]}
        colorDots={['red', 'yellow', 'green']}
        description="Ground-level ozone exceeded safety thresholds during peak sunlight hours. Sensitive groups should limit outdoor exposure."
        icon="⚠️"
      />
    </ScrollView>
  );
}

const InsightCard = ({ title, date, stats, colorDots, description, icon }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle}>{icon} {title}</Text>
      <View style={styles.dotRow}>
        {colorDots.map((color, idx) => (
          <View key={idx} style={[styles.dot, { backgroundColor: color }]} />
        ))}
      </View>
    </View>
    <Text style={styles.cardDate}>{date}</Text>
    <View style={styles.statsRow}>
      {stats.map((s, idx) => (
        <Text key={idx} style={styles.stat}>{s}</Text>
      ))}
    </View>
    <Text style={styles.cardDescription}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  subtext: {
    color: '#aaa',
    marginBottom: 16,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  badge: {
    backgroundColor: '#222',
    color: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cardDate: {
    color: '#aaa',
    marginTop: 2,
    marginBottom: 12,
  },
  dotRow: {
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2b2b2b',
    padding: 10,
    height:60,
    borderRadius: 10,
    marginBottom: 12,
  },
  stat: {
    color: '#ccc',
    fontSize: 13,
  },
  cardDescription: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
  },
});
