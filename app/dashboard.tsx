import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

export default function Dashboard() {
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const slideAnim = useState(new Animated.Value(-200))[0];

  const toggleSidebar = () => {
    const toValue = sidebarVisible ? -200 : 0;
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setSidebarVisible(!sidebarVisible);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      {/* Top bar with hamburger */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Ionicons name="menu" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Dashboard</Text>
      </View>

      {/* Sidebar */}
      <Animated.View style={[styles.sidebar, { left: slideAnim }]}>
        <TouchableOpacity onPress={() => router.replace("/dashboard")}>
          <Text style={styles.sidebarItem}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/settings")}>
          <Text style={styles.sidebarItem}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={[styles.sidebarItem, { color: "red" }]}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Main content */}
      <View style={styles.mainContent}>
        <Text style={styles.title}>Welcome to Dashboard</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/totalSubmit")}
        >
          <Text style={styles.buttonText}>Total Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/pending")}
        >
          <Text style={styles.buttonText}>Pending</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/approved")}
        >
          <Text style={styles.buttonText}>Approved</Text>
        </TouchableOpacity>

        {/* New Form Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowFormModal(true)}
        >
          <Text style={styles.buttonText}>New Form</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet Modal */}
      {/* Bottom Sheet Modal */}
<Modal
  visible={showFormModal}
  animationType="slide"
  transparent
  onRequestClose={() => setShowFormModal(false)}
>
  <View style={styles.modalOverlay}>
    <TouchableOpacity
      style={styles.overlayTouchable}
      activeOpacity={1}
      onPressOut={() => setShowFormModal(false)}
    />
    <View style={styles.bottomSheet}>
      <TouchableOpacity
        style={styles.modalButton}
        onPress={() => {
          setShowFormModal(false);
          router.push("/landform/basicDetails.tsx");
        }}
      >
        <Text style={styles.modalButtonText}>Land Form</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.modalButton}
        onPress={() => {
          setShowFormModal(false);
          router.push("/pondform/pondform");
        }}
      >
        <Text style={styles.modalButtonText}>Pond Form</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.modalButton}
        onPress={() => {
          setShowFormModal(false);
          router.push("/plantationform/plantationform");
        }}
      >
        <Text style={styles.modalButtonText}>Plantation Form</Text>
      </TouchableOpacity>

      {/* Cancel Button */}
      <TouchableOpacity
        style={[styles.modalButton, { backgroundColor: "gray" }]}
        onPress={() => setShowFormModal(false)}
      >
        <Text style={styles.modalButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#eaeaea",
  },
  topTitle: {
    marginLeft: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  sidebar: {
    position: "absolute",
    top: 60,
    bottom: 0,
    width: 200,
    backgroundColor: "#f0f0f0",
    paddingTop: 20,
    paddingLeft: 10,
    zIndex: 1,
  },
  sidebarItem: {
    fontSize: 16,
    marginVertical: 15,
    color: "blue",
  },
  overlayTouchable: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  bottomSheet: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  modalButton: {
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 10,
    marginVertical: 5,
  },
  modalButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  cancelButton: {
    padding: 15,
    backgroundColor: "red",
    borderRadius: 10,
    marginTop: 10,
  },
  cancelButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});

