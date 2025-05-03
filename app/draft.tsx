import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Button, IconButton } from 'react-native-paper';
import { useFormStore } from '../storage/useFormStore'; // adjust path as needed

export default function DraftsScreen() {
  const [drafts, setDrafts] = useState([]);
  const router = useRouter();
  const { setData, submitForm } = useFormStore();

  useEffect(() => {
    const fetchDrafts = async () => {
      const data = await AsyncStorage.getItem('draftForms');
      setDrafts(data ? JSON.parse(data) : []);
    };
    fetchDrafts();
  }, []);

  const openDraft = (item) => {
    // Store draft data in the form store
    setData("basicDetails", item.basicDetails);
    setData("landOwnership", item.landOwnership);
    setData("landDevelopment", item.landDevelopment);
    setData("bankDetails", item.bankDetails);
    setData("id", item.id);
    setData("formType", item.formType);
    setData("formStatus", item.formStatus ?? "Draft");
  
    // Now navigate — no need to pass id anymore
    router.push("/landform/Preview");
  };
  

  const uploadAllDrafts = async () => {
    try {
      for (let draft of drafts) {
        // Set form data in the store
        setData("basicDetails", draft.basicDetails);
        setData("landOwnership", draft.landOwnership);
        setData("landDevelopment", draft.landDevelopment);
        setData("bankDetails", draft.bankDetails);
        setData("id", draft.id); // so submitForm updates instead of inserts
        setData("formType", draft.formType);
        setData("formStatus", draft.formStatus);

        await submitForm();
      }

      await AsyncStorage.removeItem('draftForms');
      setDrafts([]);
      Alert.alert('Success', 'All drafts uploaded to submitted forms');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to upload drafts');
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <IconButton icon="arrow-left" size={24} onPress={() => router.back()} />
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Draft Forms</Text>

      <FlatList
        data={drafts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => openDraft(item)}
            style={{
              padding: 12,
              borderBottomWidth: 1,
              borderColor: '#ccc',
              backgroundColor: '#f9f9f9',
              borderRadius: 6,
              marginBottom: 8,
            }}
          >
            <Text style={{ fontSize: 16 }}>
              {item.basicDetails.name?.trim()}
            </Text>
            {item.savedAt && (
              <Text style={{ color: 'gray', fontSize: 12 }}>
                Saved on: {new Date(item.savedAt).toLocaleString()}
              </Text>
            )}
          </TouchableOpacity>
        )}
      />

      {drafts.length > 0 && (
        <Button
          mode="contained"
          onPress={uploadAllDrafts}
          style={{ marginTop: 20 }}
        >
          Upload All Drafts
        </Button>
      )}
    </View>
  );
}
