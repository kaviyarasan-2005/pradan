import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useFormStore } from "./useFormStore";

export default function BasicDetails() {
  const router = useRouter();
  const { data, setData } = useFormStore();
  const [form, setForm] = useState(data.basicDetails || { name: "", age: "" });

  const handleNext = () => {
    setData({ basicDetails: form });
    router.push("./landOwnership");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Name:</Text>
      <TextInput
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Text>Age:</Text>
      <TextInput
        value={form.age}
        onChangeText={(text) => setForm({ ...form, age: text })}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        keyboardType="numeric"
      />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
}
