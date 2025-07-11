import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import RoadmapCard from '@/components/roadmapCard';
import { useTheme } from '@/constants/theme';

import { frontendRoadmap } from '@/data/frontendRoadmap';
import { backendRoadmap } from '@/data/backendRoadmap';
import { fullstackRoadmap } from '@/data/fullstackRoadmap';
import { dsaRoadmap } from '@/data/dsaRoadmap';
import { RoadmapStep } from '@/types'; // ✅ import type

const roadmapOptions = [
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend', value: 'backend' },
  { label: 'Full Stack', value: 'fullstack' },
  { label: 'DSA', value: 'dsa' },
];

export default function RoadmapSelector() {
  const { colors } = useTheme();
  const [selected, setSelected] = useState<'frontend' | 'backend' | 'fullstack' | 'dsa'>('frontend');

  let data: RoadmapStep[] = frontendRoadmap;
  if (selected === 'backend') data = backendRoadmap;
  else if (selected === 'fullstack') data = fullstackRoadmap;
  else if (selected === 'dsa') data = dsaRoadmap;

  return (
    <ScrollView style={{ padding: 20, backgroundColor: colors.background }}>
      <Text style={{ fontSize: 20, fontWeight: '700', color: colors.textPrimary, marginBottom: 10 }}>
        Select a Roadmap
      </Text>

      <RNPickerSelect
        value={selected}
        onValueChange={(value: 'frontend' | 'backend' | 'fullstack' | 'dsa') => setSelected(value)}
        items={roadmapOptions}
        style={{
          inputIOS: {
            fontSize: 16,
            padding: 12,
            backgroundColor: colors.card,
            color: colors.textPrimary,
            borderRadius: 10,
            marginBottom: 20,
          },
          inputAndroid: {
            fontSize: 16,
            padding: 12,
            backgroundColor: colors.card,
            color: colors.textPrimary,
            borderRadius: 10,
            marginBottom: 20,
          },
        }}
      />

      {data.map((step, idx) => (
        <RoadmapCard
          key={idx}
          title={step.title}
          description={step.description}
          path={step.path}
        />
      ))}
    </ScrollView>
  );
}
