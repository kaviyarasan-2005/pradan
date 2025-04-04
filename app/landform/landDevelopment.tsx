import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useFormStore } from "./useFormStore";

export default function LandDevelopment() {
  const router = useRouter();
  const { data, setData } = useFormStore();
  const [form, setForm] = useState(data.landDevelopment || { irrigation: "", crops: "" });

  const handleNext = () => {
    setData({ landDevelopment: form });
    router.push("./bankDetails");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Irrigation Type:</Text>
      <TextInput
        value={form.irrigation}
        onChangeText={(text) => setForm({ ...form, irrigation: text })}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Text>Crops Grown:</Text>
      <TextInput
        value={form.crops}
        onChangeText={(text) => setForm({ ...form, crops: text })}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
}
