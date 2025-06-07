import { StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from '@routes/Stack/RootStack/RootStack';
import { useThemeStore } from 'app/theme/useThemeStore';
import { useEffect } from 'react';

export default function App() {
  const { width, height } = useWindowDimensions()
  const { setWidth, setHeight } = useThemeStore()

  useEffect(() => {
    setWidth(width),
    setHeight(height)
  }, [])
  return (
      <SafeAreaProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
