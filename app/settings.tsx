import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Settings() {
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setSidebarVisible(!sidebarVisible)}>
          <Ionicons name="menu" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Settings</Text>
      </View>

      {/* Sidebar */}
      <Sidebar isVisible={sidebarVisible} />

      {/* Main content */}
      <Text style={styles.title}>Settings Page</Text>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "#f9f9f9",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  topTitle: {
    marginLeft: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    alignSelf: "center",
  },
  backText: {
    fontSize: 16,
    color: "#007bff",
  },
});
