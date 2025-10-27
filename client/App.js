import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';

// Screens
import Home from './src/screens/Home';
import UrlCheck from './src/screens/UrlCheck';
import SmsCheck from './src/screens/SmsCheck';
import History from './src/screens/History';
import Settings from './src/screens/Settings';
import ScanAnalytics from './src/screens/ScanAnalytics'; // ✅ added

const Stack = createNativeStackNavigator();

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#3B82F6',
    secondary: '#64748B',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    text: '#0F172A',
    placeholder: '#94A3B8',
  },
  roundness: 12,
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={theme.colors.background}
        />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
  headerShown: false, // 👈 hides the default header across all screens
  headerStyle: { backgroundColor: theme.colors.surface },
  headerTitleStyle: { color: theme.colors.text, fontWeight: '600' },
  headerShadowVisible: false,
  contentStyle: { backgroundColor: theme.colors.background },
}}

        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: 'TrustGuard AI' }}
          />
          <Stack.Screen name="UrlCheck" component={UrlCheck} />
          <Stack.Screen name="SmsCheck" component={SmsCheck} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="ScanAnalytics" component={ScanAnalytics} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
