import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type User = {
  id: string;
  name: string;
  email: string;
  solvedCount: number;
  rank?: number;
};

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const stored = await AsyncStorage.getItem("user");
        if (stored) {
          setUser(JSON.parse(stored));
        }
      } catch (err) {
        console.error("Error loading user:", err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    router.replace("/dsa/login");
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>No user logged in.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/dsa/login")}
        >
          <Text style={styles.buttonText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>👤 Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user.name}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email}</Text>

        <Text style={styles.label}>Solved Problems</Text>
        <Text style={styles.value}>{user.solvedCount}</Text>

        <Text style={styles.label}>Rank</Text>
        <Text style={styles.value}>
          {user.rank ? `#${user.rank}` : "Not Ranked"}
        </Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F9FAFB" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "#1F2937" },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  label: { fontSize: 14, fontWeight: "600", color: "#6B7280", marginTop: 10 },
  value: { fontSize: 16, color: "#111827", marginTop: 2 },
  button: {
    marginTop: 16,
    backgroundColor: "#3B82F6",
    padding: 12,
    borderRadius: 8,
  },
  logoutButton: {
    backgroundColor: "#EF4444",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600" },
  error: { fontSize: 16, color: "red" },
});
