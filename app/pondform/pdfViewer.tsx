import { useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";
import { View, StyleSheet } from "react-native";

export default function PdfViewer() {
  const { uri } = useLocalSearchParams();

  if (!uri) {
    return <Text>No file to display</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri }} style={{ flex: 1 }} />
    </View>
  );
}
