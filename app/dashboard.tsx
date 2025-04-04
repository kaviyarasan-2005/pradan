import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // make sure you have expo/vector-icons

export default function Dashboard() {
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-200))[0];

  const toggleSidebar = () => {
    const toValue = sidebarVisible ? -200 : 0;
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <View style={styles.container}>
      {/* Top bar with hamburger */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Ionicons name="menu" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Dashboard</Text>
      </View>

      {/* Sidebar */}
      <Animated.View style={[styles.sidebar, { left: slideAnim }]}>
        <TouchableOpacity onPress={() => router.replace("/dashboard")}>
          <Text style={styles.sidebarItem}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/settings")}>
          <Text style={styles.sidebarItem}>Settings</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Main content */}
      <View style={styles.mainContent}>
        <Text style={styles.title}>Welcome to Dashboard</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/totalSubmit")}
        >
          <Text style={styles.buttonText}>Total Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/pending")}
        >
          <Text style={styles.buttonText}>Pending</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/approved")}
        >
          <Text style={styles.buttonText}>Approved</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#eaeaea",
  },
  topTitle: {
    marginLeft: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  sidebar: {
    position: "absolute",
    top: 60,
    bottom: 0,
    width: 200,
    backgroundColor: "#f0f0f0",
    paddingTop: 20,
    paddingLeft: 10,
    zIndex: 1,
  },
  sidebarItem: {
    fontSize: 16,
    marginVertical: 15,
    color: "blue",
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
