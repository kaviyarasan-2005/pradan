  import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
    Alert,
  } from "react-native";
  import { useRouter,Slot} from "expo-router";
  import { useEffect, useState } from "react";
  import { useFormStore } from "../storage/useFormStore";
  import {
    Appbar,
    Button,
    Portal,
    Modal,
    RadioButton,
  } from "react-native-paper";

  export default function TotalSubmit() {
    const router = useRouter();
    const { submittedForms, loadSubmittedForms, deleteFormByIndex } = useFormStore();

    const [filterType, setFilterType] = useState("All");
    const [isModalVisible, setIsModalVisible] = useState(false);

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

    const filteredForms = submittedForms.filter((form) =>
      filterType === "All" ? true : form.formType === filterType
    );

    return (
      <View style={styles.container}>
        {/* Header */}
        <Appbar.Header>
          <Appbar.BackAction onPress={() => router.back()} />
          <Appbar.Content title="Total Submitted Forms" />
          <Appbar.Action icon="filter-variant" onPress={() => setIsModalVisible(true)} />
        </Appbar.Header>

        {/* Filter Modal */}
        <Portal>
        <Modal visible={isModalVisible} onDismiss={() => setIsModalVisible(false)}>
  <View>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Filter by Form Type</Text>
      <RadioButton.Group
        onValueChange={(value) => setFilterType(value)}
        value={filterType}
      >
        <RadioButton.Item label="All" value="All" />
        <RadioButton.Item label="LAND" value="LAND" />
        <RadioButton.Item label="POND" value="POND" />
        <RadioButton.Item label="PLANTATION" value="PLANTATION" />
      </RadioButton.Group>
      <Button mode="contained" onPress={() => setIsModalVisible(false)}>
        Apply Filter
      </Button>
    </View>
  </View>
</Modal>

        </Portal>

        {/* Table */}
        {filteredForms.length === 0 ? (
          <Text style={styles.noDataText}>No forms found for selected filter.</Text>
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
                data={filteredForms}
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
                        onPress={() =>
                          router.push({
                            pathname: "/landform/Preview",
                            params: { id: item.id },
                          })
                        }
                      >
                        Preview
                      </Button>
                      <Button mode="text" textColor="red" onPress={() => handleDelete(index)}>
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
      paddingTop: 40,
      flex: 1,
      backgroundColor: "#fff",
    },
    noDataText: {
      fontSize: 16,
      color: "#777",
      textAlign: "center",
      marginTop: 20,
    },
    table: {
      minWidth: 600,
      paddingHorizontal: 20,
      paddingTop: 10,
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
    
    modalContainer: {
      backgroundColor: "#fefefe",
      marginHorizontal: 20,
      padding: 24,
      borderRadius: 16,
      elevation: 5, // For Android shadow
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
    },
    
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
  });
