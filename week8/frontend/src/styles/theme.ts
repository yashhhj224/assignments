
export const theme = {
  colors: {
    background: "#0b0f19",
    surface: "#111827",
    surfaceLight: "#1f2937",
    border: "#2a3647",

    primary: "#3b82f6",
    danger: "#ef4444",

    textPrimary: "#ffffff",
    textSecondary: "#cbd5e1",
    textMuted: "#94a3b8"
  },

  spacing: {
    xs: "6px",
    sm: "10px",
    md: "14px",
    lg: "18px",
    xl: "26px"
  },

  radius: {
    sm: "8px",
    md: "12px",
    lg: "18px"
  },

  fontSize: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "20px",
    xl: "26px"
  },

  shadow: {
    card: "0px 4px 20px rgba(0,0,0,0.35)"
  }
} as const;

export type ThemeType = typeof theme;
