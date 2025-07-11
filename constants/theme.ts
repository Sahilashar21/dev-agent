import { useColorScheme } from 'react-native';

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const colors = {
    background: isDark ? '#121212' : '#f2f4f8',
    card: isDark ? '#1e1e1e' : '#ffffff',
    textPrimary: isDark ? '#ffffff' : '#1a1a1a',
    textSecondary: isDark ? '#cccccc' : '#444444',
    accent: isDark ? '#90CAF9' : '#3D5AFE',
    link: isDark ? '#82B1FF' : '#007BFF',
    danger: isDark ? '#FF6E6E' : '#E53935',
  };

  return { isDark, colors };
};
