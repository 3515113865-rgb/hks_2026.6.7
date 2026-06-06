/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Theme configuration representing the Dark Sports Tech design system tokens
export const themeConfig = {
  name: "Yuren Badminton AI",
  colors: {
    background: "#0A0A0A",
    surface: "#131313",
    surfaceDim: "#131313",
    surfaceBright: "#3a3939",
    surfaceContainerLowest: "#0e0e0e",
    surfaceContainerLow: "#1c1b1b",
    surfaceContainer: "#201f1f",
    surfaceContainerHigh: "#2a2a2a",
    surfaceContainerHighest: "#353534",
    onSurface: "#e5e2e1",
    onSurfaceVariant: "#c4c9ac",
    inverseSurface: "#e5e2e1",
    inverseOnSurface: "#313030",
    outline: "#8e9379",
    outlineVariant: "#444933",
    primary: "#ffffff",
    onPrimary: "#283500",
    primaryContainer: "#c3f400", // High visibility fluorescent green
    onPrimaryContainer: "#556d00",
    secondary: "#bdf4ff",
    onSecondary: "#00363d",
    secondaryContainer: "#00e3fd", // Digital intelligence cyan blue
    onSecondaryContainer: "#00616d",
    tertiary: "#ffffff",
    tertiaryContainer: "#ffe16d", // Alert warning gold
    onTertiaryContainer: "#776300",
    error: "#ffb4ab",
    errorContainer: "#93000a",
  },
  typography: {
    displayLg: {
      fontFamily: "Sora",
      fontSize: 48,
      fontWeight: "800",
      lineHeight: 56,
      letterSpacing: -0.02,
    },
    headlineLg: {
      fontFamily: "Sora",
      fontSize: 32,
      fontWeight: "700",
      lineHeight: 40,
    },
    headlineLgMobile: {
      fontFamily: "Sora",
      fontSize: 24,
      fontWeight: "700",
      lineHeight: 32,
    },
    headlineMd: {
      fontFamily: "Sora",
      fontSize: 20,
      fontWeight: "600",
      lineHeight: 28,
    },
    bodyLg: {
      fontFamily: "Geist",
      fontSize: 18,
      fontWeight: "400",
      lineHeight: 28,
    },
    bodyMd: {
      fontFamily: "Geist",
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 24,
    },
    labelCaps: {
      fontFamily: "JetBrains Mono",
      fontSize: 12,
      fontWeight: "500",
      lineHeight: 16,
      letterSpacing: 0.1,
    },
    dataNumeric: {
      fontFamily: "JetBrains Mono",
      fontSize: 24,
      fontWeight: "700",
      lineHeight: 32,
    }
  },
  rounded: {
    sm: 8,
    default: 16,
    md: 24,
    lg: 32,
    xl: 48,
    full: 9999,
  },
  spacing: {
    unit: 4,
    containerPadding: 20,
    stackGap: 16,
    sectionGap: 32,
    innerPadding: 12,
  }
};
