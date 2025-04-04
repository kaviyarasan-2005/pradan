import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <TouchableOpacity onPress={() => router.replace("/dashboard")}>
          <Text style={styles.sidebarItem}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/settings")}>
          <Text style={styles.sidebarItem}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
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
    flexDirection: "row", // Side-by-side layout
  },
  sidebar: {
    width: 100,
    backgroundColor: "#f0f0f0",
    paddingTop: 40,
    alignItems: "center",
  },
  sidebarItem: {
    fontSize: 16,
    marginVertical: 20,
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
