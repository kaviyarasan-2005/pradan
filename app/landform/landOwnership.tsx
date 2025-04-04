import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useFormStore } from "./useFormStore";

export default function LandOwnership() {
  const router = useRouter();
  const { data, setData } = useFormStore();
  const [form, setForm] = useState(data.landOwnership || { landSize: "", livestock: "" });

  const handleNext = () => {
    setData({ landOwnership: form });
    router.push("./landDevelopment");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Land Size:</Text>
      <TextInput
        value={form.landSize}
        onChangeText={(text) => setForm({ ...form, landSize: text })}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Text>Livestock:</Text>
      <TextInput
        value={form.livestock}
        onChangeText={(text) => setForm({ ...form, livestock: text })}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
}
