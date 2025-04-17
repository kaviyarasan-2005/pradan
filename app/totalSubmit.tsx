import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useFormStore } from "../storage/useFormStore";
import { Button, IconButton } from "react-native-paper";
import { useActionSheet } from "@expo/react-native-action-sheet";

export default function TotalSubmit() {
  const router = useRouter();
  const { submittedForms, loadSubmittedForms, deleteFormByIndex } = useFormStore();
  const { showActionSheetWithOptions } = useActionSheet();
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    loadSubmittedForms();
  }, []);

  const handleDelete = (index: number) => {
    Alert.alert("Delete Form", "Are you sure you want to delete this form?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          deleteFormByIndex(index);
        },
        style: "destructive",
      },
    ]);
  };

  const openFilterSheet = () => {
    const options = ["ALL", "LAND", "POND", "PLANTATION", "Cancel"];
    const cancelButtonIndex = 4;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title: "Filter by Form Type",
      },
      (buttonIndex) => {
        if (buttonIndex !== cancelButtonIndex) {
          setSelectedFilter(options[buttonIndex]);
        }
      }
    );
  };
 
  const filteredForms = submittedForms.filter((item) => {
    const matchesType = selectedFilter === "ALL" || item.formType === selectedFilter;
    const matchesSearch = item.basicDetails?.name?.toLowerCase().includes(searchText.toLowerCase());
    return matchesType && matchesSearch;
  });


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <IconButton icon="arrow-left" onPress={() => router.back()} />
        <Text style={styles.title}>Total Submitted Forms</Text>
        <IconButton icon="filter-variant" onPress={openFilterSheet} />
      </View>
      <Text style={styles.filterLabel}>Showing: {selectedFilter}</Text>
      <TextInput
  style={styles.searchInput}
  placeholder="Search by farmer name"
  value={searchText}
  onChangeText={setSearchText}
/>

      {filteredForms.length === 0 ? (
        <Text style={styles.noDataText}>No forms submitted yet.</Text>
      ) : (
        <ScrollView horizontal>
          <View style={styles.table}>
            <View style={[styles.row, styles.headerTableRow]}>
              <Text style={[styles.cell, styles.headerCell, { width: 30 }]}>#</Text>
              <Text style={[styles.cell, styles.headerCell, { width: 90 }]}>Farmer Name</Text>
              <Text style={[styles.cell, styles.headerCell, { width: 90 }]}>Form Type</Text>
              <Text style={[styles.cell, styles.headerCell, { width: 80 }]}>Status</Text>
              <Text style={[styles.cell, styles.headerCell, { width: 150 }]}>Actions</Text>
            </View>

            <FlatList
              data={filteredForms}
              keyExtractor={(_, index) => `form-${index}`}
              renderItem={({ item, index }) => (
                <View style={[styles.row, index % 2 !== 0 && styles.altRow]}>
                  <Text style={[styles.cell, { width: 30 }]}>{index + 1}</Text>
                  <Text style={[styles.cell, { width: 90 }]}>
                    {item.basicDetails?.name || "N/A"}
                  </Text>
                  <Text style={[styles.cell, { width: 90 }]}>{item.formType || "N/A"}</Text>
                  <Text style={[styles.cell, { width: 80 }]}>
                     {item.formStatus || "Not Filled"}
                  </Text>
                  <View style={[styles.cell, { width: 150, flexDirection: "row", gap: 4 }]}>
                  <Button
  mode="outlined"
  compact
  onPress={() => {
    const formType = item.formType?.toLowerCase(); // e.g. "LAND" -> "land"
    let previewPath = "";
    if (formType === "land") {
      previewPath = "/landform/Preview";
    } else if (formType === "pond") {
      previewPath = "/pondform/Preview";
    } else if (formType === "plantation") {
      previewPath = "/plantationform/Preview";
    } else {
      Alert.alert("Error", "Unknown form type.");
      return;
    }

    router.push({ pathname: previewPath, params: { id: item.id } });
  }}
>
  Preview
</Button>

                    <Button
                      mode="text"
                      textColor="red"
                      compact
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
    padding: 16,
    paddingTop: 40,
    flex: 1,
    backgroundColor: "#fff",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  filterLabel: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#555",
    marginBottom: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  
  noDataText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 20,
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
  headerTableRow: {
    backgroundColor: "#ddd",
  },
  cell: {
    paddingHorizontal: 6,
  },
  headerCell: {
    fontWeight: "bold",
  },
});
