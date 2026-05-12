/**
 * Theme tokens / design system constants.
 * Centralizes all color, spacing, and animation values
 * so the entire app maintains visual consistency.
 */

export const theme = {
  colors: {
    // Backgrounds
    bg: {
      primary: '#0a0a0f',      // near-black base
      secondary: '#111118',    // card backgrounds
      tertiary: '#16161f',     // elevated surfaces
      sidebar: '#0d0d14',      // sidebar background
      hover: '#1a1a25',        // hover states
      input: '#13131c',        // input fields
    },
    // Accent colors
    accent: {
      blue: '#00d4ff',         // neon cyan-blue
      blueMuted: '#00d4ff20',  // blue glow
      green: '#00e68a',        // emerald green (profit)
      greenMuted: '#00e68a20', // green glow
      red: '#ff4757',          // loss red
      redMuted: '#ff475720',   // red glow
      purple: '#a78bfa',       // secondary accent
      amber: '#fbbf24',        // warning / neutral
    },
    // Text
    text: {
      primary: '#f0f0f5',      // primary text
      secondary: '#8b8b9e',    // muted text
      tertiary: '#5a5a6e',     // disabled / placeholder
    },
    // Borders
    border: {
      default: '#1e1e2e',      // subtle borders
      hover: '#2a2a3e',        // hover borders
      glow: '#00d4ff30',       // glowing borders
    },
  },

  // Box shadow presets
  shadows: {
    card: '0 0 0 1px rgba(30, 30, 46, 0.5), 0 4px 24px rgba(0, 0, 0, 0.4)',
    cardHover: '0 0 0 1px rgba(0, 212, 255, 0.2), 0 8px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 212, 255, 0.05)',
    glow: '0 0 20px rgba(0, 212, 255, 0.15)',
    glowGreen: '0 0 20px rgba(0, 230, 138, 0.15)',
  },

  // Animation durations
  animation: {
    fast: 0.15,
    normal: 0.25,
    slow: 0.4,
  },

  // Border radius presets
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
  },
};
