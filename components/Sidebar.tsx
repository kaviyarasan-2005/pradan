import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Sidebar() {
  const router = useRouter();

  return (
    <View style={styles.sidebar}>
      <TouchableOpacity onPress={() => router.replace("/")}>
        <Text style={styles.link}>Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/settings")}>
        <Text style={styles.link}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    top: 50,
    left: 10,
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 10,
    zIndex: 100,
  },
  link: {
    marginVertical: 10,
    fontSize: 16,
    color: "#007bff",
  },
});
