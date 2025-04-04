import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Sidebar from "../components/Sidebar";

export default function Settings() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Sidebar />

      <Text style={styles.title}>Settings</Text>

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
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  backButton: {
    marginTop: 20,
    padding: 10,
  },
  backText: {
    fontSize: 16,
    color: "#007bff",
  },
});
