/**
 * Theme tokens / design system constants.
 * Centralizes all color, spacing, and animation values
 * so the entire app maintains visual consistency.
 * 
 * Note: These values are synced with src/index.css
 */

export const theme = {
  colors: {
    // Backgrounds
    bg: {
      primary: '#FFFBF1',      // page base
      secondary: '#FFFFFF',    // card backgrounds
      tertiary: '#F5F2EA',     // elevated surfaces
      sidebar: '#FFFFFF',      // sidebar background
      hover: '#F9F6EE',        // hover states
      input: '#FFFFFF',        // input fields
    },
    // Accent colors
    accent: {
      blue: '#2563EB',         
      blueMuted: '#2563EB15',  
      green: '#10B981',        
      greenMuted: '#10B98115', 
      red: '#EF4444',          
      redMuted: '#EF444415',   
      purple: '#8B5CF6',       
      amber: '#F59E0B',        
    },
    // Text
    text: {
      primary: '#1A1A1A',      // primary text
      secondary: '#64748B',    // muted text
      tertiary: '#94A3B8',     // disabled / placeholder
    },
    // Borders
    border: {
      default: '#E2E8F0',      // subtle borders
      hover: '#CBD5E1',        // hover borders
      glow: '#2563EB20',       // glowing borders
    },
  },

  // Box shadow presets
  shadows: {
    card: '0 4px 20px rgba(0, 0, 0, 0.04)',
    cardHover: '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.08)',
    glow: '0 0 15px rgba(37, 99, 235, 0.1)',
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
