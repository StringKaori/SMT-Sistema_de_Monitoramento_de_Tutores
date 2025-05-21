import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from '@routes/Stack/RootStack/RootStack';

export default function App() {
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
