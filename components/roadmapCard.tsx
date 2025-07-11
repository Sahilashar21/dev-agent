import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../constants/theme'; // 🌓 dark/light mode hook

interface Props {
  title: string;
  description: string;
  path: string; // ✅ works for any roadmap
}

const RoadmapCard: React.FC<Props> = ({ title, description, path }) => {
  const router = useRouter();
  const { colors } = useTheme(); // 🎨 dynamic theme colors

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card, borderLeftColor: colors.accent }]}
      onPress={() => router.push(`/roadmap/${path}` as any)}
    >
      <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      <Text style={[styles.desc, { color: colors.textSecondary }]}>{description}</Text>
    </TouchableOpacity>
  );
};

export default RoadmapCard;

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  desc: {
    marginTop: 6,
    fontSize: 14,
  },
});
