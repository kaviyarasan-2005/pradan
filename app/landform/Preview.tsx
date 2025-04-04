import { useRouter } from "expo-router";
import { View, Text, Button } from "react-native";
import { useFormStore } from "./useFormStore";

export default function Preview() {
  const router = useRouter();
  const { data } = useFormStore();

  return (
    <View style={{ padding: 20 }}>
      <Text>Review Your Details:</Text>
      <Text>{JSON.stringify(data, null, 2)}</Text>
      <Button title="Submit" onPress={() => alert("Form Submitted!")} />
    </View>
  );
}
