import { useRouter } from "expo-router";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { useFormStore } from "./useFormStore";
import { Card, Text, Button, Divider } from "react-native-paper";

export default function Preview() {
  const router = useRouter();
  const { data } = useFormStore();

  // Function to handle form submission
  const handleSubmit = () => {
    Alert.alert("Success", "Form Successfully Submitted!", [
      { text: "OK", onPress: () => router.push("/dashboard") }
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Basic Details Section */}
      <Card style={styles.card}>
        <Card.Title title="Preview Details" />
        <Card.Content>
          <View style={styles.row}>
            <Text variant="titleMedium" style={styles.sectionTitle}>Basic Details</Text>
            <Button mode="outlined" onPress={() => router.push("/landform/basicDetails.tsx")}>Edit</Button>
          </View>
          <Text>Name: {data.basicDetails?.name}</Text>
          <Text>Age: {data.basicDetails?.age}</Text>
          <Divider style={styles.divider} />

          {/* Land Ownership Section */}
          <View style={styles.row}>
            <Text variant="titleMedium" style={styles.sectionTitle}>Land Ownership</Text>
            <Button mode="outlined" onPress={() => router.push("./landOwnership")}>Edit</Button>
          </View>
          <Text>Land Size: {data.landOwnership?.landSize}</Text>
          <Text>Livestock: {data.landOwnership?.livestock}</Text>
          <Divider style={styles.divider} />

          {/* Land Development Section */}
          <View style={styles.row}>
            <Text variant="titleMedium" style={styles.sectionTitle}>Land Development</Text>
            <Button mode="outlined" onPress={() => router.push("./landDevelopment")}>Edit</Button>
          </View>
          <Text>Irrigation Type: {data.landDevelopment?.irrigation}</Text>
          <Text>Crops Grown: {data.landDevelopment?.crops}</Text>
          <Divider style={styles.divider} />

          {/* Bank Details Section */}
          <View style={styles.row}>
            <Text variant="titleMedium" style={styles.sectionTitle}>Bank Details</Text>
            <Button mode="outlined" onPress={() => router.push("./bankDetails")}>Edit</Button>
          </View>
          <Text>Account Number: {data.bankDetails?.accountNumber}</Text>
          <Text>IFSC Code: {data.bankDetails?.ifscCode}</Text>
        </Card.Content>
      </Card>

      {/* Submit Button */}
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleSubmit}>Submit</Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  card: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  sectionTitle: {
    fontWeight: "bold",
  },
  divider: {
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
