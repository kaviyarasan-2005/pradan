import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function TotalSubmitScreen() {
  const router = useRouter();
  const [data, setData] = useState([]); // List items (empty for now)

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Approved</Text>

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No submissions yet.</Text>}
      />

      <Button title="Back" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
});
