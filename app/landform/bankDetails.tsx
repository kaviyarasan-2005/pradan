import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useFormStore } from "./useFormStore";

export default function BankDetails() {
  const router = useRouter();
  const { data, setData } = useFormStore();
  const [form, setForm] = useState(data.bankDetails || { accountNumber: "", ifscCode: "" });

  const handlePreview = () => {
    setData({ bankDetails: form });
    router.push("./Preview");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Account Number:</Text>
      <TextInput
        value={form.accountNumber}
        onChangeText={(text) => setForm({ ...form, accountNumber: text })}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Text>IFSC Code:</Text>
      <TextInput
        value={form.ifscCode}
        onChangeText={(text) => setForm({ ...form, ifscCode: text })}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Preview" onPress={handlePreview} />
    </View>
  );
}
