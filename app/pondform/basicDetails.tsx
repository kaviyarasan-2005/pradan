import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import { Checkbox, Button,IconButton } from "react-native-paper";
import { useFormStore } from "./useFormStore";

export default function BasicDetails() {
  const router = useRouter();
  const { data, setData } = useFormStore();

  const [form, setForm] = useState(data.basicDetails || {
    name: "",
    mobile: "",
    hamlet: "",
    panchayat: "",
    block: "",
    idCardType: "",
    idCardNumber: "",
    gender: "",
    fatherSpouse: "",
    householdType: "",
    adults: "",
    children: "",
    occupation: [],
    specialCategory: false,
    specialCategoryNumber: "",
    caste: "",
    houseOwnership: "",
    houseType: "",
    drinkingWater: [],
    potability: [],
    domesticWater: [],
    toiletAvailability: "",
    toiletCondition: "",
    education: "",
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
    setData({ basicDetails: form });
    router.push("./landOwnership");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <IconButton
        icon="arrow-left"
        size={24}
    
        onPress={() => router.back()}
      />
      <Text style={styles.title}>Pond Form</Text>
      <Text style={styles.subtitle}>Basic Details</Text>

      {/* Existing Questions */}
      <Text style={styles.question}>1. Name of Farmer:</Text>
      <TextInput
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
        style={styles.input}
      />

      <Text style={styles.question}>2. Mobile Number:</Text>
      <TextInput
        value={form.mobile}
        onChangeText={(text) => setForm({ ...form, mobile: text })}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.question}>3. Hamlet:</Text>
      <TextInput
        value={form.hamlet}
        onChangeText={(text) => setForm({ ...form, hamlet: text })}
        style={styles.input}
      />

      <Text style={styles.question}>4. Panchayat:</Text>
      <TextInput
        value={form.panchayat}
        onChangeText={(text) => setForm({ ...form, panchayat: text })}
        style={styles.input}
      />

      <Text style={styles.question}>5. Block:</Text>
      <TextInput
        value={form.block}
        onChangeText={(text) => setForm({ ...form, block: text })}
        style={styles.input}
      />

      <Text style={styles.question}>6. Identity Card:</Text>
      {["Aadhar", "EPIC", "Driving License"].map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={form.idCardType === item ? "checked" : "unchecked"}
          onPress={() => setForm({ ...form, idCardType: item })}
        />
      ))}

      <Text style={styles.question}>7. ID Card Number:</Text>
      <TextInput
        value={form.idCardNumber}
        onChangeText={(text) => setForm({ ...form, idCardNumber: text })}
        style={styles.input}
      />

      <Text style={styles.question}>8. Gender:</Text>
      {["Male", "Female", "Transgender"].map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={form.gender === item ? "checked" : "unchecked"}
          onPress={() => setForm({ ...form, gender: item })}
        />
      ))}

      <Text style={styles.question}>9. Father / Spouse Name:</Text>
      <TextInput
        value={form.fatherSpouse}
        onChangeText={(text) => setForm({ ...form, fatherSpouse: text })}
        style={styles.input}
      />

      <Text style={styles.question}>10. Type of Household:</Text>
      {["Nuclear", "Joint"].map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={form.householdType === item ? "checked" : "unchecked"}
          onPress={() => setForm({ ...form, householdType: item })}
        />
      ))}

      <Text style={styles.question}>11. Household Members:</Text>
      <Text style={styles.question}>Adult:</Text>
      <TextInput
      
        value={form.adults}
        onChangeText={(text) => setForm({ ...form, adults: text })}
        style={styles.input}
        placeholder="Adults"
        keyboardType="numeric"
      />
      <Text style={styles.question}>children:</Text>
      <TextInput
        value={form.children}
        onChangeText={(text) => setForm({ ...form, children: text })}
        style={styles.input}
        placeholder="Children"
        keyboardType="numeric"
      />

      <Text style={styles.question}>12. Occupation of Household Members:</Text>
      {["Agriculture", "Business", "Other"].map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={form.occupation.includes(item) ? "checked" : "unchecked"}
          onPress={() => toggleCheckbox("occupation", item)}
        />
      ))}

      <Text style={styles.question}>13. Special Category:</Text>
      <Checkbox.Item
        label="Disabled"
        status={form.specialCategory ? "checked" : "unchecked"}
        onPress={() => setForm({ ...form, specialCategory: !form.specialCategory })}
      />
      {form.specialCategory && (
        <TextInput
          value={form.specialCategoryNumber}
          onChangeText={(text) => setForm({ ...form, specialCategoryNumber: text })}
          style={styles.input}
          placeholder="Number of Disabled Persons"
          keyboardType="numeric"
        />
      )}

      <Text style={styles.question}>14. Caste:</Text>
      {["OC", "OBC", "SC", "ST"].map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={form.caste === item ? "checked" : "unchecked"}
          onPress={() => setForm({ ...form, caste: item })}
        />
      ))}

      <Text style={styles.question}>15. House Ownership:</Text>
      {["Rented", "Owned"].map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={form.houseOwnership === item ? "checked" : "unchecked"}
          onPress={() => setForm({ ...form, houseOwnership: item })}
        />
      ))}

      <Text style={styles.question}>16. Type of House:</Text>
      {["Pucca", "Kutcha"].map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={form.houseType === item ? "checked" : "unchecked"}
          onPress={() => setForm({ ...form, houseType: item })}
        />
      ))}
      <Text style={styles.question}>17. Drinking Water Source:</Text>
      {["Ponds", "Well & Borewells", "Trucks"].map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={form.drinkingWater.includes(item) ? "checked" : "unchecked"}
          onPress={() => toggleCheckbox("drinkingWater", item)}
        />
      ))}

      {/* Potability */}
      <Text style={styles.question}>18. Potability:</Text>
      {["Ponds", "Tanks", "Well & Borewells"].map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={form.potability.includes(item) ? "checked" : "unchecked"}
          onPress={() => toggleCheckbox("potability", item)}
        />
      ))}

      {/* Domestic Water Source */}
      <Text style={styles.question}>19. Domestic Water Source:</Text>
      {["Ponds", "Tanks", "Well & Borewells"].map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={form.domesticWater.includes(item) ? "checked" : "unchecked"}
          onPress={() => toggleCheckbox("domesticWater", item)}
        />
      ))}

      {/* Toilet Availability */}
      <Text style={styles.question}>20. Toilet Availability:</Text>
      {["Yes", "No"].map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={form.toiletAvailability === item ? "checked" : "unchecked"}
          onPress={() => setForm({ ...form, toiletAvailability: item })}
        />
      ))}

      {/* Toilet Condition */}
      <Text style={styles.question}>21. Toilet Condition:</Text>
      {["Working", "Not Working"].map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={form.toiletCondition === item ? "checked" : "unchecked"}
          onPress={() => setForm({ ...form, toiletCondition: item })}
        />
      ))}

      {/* Education of Householder */}
      <Text style={styles.question}>22. Education of Householder:</Text>
      {["Illiterate", "Primary", "Secondary", "University"].map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={form.education === item ? "checked" : "unchecked"}
          onPress={() => setForm({ ...form, education: item })}
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