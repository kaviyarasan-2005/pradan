import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import { Checkbox, Button,IconButton } from "react-native-paper";
import { useFormStore } from "../../storage/useFormStore";

export default function LandOwnership() {
  const router = useRouter();
  const { data, setData } = useFormStore();

  const [form, setForm] = useState(data.landOwnership || {
    landOwnershipType: "",
    hasWell: "",
    areaIrrigated: "",
    irrigatedLand: {
      rainfed: "",
      tankfed: "",
      wellIrrigated: "",
    },
    pattaNumber: "",
    totalArea: "",
    revenueVillage: "",
    cropSeason: [],
    livestock: [],
  });

  const toggleCheckbox = (field: string, value: string) => {
    setForm((prev: { [x: string]: any; }) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item: string) => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleNext = () => {
    setData({ landOwnership: form });
    router.push("./landDevelopment");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <IconButton
        icon="arrow-left"
        size={24}
        onPress={() => router.back()}
      />
      <Text style={styles.title}>Land Form</Text>
      <Text style={styles.subtitle}>Land Ownership & Livestock</Text>

      <Text style={styles.question}>23. Land Ownership:</Text>
      {["Owner Cultivator", "Lease Holder"].map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={form.landOwnershipType === item ? "checked" : "unchecked"}
          onPress={() => setForm({ ...form, landOwnershipType: item })}
        />
      ))}

      <Text style={styles.question}>24. Well for Irrigation:</Text>
      {["Yes", "No"].map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={form.hasWell === item ? "checked" : "unchecked"}
          onPress={() => setForm({ ...form, hasWell: item })}
        />
      ))}

      {form.hasWell === "Yes" && (
        <>
          <Text style={styles.question}>Area Irrigated (ha):</Text>
          <TextInput
            value={form.areaIrrigated}
            onChangeText={(text) => setForm({ ...form, areaIrrigated: text })}
            style={styles.input}
            keyboardType="numeric"
          />
        </>
      )}

      <Text style={styles.question}>25. Irrigated Lands (ha):</Text>
      <Text>Rainfed:</Text>
      <TextInput
        value={form.irrigatedLand.rainfed}
        onChangeText={(text) =>
          setForm({ ...form, irrigatedLand: { ...form.irrigatedLand, rainfed: text } })
        }
        style={styles.input}
        keyboardType="numeric"
      />
      <Text>Tankfed:</Text>
      <TextInput
        value={form.irrigatedLand.tankfed}
        onChangeText={(text) =>
          setForm({ ...form, irrigatedLand: { ...form.irrigatedLand, tankfed: text } })
        }
        style={styles.input}
        keyboardType="numeric"
      />
      <Text>Well Irrigated:</Text>
      <TextInput
        value={form.irrigatedLand.wellIrrigated}
        onChangeText={(text) =>
          setForm({ ...form, irrigatedLand: { ...form.irrigatedLand, wellIrrigated: text } })
        }
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.question}>26. Patta Number:</Text>
      <TextInput
        value={form.pattaNumber}
        onChangeText={(text) => setForm({ ...form, pattaNumber: text })}
        style={styles.input}
      />

      <Text style={styles.question}>27. Total Area (ha):</Text>
      <TextInput
        value={form.totalArea}
        onChangeText={(text) => setForm({ ...form, totalArea: text })}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.question}>28. Revenue Village:</Text>
      <TextInput
        value={form.revenueVillage}
        onChangeText={(text) => setForm({ ...form, revenueVillage: text })}
        style={styles.input}
      />

      <Text style={styles.question}>29. Crop Season:</Text>
      {["Kharif", "Rabi", "Other"].map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={form.cropSeason.includes(item) ? "checked" : "unchecked"}
          onPress={() => toggleCheckbox("cropSeason", item)}
        />
      ))}

      <Text style={styles.question}>30. Livestock at Home:</Text>
      {["Ruminants", "Milch animals", "Cattle", "Poultry"].map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={form.livestock.includes(item) ? "checked" : "unchecked"}
          onPress={() => toggleCheckbox("livestock", item)}
        />
      ))}

      <Button mode="contained" onPress={handleNext} style={styles.button}>
        Next
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center" },
  subtitle: { fontSize: 18, fontWeight: "600", textAlign: "center", marginBottom: 20 },
  question: { fontWeight: "bold", marginTop: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  button: { marginTop: 20 },
});