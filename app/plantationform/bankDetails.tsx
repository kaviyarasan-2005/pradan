import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TextInput, StyleSheet } from "react-native";
import { Checkbox, Button, IconButton } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from "expo-document-picker";
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
      submittedFiles: initial.submittedFiles || {
        patta: null,
        idCard: null,
        fmb: null,
        farmerPhoto: null,
        bankPassbook: null,
        geoTag: null,
      },
    };
  });
  
  const handleUpload = async (field, fileType = "pdf") => {
    try {
      // Only open camera if it's the "Photo of Farmer"
      if (fileType === "image" && field === "farmerPhoto") {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
          alert("Camera permission is required to take a photo.");
          return;
        }
  
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 0.7,
        });
  
        if (!result.canceled && result.assets?.[0]) {
          const file = result.assets[0];
          setForm((prev) => ({
            ...prev,
            submittedFiles: {
              ...prev.submittedFiles,
              [field]: {
                name: file.fileName || `${field}.jpg`,
                uri: file.uri,
              },
            },
          }));
        }
      } else {
        // Open document picker for everything else
        const result = await DocumentPicker.getDocumentAsync({
          type: fileType === "image" ? "image/*" : "application/pdf",
        });
  
        if (!result.canceled && result.assets?.[0]) {
          const file = result.assets[0];
          setForm((prev) => ({
            ...prev,
            submittedFiles: {
              ...prev.submittedFiles,
              [field]: {
                name: file.name,
                uri: file.uri,
              },
            },
          }));
        }
      }
    } catch (err) {
      console.log(`Upload error for ${field}:`, err);
    }
  };
  

  const handlePreview = () => {
    setData({ bankDetails: form });
    router.push("./Preview");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <IconButton
        icon="arrow-left"
        size={24}
        style={styles.backButton}
        onPress={() => router.back()}
      />

      <Text style={styles.title}>Plantation Form</Text>
      <Text style={styles.subtitle}>Bank Details</Text>

      <Text style={styles.question}>44. Name of Account Holder:</Text>
      <TextInput
        value={form.accountHolderName}
        onChangeText={(text) =>
          setForm({ ...form, accountHolderName: text })
        }
        style={styles.input}
      />

      <Text style={styles.question}>45. Account Number:</Text>
      <TextInput
        value={form.accountNumber}
        onChangeText={(text) =>
          setForm({ ...form, accountNumber: text })
        }
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.question}>46. Name of the Bank:</Text>
      <TextInput
        value={form.bankName}
        onChangeText={(text) =>
          setForm({ ...form, bankName: text })
        }
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

      <Text style={styles.question}>
        49. Farmer has agreed for the work and his contribution:
      </Text>
      {["Yes", "No"].map((option) => (
        <Checkbox.Item
          key={option}
          label={option}
          status={form.farmerAgreed === option ? "checked" : "unchecked"}
          onPress={() => setForm({ ...form, farmerAgreed: option })}
        />
      ))}

      <Text style={styles.question}>50. Upload Documents:</Text>

      {[
        { label: "Patta", key: "patta", type: "pdf" },
        { label: "ID Card", key: "idCard", type: "pdf" },
        { label: "FMB", key: "fmb", type: "pdf" },
        { label: "Photo of Farmer", key: "farmerPhoto", type: "image" },
        { label: "Bank Passbook", key: "bankPassbook", type: "pdf" },
        { label: "Geo Tag", key: "geoTag", type: "image" },
      ].map((file) => (
        <React.Fragment key={file.key}>
          <Button
            mode="outlined"
            onPress={() => handleUpload(file.key, file.type)}
            style={styles.uploadButton}
          >
            Upload {file.label}
          </Button>
          {form.submittedFiles[file.key]?.name ? (
            <Text style={styles.uploadedFile}>
              Uploaded: {form.submittedFiles[file.key].name}
            </Text>
          ) : null}
        </React.Fragment>
      ))}

      <Button
        mode="contained"
        onPress={handlePreview}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        Preview
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  backButton: { alignSelf: "flex-start", marginBottom: 10 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center" },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  question: { fontWeight: "bold", marginTop: 10 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  uploadButton: {
    marginVertical: 5,
  },
  uploadedFile: {
    fontStyle: "italic",
    marginBottom: 10,
    color: "green",
  },
  button: { marginTop: 20 },
  buttonContent: { paddingVertical: 10 },
});
