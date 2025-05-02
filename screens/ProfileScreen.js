import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Requires expo install expo/vector-icons

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Profile</Text>
      <View style={styles.avatar} />
      <Text style={styles.username}>User</Text>

      <ScrollView style={styles.detailsContainer}>
        <Text style={styles.sectionHeader}>ACCOUNT INFORMATIONS</Text>
        <View style={styles.card}>
          <DetailItem label="Vehicle No." value="OD01 M 2003" />
          <DetailItem label="Battery Level" value="15%" />
          <DetailItem label="Notification toggle" value="ON" />
          <DetailItem label="Preferred units" value="ppm / µg/m³" />
        </View>

        <Text style={styles.sectionHeader}>PERSONAL DETAILS</Text>
        <View style={styles.card}>
          <DetailItem label="Name" value="Ayush Khandelwal" />
          <DetailItem label="Pair new device" value="Bluetooth/WiFi" />
          <DetailItem label="Rename device" value="D1000465" />
          <DetailItem label="Threshold settings" value="100 µg/m³" />
          <DetailItem label="Time format" value="12hr / 24hr" />
          <DetailItem label="Last Data Sync" value="2 mins ago" />
        </View>
      </ScrollView>
    </View>
  );
}

const DetailItem = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#999',
    alignSelf: 'center',
    marginVertical: 10,
  },
  username: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionHeader: {
    color: '#aaa',
    marginVertical: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  label: {
    color: '#eee',
    fontSize: 16,
  },
  value: {
    color: '#bbb',
    fontSize: 16,
  },
});
