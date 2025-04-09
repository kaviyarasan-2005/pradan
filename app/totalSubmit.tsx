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

export default function TotalSubmit() {
  const router = useRouter();
  const { submittedForms, loadSubmittedForms, deleteFormByIndex } = useFormStore();

  useEffect(() => {
    loadSubmittedForms();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Submitted Forms</Text>

      {submittedForms.length === 0 ? (
        <Text style={styles.noDataText}>No forms submitted yet.</Text>
      ) : (
        <ScrollView horizontal>
          <View style={styles.table}>
            <View style={[styles.row, styles.headerRow]}>
              <Text style={[styles.cell, styles.headerCell, { width: 20 }]}>#</Text>
              <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>Farmer Name</Text>
              <Text style={[styles.cell, styles.headerCell, { width: 90 }]}>Form Type</Text>
              <Text style={[styles.cell, styles.headerCell, { width: 80 }]}>Status</Text>
              <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>Actions</Text>
            </View>

            <FlatList
              data={submittedForms}
              keyExtractor={(_, index) => `form-${index}`}
              renderItem={({ item, index }) => (
                <View style={[styles.row, index % 2 !== 0 && styles.altRow]}>
                  <Text style={[styles.cell, { width: 20 }]}>{index + 1}</Text>
                  <Text style={[styles.cell, { width: 120 }]}>
                    {item.basicDetails?.name || "N/A"}
                  </Text>
                  <Text style={[styles.cell, { width: 90 }]}>
                    {item.formType || "N/A"}
                  </Text>
                  <Text style={[styles.cell, { width: 80 }]}>
                    {item.status || "Submitted"}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                      onPress={() =>
                        router.push({
                          pathname: "/landform/preview",
                          params: { index: index.toString() },
                        })
                      }
                    >
                      <Text style={[styles.cell, styles.viewLink, { width: 60 }]}>
                        Preview
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert(
                          "Confirm Delete",
                          "Are you sure you want to delete this form?",
                          [
                            { text: "Cancel", style: "cancel" },
                            {
                              text: "Delete",
                              style: "destructive",
                              onPress: async () => {
                                await deleteFormByIndex(index);
                              },
                            },
                          ]
                        );
                      }}
                    >
                      <Text style={[styles.cell, { color: "red", width: 60 }]}>
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        </ScrollView>
      )}

      <TouchableOpacity style={styles.backButton} onPress={router.back}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#111",
  },
  noDataText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#666",
  },
  table: {
    borderRadius: 12,
    overflow: "hidden",
    elevation: 1,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 1,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  altRow: {
    backgroundColor: "#f0f4ff",
  },
  headerRow: {
    backgroundColor: "#007bff",
  },
  cell: {
    paddingHorizontal: 6,
    fontSize: 16,
    color: "#333",
  },
  headerCell: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
  },
  viewLink: {
    color: "#007bff",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  backButton: {
    marginTop: 30,
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
