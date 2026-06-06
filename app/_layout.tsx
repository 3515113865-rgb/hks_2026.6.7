/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';

// Prevent splash screen from auto-hiding until assets are loaded
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Sora: require('../assets/fonts/Sora.ttf'),
    Geist: require('../assets/fonts/Geist.ttf'),
    JetBrainsMono: require('../assets/fonts/JetBrainsMono.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  // Custom theme reflecting our Dark Sports Tech brand system
  const customDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#0A0A0A',
      primary: '#c3f400', // fluorescent green
      card: '#131313',    // surface dim
      text: '#e5e2e1',    // on-surface grey
      border: '#444933',  // outline variant
    },
  };

  return (
    <ThemeProvider value={customDarkTheme}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
      <Stack
        screenOptions={{
          headerShown: false, // Turn off native headers to leverage our custom high-tech UI bar
          animation: 'fade_from_bottom',
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="analysis/index" options={{ presentation: 'transparentModal' }} />
        <Stack.Screen name="analysis/loading" options={{ gestureEnabled: false }} />
        <Stack.Screen name="analysis/report" />
        <Stack.Screen name="equipment" />
        <Stack.Screen name="growth-map" options={{ animation: 'slide_from_right' }} />
      </Stack>
    </ThemeProvider>
  );
}
