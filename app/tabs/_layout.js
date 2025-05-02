// app/tabs/_layout.js
import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: '#FFD700',
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chart"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="pie-chart-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ai-analysis"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
                source={require('../../assets/icons/26783089_c12aae.png')} // <- your custom icon path
                style={{
                width: 30,
                height: 30,
                tintColor: color, // if you want tinting
                }}
                resizeMode="contain"
            />
            ),
        }}
    />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#0b0b0b',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    height: 70,
    marginHorizontal: 0,
    marginBottom: 0,
    elevation: 0,
    paddingTop:5,
    borderTopWidth: 0,
  },
});
