import axios from "axios";
import { useState } from "react";
import {
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { WebView } from "react-native-webview";
import GeminiChat from "../chat/TutorialFeedback";

const YOUTUBE_API_KEY = "AIzaSyAd9P05ulxkYmvq6ildp36uWUvefE8d4MQ";

type YouTubeVideo = {
  id: { videoId: string };
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: { medium: { url: string } };
  };
};

const TutorialsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [reflection, setReflection] = useState("");

  const skillOptions = ["Beginner", "Intermediate", "Advanced"];

  const fetchVideos = async () => {
    if (!searchQuery || !skillLevel) {
      alert("Enter query & select skill level");
      return;
    }

    try {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchQuery}+${skillLevel}&type=video&key=${YOUTUBE_API_KEY}`
      );
      setVideos(res.data.items);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch videos");
    }
  };

  const renderVideoItem = ({ item }: { item: YouTubeVideo }) => (
    <TouchableOpacity
      style={styles.videoCard}
      onPress={() => {
        setSelectedVideo(item);
        setReflection("");
      }}
    >
      <Image
        source={{ uri: item.snippet.thumbnails.medium.url }}
        style={styles.thumbnail}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.videoTitle}>{item.snippet.title}</Text>
        <Text style={styles.channelName}>{item.snippet.channelTitle}</Text>
      </View>
    </TouchableOpacity>
  );

  if (selectedVideo) {
    const aiPrompt = `
  You are Dev Agent AI – a coding mentor.
  Skill level: ${skillLevel}
  Video: https://www.youtube.com/watch?v=${selectedVideo.id.videoId}
  User explanation: ${reflection}
  You are a friendly tutor AI. Address the learner directly as "You" and "Your" in all explanations and feedback.

  Tasks:
  1. Analyze video content
  2. Evaluate understanding and Check whether it aligns with Video content
  3. Understand User ${skillLevel}
  4. Correct mistakes/gaps
  5. Give improved explanation
  6. Suggest next steps
  `;

    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: `https://www.youtube.com/embed/${selectedVideo.id.videoId}` }}
          style={{ flex: 1 }}
        />
        <ScrollView style={styles.reflectionContainer}>
          <Text style={styles.label}>What did you learn?</Text>
          <TextInput
            value={reflection}
            onChangeText={setReflection}
            placeholder="Type your answer here..."
            style={styles.reflectionInput}
            multiline
          />
          <GeminiChat
            prompt={aiPrompt}
            disabled={!reflection.trim()}
            skillLevel={skillLevel} // <-- add this
            videoTitle={selectedVideo.snippet.title}
          />

          <Button
            title="Back to Search"
            onPress={() => setSelectedVideo(null)}
            color="gray"
          />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search Tutorials</Text>
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search topic..."
        style={styles.searchInput}
      />
      <View style={styles.skillContainer}>
        {skillOptions.map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.skillButton,
              skillLevel === level && styles.skillSelected,
            ]}
            onPress={() => setSkillLevel(level)}
          >
            <Text style={[styles.skillText, skillLevel === level && { color: "#fff" }]}>
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button title="Search" onPress={fetchVideos} />
      <FlatList
        data={videos}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id.videoId}
        style={{ marginTop: 10 }}
      />
    </View>
  );
};

export default TutorialsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  heading: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  skillContainer: { flexDirection: "row", marginBottom: 10 },
  skillButton: {
    padding: 8,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginRight: 8,
  },
  skillSelected: { backgroundColor: "#3D5AFE" },
  skillText: { color: "#000" },
  videoCard: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  thumbnail: { width: 120, height: 90, borderRadius: 6, marginRight: 10 },
  videoTitle: { fontSize: 14, fontWeight: "bold" },
  channelName: { fontSize: 12, color: "#555" },
  reflectionContainer: { padding: 10, backgroundColor: "#fff" },
  label: { fontWeight: "bold", marginBottom: 5 },
  reflectionInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    height: 80,
    marginBottom: 10,
  },
});
