import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function LeaderboardScreen() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/leaderboard")
      .then((res) => res.json())
      .then(setLeaders)
      .catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Leaderboard</Text>
      <FlatList
        data={leaders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Text style={styles.item}>
            #{index + 1} {item.name} - {item.solvedCount} pts
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  item: { fontSize: 16, marginBottom: 5 },
});
