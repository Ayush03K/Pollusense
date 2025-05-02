import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const UserHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.greetingText}>
          <Text style={styles.normalText}>Hi, </Text>
          <Text style={styles.boldText}>User</Text>
        </Text>
      </View>
      <View style={styles.profileImage}>
        <Text>ajf</Text>
      </View>
        
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  textContainer: {
    display:"flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent:"center"
  },
  greetingText: {
    fontSize: 20,
    color:"white",
  },
  normalText: {
    fontWeight: "normal"
  },
  boldText: {
    fontWeight: "600"
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    color:"white"
  }
});

export default UserHeader;