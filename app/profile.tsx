import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Pending() {
  const router = useRouter();
  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Page</Text>

      <TouchableOpacity style={styles.button} onPress={router.back}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    
      <TouchableOpacity onPress={handleLogout}>
                <Text style={[styles.logout, { color: "red" }]}>Logout</Text>
              </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    logout:{
        margin:90,
    },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
