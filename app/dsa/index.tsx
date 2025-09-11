import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Topic = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  solvedCount: number;
};

export default function DSAScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const topics: Topic[] = [
    { id: "arrays", title: "Arrays", description: "Learn array operations, traversal, and algorithms", icon: "grid-outline" },
    { id: "linkedlist", title: "Linked List", description: "Singly, Doubly, Circular Linked Lists", icon: "git-branch-outline" },
    { id: "stacks", title: "Stacks & Queues", description: "Implement stack and queue operations", icon: "layers-outline" },
    { id: "trees", title: "Trees", description: "Binary trees, BST, and tree traversals", icon: "tree-outline" },
    { id: "graphs", title: "Graphs", description: "Graph representations, BFS, DFS", icon: "share-social-outline" },
    { id: "dp", title: "Dynamic Programming", description: "Optimize recursive solutions", icon: "bar-chart-outline" },
  ];

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (err) {
        console.error("Failed to load user:", err);
      }
    };
    loadUser();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header with title + profile icon */}
      <View style={styles.headerRow}>
        <Text style={styles.header}>DSA Mastery Hub</Text>
        <TouchableOpacity onPress={() => router.push("/dsa/profile")}>
          <Ionicons name="person-circle-outline" size={36} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* SubHeader */}
      <Text style={styles.subHeader}>
        Select a topic to start practicing DSA problems and earn points.
      </Text>

      {/* User solved stats */}
      {user && (
        <Text style={styles.userStats}>
          👋 {user.name}, you’ve solved{" "}
          <Text style={{ fontWeight: "bold" }}>{user.solvedCount}</Text> problems
        </Text>
      )}

      {/* Topic Cards */}
      {topics.map((topic) => (
        <TouchableOpacity
          key={topic.id}
          style={styles.card}
          onPress={() => router.push(`/dsa/${topic.id}`)}
        >
          <View style={styles.iconCircle}>
            <Ionicons name={topic.icon as any} size={24} color="#EC4899" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{topic.title}</Text>
            <Text style={styles.cardDesc}>{topic.description}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* Leaderboard Button */}
      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: "#3B82F6" }]}
        onPress={() => router.push("/dsa/leaderboard")}
      >
        <Text style={styles.buttonText}>View Leaderboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6", padding: 16 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1F2937",
  },
  subHeader: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
    textAlign: "center",
  },
  userStats: {
    fontSize: 15,
    color: "#374151",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEE2E2",
    marginRight: 12,
  },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#1F2937" },
  cardDesc: { fontSize: 13, color: "#6B7280", marginTop: 4 },
  actionButton: {
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});
