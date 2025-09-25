// import { useEffect, useState } from "react";
// import { FlatList, StyleSheet, Text, View } from "react-native";

// export default function LeaderboardScreen() {
//   const [leaders, setLeaders] = useState([]);

//   useEffect(() => {
//     fetch("http://10.2.2.0:5000/leaderboard")
//       .then((res) => res.json())
//       .then(setLeaders)
//       .catch(console.error);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🏆 Leaderboard</Text>
//       <FlatList
//         data={leaders}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item, index }) => (
//           <Text style={styles.item}>
//             #{index + 1} {item.} - {item.solvedCount} pts
//           </Text>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
//   item: { fontSize: 16, marginBottom: 5 },
// });



import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

type Leader = {
  email: string;
  solvedCount: number;
};

export default function LeaderboardScreen() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("http://10.0.2.2:5000/leaderboard"); // use your PC's local IP or 10.0.2.2 for Android emulator
        const data = await res.json();
        setLeaders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Leaderboard</Text>
      <FlatList
        data={leaders.sort((a, b) => b.solvedCount - a.solvedCount)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Text style={styles.item}>
            #{index + 1} {item.email} - {item.solvedCount} pts
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F9FAFB" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  item: { fontSize: 16, marginBottom: 5 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
