import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router"; // Correct way to navigate in Expo Router

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Use router instead of navigation

  const handleLogin = async () => {
    if (username === "123" && password === "123") {
      await AsyncStorage.setItem("user", "loggedIn");
      router.replace("/dashboard"); // Correct navigation for Expo Router
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput 
        placeholder="Enter ID"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput 
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <View style={styles.buttonSpacing} />
      <Button title="Login" onPress={handleLogin} color="green" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: "80%",
    marginVertical: 10,
  },
  buttonSpacing: {
    margin: 10,
  },
});
