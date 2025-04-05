import React from "react";
import { View, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { IconButton } from "react-native-paper";
import { WebView } from "react-native-webview";

export default function PDFViewer() {
  const router = useRouter();
  const { uri } = useLocalSearchParams();

  return (
    <View style={{ flex: 1 }}>
      <IconButton
        icon="arrow-left"
        size={24}
        style={styles.backButton}
        onPress={() => router.back()}
      />
      <WebView
        source={{ uri: uri as string }}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
});
