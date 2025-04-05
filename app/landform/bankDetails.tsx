import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TextInput, StyleSheet } from "react-native";
import { Checkbox, Button } from "react-native-paper";
import { useFormStore } from "./useFormStore";

export default function BankDetails() {
  const router = useRouter();
  const { data, setData } = useFormStore();

  const [form, setForm] = useState(() => {
    const initial = data.bankDetails || {};
    return {
      accountHolderName: initial.accountHolderName || "",
      accountNumber: initial.accountNumber || "",
      bankName: initial.bankName || "",
      branch: initial.branch || "",
      ifscCode: initial.ifscCode || "",
      farmerAgreed: initial.farmerAgreed || "",
      submittedFiles: initial.submittedFiles || [],
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

  const handlePreview = () => {
    setData({ bankDetails: form });
    router.push("./Preview");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Land Form</Text>
      <Text style={styles.subtitle}>Bank Details</Text>

      <Text style={styles.question}>44. Name of Account Holder:</Text>
      <TextInput
        value={form.accountHolderName}
        onChangeText={(text) => setForm({ ...form, accountHolderName: text })}
        style={styles.input}
      />

      <Text style={styles.question}>45. Account Number:</Text>
      <TextInput
        value={form.accountNumber}
        onChangeText={(text) => setForm({ ...form, accountNumber: text })}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.question}>46. Name of the Bank:</Text>
      <TextInput
        value={form.bankName}
        onChangeText={(text) => setForm({ ...form, bankName: text })}
        style={styles.input}
      />

      <Text style={styles.question}>47. Branch:</Text>
      <TextInput
        value={form.branch}
        onChangeText={(text) => setForm({ ...form, branch: text })}
        style={styles.input}
      />

      <Text style={styles.question}>48. IFSC:</Text>
      <TextInput
        value={form.ifscCode}
        onChangeText={(text) => setForm({ ...form, ifscCode: text })}
        style={styles.input}
        autoCapitalize="characters"
      />

      <Text style={styles.question}>49. Farmer has agreed for the work and his contribution:</Text>
      {["Yes", "No"].map((option) => (
        <Checkbox.Item
          key={option}
          label={option}
          status={form.farmerAgreed === option ? "checked" : "unchecked"}
          onPress={() => setForm({ ...form, farmerAgreed: option })}
        />
      ))}

      <Text style={styles.question}>50. Files submitted:</Text>
      {["Patta", "ID Card", "FMB", "Photo of Farmer", "Bank Passbook"].map((file) => (
        <Checkbox.Item
          key={file}
          label={file}
          status={form.submittedFiles.includes(file) ? "checked" : "unchecked"}
          onPress={() => toggleCheckbox("submittedFiles", file)}
        />
      ))}

      <Button mode="contained" onPress={handlePreview} style={styles.button} contentStyle={styles.buttonContent}>
        Preview
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
  buttonContent: { paddingVertical: 10 },
});
