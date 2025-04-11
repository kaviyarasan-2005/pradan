import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useFormStore } from "../storage/useFormStore";
import { Button } from "react-native-paper";

export default function TotalSubmit() {
  const router = useRouter();
  const { submittedForms, loadSubmittedForms, deleteFormByIndex } = useFormStore();

  useEffect(() => {
    loadSubmittedForms();
  }, []);

  const handleDelete = (index: number) => {
    Alert.alert(
      "Delete Form",
      "Are you sure you want to delete this form?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            deleteFormByIndex(index);
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Submitted Forms</Text>

      {submittedForms.length === 0 ? (
        <Text style={styles.noDataText}>No forms submitted yet.</Text>
      ) : (
        <ScrollView horizontal>
          <View style={styles.table}>
            <View style={[styles.row, styles.headerRow]}>
              <Text style={[styles.cell, styles.headerCell, { width: 30 }]}>#</Text>
              <Text style={[styles.cell, styles.headerCell, { width: 90 }]}>Farmer Name</Text>
              <Text style={[styles.cell, styles.headerCell, { width: 90 }]}>Form Type</Text>
              <Text style={[styles.cell, styles.headerCell, { width: 80 }]}>Status</Text>
              <Text style={[styles.cell, styles.headerCell, { width: 60 }]}>Actions</Text>
            </View>

            <FlatList
              data={submittedForms}
              keyExtractor={(_, index) => `form-${index}`}
              renderItem={({ item, index }) => (
                <View style={[styles.row, index % 2 !== 0 && styles.altRow]}>
                  <Text style={[styles.cell, { width: 30 }]}>{index + 1}</Text>
                  <Text style={[styles.cell, { width: 80 }]}>
                    {item.basicDetails?.name || "N/A"}
                  </Text>
                  <Text style={[styles.cell, { width: 90 }]}>
                    {item.formType || "N/A"}
                  </Text>
                  <Text style={[styles.cell, { width: 80 }]}>
                    {item.status || "Submitted"}
                  </Text>
                  <View style={[styles.cell, { width: 150, flexDirection: "row" }]}>
                    <Button
                      mode="outlined"
                      onPress={() => router.push({ pathname: "/landform/Preview", params: { id: item.id } })}
                    >
                      Preview
                    </Button>
                    <Button
                      mode="text"
                      textColor="red"
                      onPress={() => handleDelete(index)}
                    >
                      Delete
                    </Button>
                  </View>
                </View>
              )}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  noDataText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
  },
  table: {
    minWidth: 600,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  altRow: {
    backgroundColor: "#f9f9f9",
  },
  headerRow: {
    backgroundColor: "#ddd",
  },
  cell: {
    paddingHorizontal: 6,
  },
  headerCell: {
    fontWeight: "bold",
  },
});
