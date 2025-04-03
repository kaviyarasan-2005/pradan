import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; // ✅ Correct navigation for Expo Router

export default function Dashboard() {
  const router = useRouter(); // ✅ Use router instead of navigation

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Dashboard</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/dashboard/totalSubmit")}>
        <Text style={styles.buttonText}>Total Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/dashboard/pending")}>
        <Text style={styles.buttonText}>Pending</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/dashboard/approved")}>
        <Text style={styles.buttonText}>Approved</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
