import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import { Checkbox } from "react-native-paper";
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
    specialCategory: "",
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
    setForm((prev) => ({
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
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {/* Text Input Fields */}
      <Text>Name:</Text>
      <TextInput
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <Text>Mobile Number:</Text>
      <TextInput
        value={form.mobile}
        onChangeText={(text) => setForm({ ...form, mobile: text })}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        keyboardType="numeric"
      />

      <Text>Hamlet:</Text>
      <TextInput
        value={form.hamlet}
        onChangeText={(text) => setForm({ ...form, hamlet: text })}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <Text>Panchayat:</Text>
      <TextInput
        value={form.panchayat}
        onChangeText={(text) => setForm({ ...form, panchayat: text })}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <Text>Block:</Text>
      <TextInput
        value={form.block}
        onChangeText={(text) => setForm({ ...form, block: text })}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      {/* ID Card Type */}
      <Text>ID Card Type:</Text>
      {["Aadhar", "EPIC", "Driving License"].map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={form.idCardType === item ? "checked" : "unchecked"}
          onPress={() => setForm({ ...form, idCardType: item })}
        />
      ))}

      <Text>ID Card Number:</Text>
      <TextInput
        value={form.idCardNumber}
        onChangeText={(text) => setForm({ ...form, idCardNumber: text })}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      {/* Gender */}
      <Text>Gender:</Text>
      {["Male", "Female", "Transgender"].map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={form.gender === item ? "checked" : "unchecked"}
          onPress={() => setForm({ ...form, gender: item })}
        />
      ))}

      <Text>Father / Spouse:</Text>
      <TextInput
        value={form.fatherSpouse}
        onChangeText={(text) => setForm({ ...form, fatherSpouse: text })}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      {/* Household Type */}
      <Text>Type of Households:</Text>
      {["Nuclear", "Joint"].map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={form.householdType === item ? "checked" : "unchecked"}
          onPress={() => setForm({ ...form, householdType: item })}
        />
      ))}

      <Text>Household Members - Adults:</Text>
      <TextInput
        value={form.adults}
        onChangeText={(text) => setForm({ ...form, adults: text })}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        keyboardType="numeric"
      />

      <Text>Household Members - Children:</Text>
      <TextInput
        value={form.children}
        onChangeText={(text) => setForm({ ...form, children: text })}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        keyboardType="numeric"
      />

      {/* Occupation */}
      <Text>Occupation of HH members:</Text>
      {["Agriculture", "Business", "Other"].map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={form.occupation.includes(item) ? "checked" : "unchecked"}
          onPress={() => toggleCheckbox("occupation", item)}
        />
      ))}

      {/* Caste */}
      <Text>Caste:</Text>
      {["OC", "OBC", "SC", "ST"].map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={form.caste === item ? "checked" : "unchecked"}
          onPress={() => setForm({ ...form, caste: item })}
        />
      ))}

      {/* House Ownership */}
      <Text>House Ownership:</Text>
      {["Rented", "Owned"].map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={form.houseOwnership === item ? "checked" : "unchecked"}
          onPress={() => setForm({ ...form, houseOwnership: item })}
        />
      ))}

      {/* Drinking Water Source */}
      <Text>Drinking Water Source:</Text>
      {["Ponds", "Well & Borewells", "Trucks"].map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={form.drinkingWater.includes(item) ? "checked" : "unchecked"}
          onPress={() => toggleCheckbox("drinkingWater", item)}
        />
      ))}

      {/* Toilet Availability */}
      <Text>Toilet Availability:</Text>
      {["Yes", "No"].map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={form.toiletAvailability === item ? "checked" : "unchecked"}
          onPress={() => setForm({ ...form, toiletAvailability: item })}
        />
      ))}

      {/* Education */}
      <Text>Education of Householder:</Text>
      {["Illiterate", "Primary", "Secondary", "University"].map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={form.education === item ? "checked" : "unchecked"}
          onPress={() => setForm({ ...form, education: item })}
        />
      ))}

      {/* Next Button */}
      <Button title="Next" onPress={handleNext} />
    </ScrollView>
  );
}
