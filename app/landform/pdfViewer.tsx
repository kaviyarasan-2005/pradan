import React, { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as IntentLauncher from "expo-intent-launcher";
import * as FileSystem from "expo-file-system";
import { Alert, Platform } from "react-native";

export default function PdfViewer() {
  const { uri } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    const openPdf = async () => {
      try {
        const decodedUri = decodeURIComponent(uri as string);

        if (Platform.OS === "android") {
          IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
            data: decodedUri,
            flags: 1,
            type: "application/pdf",
          });
          router.back(); // Go back after launching
        } else {
          Alert.alert("Unsupported", "This preview method is Android only.");
        }
      } catch (err) {
        console.error("Error opening PDF:", err);
        Alert.alert("Error", "Could not open the PDF.");
      }
    };

    if (uri) openPdf();
  }, [uri]);

  return null;
}