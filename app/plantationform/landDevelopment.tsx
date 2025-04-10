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
import { useFormStore } from "../../storage/useFormStore";

export default function LandDevelopment() {
  const router = useRouter();
  const { data, setData } = useFormStore();

  const [form, setForm] = useState(
    data.landDevelopment || {
      sfNumber: "",
      soilType: [],
      landBenefit: "",
      inspectionBy: "",
      approvedBy: "",
      dateInspectionText: "",
      dateApprovalText: "",
      latitude: "",
      longitude: "",
      proposalArea: "",
      otherWorks: "",
      pradanContribution: "",
      farmerContribution: "",
      totalEstimate: "",
      workType: [],
      workTypeText: "",
    }
  );

  const updateField = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleCheckbox = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item: string) => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleNext = () => {
    setData("landDevelopment", form);
    router.push("./bankDetails");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <IconButton icon="arrow-left" size={24} onPress={() => router.back()} />

      <Text style={styles.title}>Plantation Form</Text>
      <Text style={styles.subtitle}>Land Development Details</Text>

      <Text style={styles.label}>31. S.F. No. of the land to be developed</Text>
      <TextInput
        value={form.sfNumber}
        onChangeText={(text) => updateField("sfNumber", text)}
        style={styles.input}
        mode="outlined"
      />

      <Text style={styles.label}>31.a) Latitude and Longitude</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TextInput
          mode="outlined"
          style={[styles.input, { flex: 1, marginRight: 5 }]}
          placeholder="Latitude"
          value={form.latitude}
          onChangeText={(text) => updateField("latitude", text)}
          keyboardType="numeric"
        />
        <TextInput
          mode="outlined"
          style={[styles.input, { flex: 1, marginLeft: 5 }]}
          placeholder="Longitude"
          value={form.longitude}
          onChangeText={(text) => updateField("longitude", text)}
          keyboardType="numeric"
        />
      </View>

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
        onChangeText={(text) => updateField("landBenefit", text)}
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
          onPress={() => updateField("inspectionBy", role)}
        />
      ))}

      <Text style={styles.label}>35. Site Approved by</Text>
      {["Coordinator", "Team Leader"].map((role) => (
        <Checkbox.Item
          key={role}
          label={role}
          status={form.approvedBy === role ? "checked" : "unchecked"}
          onPress={() => updateField("approvedBy", role)}
        />
      ))}

      <Text style={styles.label}>36. Date of Inspection</Text>
      <TextInput
        value={form.dateInspectionText}
        onChangeText={(text) => updateField("dateInspectionText", text)}
        style={styles.input}
        placeholder="DD/MM/YYYY"
        mode="outlined"
      />

      <Text style={styles.label}>37. Date of Approval</Text>
      <TextInput
        value={form.dateApprovalText}
        onChangeText={(text) => updateField("dateApprovalText", text)}
        style={styles.input}
        placeholder="DD/MM/YYYY"
        mode="outlined"
      />

      <Text style={styles.label}>38. Type of Plantation Proposed</Text>
      {["Mango", "Guava", "Lemon", "Moringa", "other"].map((work) => (
        <Checkbox.Item
          key={work}
          label={work}
          status={form.workType.includes(work) ? "checked" : "unchecked"}
          onPress={() => toggleCheckbox("workType", work)}
        />
      ))}

      {form.workType.includes("other") && (
        <TextInput
          value={form.workTypeText}
          onChangeText={(text) => updateField("workTypeText", text)}
          style={styles.input}
          placeholder="Specify the type of Plantation"
          mode="outlined"
        />
      )}

      <Text style={styles.label}>39. Area benefited by proposal works (ha)</Text>
      <TextInput
        value={form.proposalArea}
        onChangeText={(text) => updateField("proposalArea", text)}
        style={styles.input}
        keyboardType="numeric"
        mode="outlined"
      />

      <Text style={styles.label}>40. Any other works proposed</Text>
      <TextInput
        value={form.otherWorks}
        onChangeText={(text) => updateField("otherWorks", text)}
        style={styles.input}
        mode="outlined"
      />

      <Text style={styles.label}>41. PRADAN Contribution (Rs)</Text>
      <TextInput
        value={form.pradanContribution}
        onChangeText={(text) => updateField("pradanContribution", text)}
        style={styles.input}
        keyboardType="numeric"
        mode="outlined"
      />

      <Text style={styles.label}>42. Farmer Contribution (Rs)</Text>
      <TextInput
        value={form.farmerContribution}
        onChangeText={(text) => updateField("farmerContribution", text)}
        style={styles.input}
        keyboardType="numeric"
        mode="outlined"
      />

      <Text style={styles.label}>43. Total Estimate (Rs)</Text>
      <TextInput
        value={form.totalEstimate}
        onChangeText={(text) => updateField("totalEstimate", text)}
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
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    marginBottom: 10,
  },
  divider: {
    marginVertical: 10,
  },
  button: {
    marginTop: 30,
  },
});
