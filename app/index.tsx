// app/index.tsx or HomeScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  type Feature = {
  title: string;
  description: string;
  color: string;
  icon: string;
  route?: "/roadmap" | "/chat" | "/quiz" | "/tutorials"; // etc.
  enabled: boolean;
};
  const features: Feature[] = [
    {
      title: "Roadmap",
      description: "Structured learning paths for different development domains",
      color: "#3B82F6",
      icon: "map-outline",
      route: "/roadmap",
      enabled: true,
    },
    {
      title: "Chat",
      description: "Get instant answers to your development questions",
      color: "#22C55E",
      icon: "chatbubbles-outline",
      route: "/chat",
      enabled: true,
    },
    {
      title: "Quiz",
      description: "Test your knowledge and track progress",
      color: "#8B5CF6",
      icon: "school-outline",
      route: "/quiz",
      enabled: true,
    },
    {
      title: "Interactive Tutorials",
      description: "Hands-on learning experiences to enhance your skills",
      color: "#F59E0B",
      icon: "desktop-outline",
      route: "/tutorials",
      enabled: true,
    },
    {
      title: "News Updates",
      description: "Stay updated with the latest in tech and development",
      color: "#EF4444",
      icon: "newspaper-outline",
      route: "/news",
      enabled: true,
    },
    
    {
      title: "DSA Mastery Hub",
      description: "Master Data Structures and Algorithms",
      color: "#EC4899",
      icon: "layers-outline",
      enabled: false,
    },
  ];

  return (
    
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.heroContainer}>
        <ImageBackground
          source={{ uri: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d" }}
          style={styles.heroImage}
        >
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Welcome to Dev Agent</Text>
            <Text style={styles.heroSubtitle}>
              Your smart companion for software development learning
            </Text>
          </View>
        </ImageBackground>
      </View>

      {/* Intro Text */}
      <Text style={styles.introText}>
        Dev Agent offers curated roadmaps, learning resources, real-world project ideas, and structured guidance for frontend, backend, fullstack, and DSA topics.
      </Text>

      {/* Feature Cards */}
      <View style={styles.grid}>
        {features.map((feature, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.card, !feature.enabled && styles.disabledCard]}
            onPress={() => feature.enabled && feature.route && router.push(feature.route)}
            disabled={!feature.enabled}
          >
            <View style={[styles.iconCircle, { backgroundColor: feature.color + "20" }]}>
              <Ionicons name={feature.icon as any} size={28} color={feature.color} />
            </View>
            <Text style={styles.cardTitle}>{feature.title}</Text>
            <Text style={styles.cardDesc}>{feature.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  heroContainer: { height: 200, marginBottom: 16 },
  heroImage: { flex: 1, justifyContent: "center" },
  heroOverlay: {
    flex: 1,
    backgroundColor: "rgba(37, 99, 235, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  heroTitle: { fontSize: 26, fontWeight: "bold", color: "#fff", textAlign: "center" },
  heroSubtitle: { fontSize: 16, color: "#E0E7FF", textAlign: "center", marginTop: 6 },
  introText: {
    fontSize: 15,
    color: "#374151",
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  disabledCard: { opacity: 0.5 },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#1F2937", marginBottom: 6 },
  cardDesc: { fontSize: 13, color: "#6B7280" },
});
