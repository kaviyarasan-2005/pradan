import { useRouter } from "expo-router";
import { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  Text,
  TextInput,
  Button,
  Checkbox,
  Divider,
  IconButton,
} from "react-native-paper";
import { useFormStore } from "./useFormStore";

export default function LandDevelopment() {
  const router = useRouter();
  const { data, setData, latitude, setLatitude, longitude, setLongitude } =
    useFormStore();

  const [form, setForm] = useState(() => {
    const initial = data.landDevelopment || {};
    return {
      sfNumber: initial.sfNumber || "",
      soilType: initial.soilType || [],
      landBenefit: initial.landBenefit || "",
      inspectionBy: initial.inspectionBy || "",
      approvedBy: initial.approvedBy || "",
      dateInspectionText: initial.dateInspectionText || "",
      dateApprovalText: initial.dateApprovalText || "",
      // workType: initial.workType || [],
      // workTypeText: initial.workTypeText || "",
      length:initial.length || "",
      proposalArea: initial.proposalArea || "",
      otherWorks: initial.otherWorks || "",
      pradanContribution: initial.pradanContribution || "",
      farmerContribution: initial.farmerContribution || "",
      totalEstimate: initial.totalEstimate || "",
    };
  });

  const toggleCheckbox = (field: string, value: string) => {
    const list = form[field] || [];
    if (list.includes(value)) {
      setForm({ ...form, [field]: list.filter((item) => item !== value) });
    } else {
      setForm({ ...form, [field]: [...list, value] });
    }
  };

  const handleNext = () => {
    setData({ landDevelopment: form });
    router.push("./bankDetails");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <IconButton
        icon="arrow-left"
        size={24}
        style={styles.backButton}
        onPress={() => router.back()}
      />

      <Text style={styles.title}>Pond Form</Text>
      <Text style={styles.subtitle}>Land Development Details</Text>

      {/* Question 31 */}
      <Text style={styles.label}>31. S.F. No. of the land to be developed</Text>
      <TextInput
        value={form.sfNumber}
        onChangeText={(text) => setForm({ ...form, sfNumber: text })}
        style={styles.input}
        mode="outlined"
      />

      {/* Question 31.a */}
      <Text style={styles.label}>31.a) Latitude and Longitude</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TextInput
          mode="outlined"
          style={[styles.input, { flex: 1, marginRight: 5 }]}
          placeholder="Latitude"
          placeholderTextColor="#888"
          value={latitude}
          onChangeText={setLatitude}
          keyboardType="numeric"
        />
        <TextInput
          mode="outlined"
          style={[styles.input, { flex: 1, marginLeft: 5 }]}
          placeholder="Longitude"
          placeholderTextColor="#888"
          value={longitude}
          onChangeText={setLongitude}
          keyboardType="numeric"
        />
      </View>

      {/* Remaining fields... */}
      <Text style={styles.label}>32. Soil Type</Text>
      {["Red Soil", "Black Cotton", "Sandy Loam", "Laterite"].map((type) => (
        <Checkbox.Item
          key={type}
          label={type}
          status={form.soilType.includes(type) ? "checked" : "unchecked"}
          onPress={() => toggleCheckbox("soilType", type)}
        />
      ))}

      <Divider style={styles.divider} />

      <Text style={styles.label}>33. Land to benefit (ha)</Text>
      <TextInput
        value={form.landBenefit}
        onChangeText={(text) => setForm({ ...form, landBenefit: text })}
        style={styles.input}
        keyboardType="numeric"
        mode="outlined"
      />

      <Text style={styles.label}>34. Field Inspection done by</Text>
      {["Associate", "Professional"].map((role) => (
        <Checkbox.Item
          key={role}
          label={role}
          status={form.inspectionBy === role ? "checked" : "unchecked"}
          onPress={() => setForm({ ...form, inspectionBy: role })}
        />
      ))}

      <Text style={styles.label}>35. Site Approved by</Text>
      {["Coordinator", "Team Leader"].map((role) => (
        <Checkbox.Item
          key={role}
          label={role}
          status={form.approvedBy === role ? "checked" : "unchecked"}
          onPress={() => setForm({ ...form, approvedBy: role })}
        />
      ))}

      <Text style={styles.label}>36. Date of Inspection</Text>
      <TextInput
        value={form.dateInspectionText}
        onChangeText={(text) => setForm({ ...form, dateInspectionText: text })}
        style={styles.input}
        placeholder="DD/MM/YYYY"
        mode="outlined"
      />

      <Text style={styles.label}>37. Date of Approval</Text>
      <TextInput
        value={form.dateApprovalText}
        onChangeText={(text) => setForm({ ...form, dateApprovalText: text })}
        style={styles.input}
        placeholder="DD/MM/YYYY"
        mode="outlined"
      />

      <Text style={styles.label}>38. Length in meter</Text>
      <TextInput
        value={form.length}
        onChangeText={(text) => setForm({ ...form, length: text })}
        style={styles.input}
        keyboardType="numeric"
        mode="outlined"
      />

      <Text style={styles.label}>
        39.Breadth in meter
      </Text>
      <TextInput
        value={form.proposalArea}
        onChangeText={(text) => setForm({ ...form, proposalArea: text })}
        style={styles.input}
        keyboardType="numeric"
        mode="outlined"
      />

      <Text style={styles.label}>40. Depth in meter</Text>
      <TextInput
        value={form.otherWorks}
        onChangeText={(text) => setForm({ ...form, otherWorks: text })}
        style={styles.input}
        keyboardType="numeric"
        mode="outlined"
      />

      <Text style={styles.label}>41. PRADAN Contribution</Text>
      <TextInput
        value={form.pradanContribution}
        onChangeText={(text) => setForm({ ...form, pradanContribution: text })}
        style={styles.input}
        keyboardType="numeric"
        mode="outlined"
      />

      <Text style={styles.label}>42. Farmer Contribution</Text>
      <TextInput
        value={form.farmerContribution}
        onChangeText={(text) => setForm({ ...form, farmerContribution: text })}
        style={styles.input}
        keyboardType="numeric"
        mode="outlined"
      />

      <Text style={styles.label}>43. Total Estimate Amount</Text>
      <TextInput
        value={form.totalEstimate}
        onChangeText={(text) => setForm({ ...form, totalEstimate: text })}
        style={styles.input}
        keyboardType="numeric"
        mode="outlined"
      />

      <Button mode="contained" onPress={handleNext} style={styles.button}>
        Next
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center" },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  label: { fontWeight: "bold", marginTop: 10 },
  input: { marginBottom: 10, borderRadius: 5000 },
  button: { marginTop: 20 },
});
