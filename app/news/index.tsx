import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { WebView } from "react-native-webview";

// ---------------- Types ----------------
interface User {
  name: string;
  profile_image: string;
}

interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string | null;
  tags?: string; // <-- FIX: Dev.to returns comma-separated string
  reading_time_minutes: number;
  published_at: string;
  user: User;
}

// Placeholder image URL for articles without cover image
const PLACEHOLDER_IMAGE =
  "https://via.placeholder.com/100x100.png?text=No+Image";

// Helper to format published date nicely
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// ---------------- Component ----------------
const NewsScreen: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Filters & Search
  const [category, setCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("latest");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [articles, category, sortBy, searchQuery]);

  const fetchArticles = async () => {
    try {
      const webdevRes = await fetch("https://dev.to/api/articles?tag=webdev");
      const dsaRes = await fetch("https://dev.to/api/articles?tag=dsa");

      const webdevData: Article[] = await webdevRes.json();
      const dsaData: Article[] = await dsaRes.json();

      setArticles([...webdevData, ...dsaData]);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...articles];

    // Filter by category
    if (category !== "all") {
      filtered = filtered.filter((a) =>
        category === "webdev"
          ? a.tags?.includes("webdev")
          : a.tags?.includes("dsa")
      );
    }

    // Search filter
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sorting
    if (sortBy === "latest") {
      filtered.sort(
        (a, b) =>
          new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      );
    } else if (sortBy === "oldest") {
      filtered.sort(
        (a, b) =>
          new Date(a.published_at).getTime() - new Date(b.published_at).getTime()
      );
    } else if (sortBy === "reading") {
      filtered.sort((a, b) => a.reading_time_minutes - b.reading_time_minutes);
    }

    setFilteredArticles(filtered);
  };

  if (selectedArticle) {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => setSelectedArticle(null)}
          accessibilityLabel="Go back"
        >
          <Text style={styles.backText}>← Back to articles</Text>
        </TouchableOpacity>
        <WebView source={{ uri: selectedArticle.url }} style={{ flex: 1 }} />
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Loading latest Dev articles...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🚀 Dev & DSA News</Text>

      {/* Search Bar with icon */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.search}
          placeholder="Search articles..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          accessibilityLabel="Search articles"
        />
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterRow}>
        {["all", "webdev", "dsa"].map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.filterBtn, category === cat && styles.filterBtnActive]}
            onPress={() => setCategory(cat)}
          >
            <Text
              style={[styles.filterText, category === cat && styles.filterTextActive]}
            >
              {cat.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sorting Dropdown */}
      <Picker
        selectedValue={sortBy}
        onValueChange={(val) => setSortBy(val)}
        style={styles.picker}
      >
        <Picker.Item label="Latest" value="latest" />
        <Picker.Item label="Oldest" value="oldest" />
        <Picker.Item label="Reading Time" value="reading" />
      </Picker>

      {/* Articles List */}
      <FlatList
        data={filteredArticles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => setSelectedArticle(item)}
          >
            <Image
              source={{ uri: item.cover_image || PLACEHOLDER_IMAGE }}
              style={styles.image}
            />
            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc} numberOfLines={2}>
                {item.description}
              </Text>
              <View style={styles.tagsRow}>
                {(item.tags ? item.tags.split(",") : []).map((tag) => (
                  <View key={tag.trim()} style={styles.tag}>
                    <Text style={styles.tagText}>#{tag.trim()}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.author}>
                ✍️ {item.user.name} • ⏱ {item.reading_time_minutes}m • 📅{" "}
                {formatDate(item.published_at)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

// ---------------- Styles ----------------
const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: "#fff" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#000000ff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fafafa",
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 6,
    color: "#888",
  },
  search: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: "#333",
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    backgroundColor: "#eee",
  },
  filterBtnActive: { backgroundColor: "#4CAF50" },
  filterText: { fontWeight: "600", color: "#555" },
  filterTextActive: { color: "#fff" },
  picker: {
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 4, color: "#222" },
  desc: { fontSize: 14, color: "#555" },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6,
  },
  tag: {
    backgroundColor: "#e0f2f1",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: "#00796b",
    fontWeight: "600",
  },
  author: {
    marginTop: 6,
    fontSize: 12,
    color: "#666",
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 6,
  },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  backBtn: {
    padding: 12,
    backgroundColor: "#000000ff",
    alignItems: "center",
  },
  backText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default NewsScreen;
