import React, { useEffect, useState } from "react";
import { Picker } from '@react-native-picker/picker';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useFormStore } from "../storage/useFormStore";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const statusStyles = {
  Approved: { backgroundColor: '#C8E6C9', textColor: '#2E7D32' },
  Pending: { backgroundColor: '#FFF9C4', textColor: '#F9A825' },
  Rejected: { backgroundColor: '#FFCDD2', textColor: '#C62828' },
};

const TotalSubmit = () => {
  const router = useRouter();
  const { submittedForms, loadSubmittedForms, deleteFormByIndex } = useFormStore();
  const { showActionSheetWithOptions } = useActionSheet();

  const [searchText, setSearchText] = useState("");
  const [formType, setFormType] = useState("ALL");
  const [panchayat, setPanchayat] = useState("");
  const [block, setBlock] = useState("");
  const [hamlet, setHamlet] = useState("");
  const [gender, setGender] = useState("ALL");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadSubmittedForms();
  }, []);

  const filteredForms = submittedForms.filter((item) => {
    const matchesType = formType === "ALL" || item.formType === formType;
    const matchesName = item.basicDetails?.name?.toLowerCase().includes(searchText.toLowerCase());
    const matchesPanchayat = item.basicDetails?.panchayat?.toLowerCase().includes(panchayat.toLowerCase());
    const matchesBlock = item.basicDetails?.block?.toLowerCase().includes(block.toLowerCase());
    const matchesHamlet = item.basicDetails?.hamlet?.toLowerCase().includes(hamlet.toLowerCase());
    const matchesGender = gender === "ALL" || item.basicDetails?.gender === gender;
    const matchesStart = !startDate || new Date(item.date) >= new Date(startDate);
    const matchesEnd = !endDate || new Date(item.date) <= new Date(endDate);

    return matchesType && matchesName && matchesPanchayat && matchesBlock &&
      matchesHamlet && matchesGender && matchesStart && matchesEnd;
  });

  const handleCardPress = (item) => {
    let previewPath = "";
    if (item.formType === "LAND") previewPath = "/landform/Preview";
    else if (item.formType === "POND") previewPath = "/pondform/Preview";
    else if (item.formType === "PLANTATION") previewPath = "/plantationform/Preview";
    else return alert("Unknown form type.");

    router.push({ pathname: previewPath, params: { id: item.id, fromsubmit: "true", returnsubmit: "/totalSubmit" } });
  };

  const handleDelete = (index) => {
    Alert.alert("Delete Form", "Are you sure you want to delete this form?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => deleteFormByIndex(index),
        style: "destructive",
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/dashboard")} style={styles.icon}>
          <Ionicons name="arrow-back" size={24} color="#1B5E20" />
        </TouchableOpacity>
        <Text style={styles.title}>Form Submissions</Text>
        <TouchableOpacity onPress={() => setShowFilters(!showFilters)} style={styles.icon}>
          <MaterialIcons name="filter-list" size={24} color="#1B5E20" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <FontAwesome5 name="search" size={16} color="#1B5E20" style={styles.searchIcon} />
        <TextInput
          placeholder="Search by farmer name"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Filter Options (Toggleable) */}
      {showFilters && (
        <View style={styles.filtersBox}>
          <TextInput placeholder="Panchayat" value={panchayat} onChangeText={setPanchayat} style={styles.searchInput} />
          <TextInput placeholder="Block" value={block} onChangeText={setBlock} style={styles.searchInput} />
          <TextInput placeholder="Hamlet" value={hamlet} onChangeText={setHamlet} style={styles.searchInput} />

          <Text style={styles.filterLabel}>Form Type</Text>
          <Picker selectedValue={formType} onValueChange={setFormType}>
            <Picker.Item label="ALL" value="ALL" />
            <Picker.Item label="LAND" value="LAND" />
            <Picker.Item label="POND" value="POND" />
            <Picker.Item label="PLANTATION" value="PLANTATION" />
          </Picker>

          <Text style={styles.filterLabel}>Gender</Text>
          <Picker selectedValue={gender} onValueChange={setGender}>
            <Picker.Item label="ALL" value="ALL" />
            <Picker.Item label="MALE" value="MALE" />
            <Picker.Item label="FEMALE" value="FEMALE" />
            <Picker.Item label="TRANSGENDER" value="TRANSGENDER" />
          </Picker>

          <TextInput
            placeholder="Start Date (YYYY-MM-DD)"
            value={startDate || ""}
            onChangeText={setStartDate}
            style={styles.searchInput}
          />
          <TextInput
            placeholder="End Date (YYYY-MM-DD)"
            value={endDate || ""}
            onChangeText={setEndDate}
            style={styles.searchInput}
          />
        </View>
      )}

      {/* No Data */}
      {filteredForms.length === 0 ? (
        <Text style={styles.noDataText}>No forms submitted yet.</Text>
      ) : (
        filteredForms.map((item, index) => {
          const statusStyle = statusStyles[item.formStatus] || {
            backgroundColor: "#E0E0E0",
            textColor: "#424242",
          };

          return (
            <TouchableOpacity key={index} style={styles.card} onPress={() => handleCardPress(item)}>
              <View style={styles.cardHeader}>
                <Text style={styles.name}>{item.basicDetails?.name || "N/A"}</Text>
                <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor }]}>
                  <Text style={[styles.statusText, { color: statusStyle.textColor }]}>
                    {item.formStatus}
                  </Text>
                </View>
              </View>

              <Text style={styles.label}>Form: <Text style={styles.value}>{item.formType}</Text></Text>
              <Text style={styles.label}>Date: <Text style={styles.value}>{item.date || "N/A"}</Text></Text>

              <View style={styles.bioContainer}>
                <Text style={styles.bioTitle}>Remarks</Text>
                <Text style={styles.bioContent}>{item.basicDetails?.remarks || "No remarks"}</Text>
              </View>

              <TouchableOpacity onPress={() => handleDelete(index)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })
      )}
    </ScrollView>
  );
};

export default TotalSubmit;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  icon: {
    padding: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B5E20",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    color: "#333",
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  filtersBox: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#F0F4C3",
    marginBottom: 14,
  },
  filterLabel: {
    fontWeight: "bold",
    marginTop: 6,
    color: "#1B5E20",
  },
  noDataText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontWeight: "bold",
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  value: {
    fontWeight: "600",
    color: "#333",
  },
  bioContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  bioTitle: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#444",
  },
  bioContent: {
    fontSize: 13,
    color: "#666",
  },
  deleteButton: {
    marginTop: 10,
    alignSelf: "flex-end",
    backgroundColor: "#FFCDD2",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: "#C62828",
    fontWeight: "bold",
  },
});
