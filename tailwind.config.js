/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#081120',
        panel: '#101c33',
        panelSoft: '#162544',
        line: '#27426d',
        neon: '#72f1ff',
        gold: '#ffd166',
        danger: '#ff6b6b',
        success: '#74f7a1',
        accent: '#8b9cff',
      },
      boxShadow: {
        pixel: '0 0 0 2px #27426d, 0 8px 0 0 #06101f',
        glow: '0 0 0 2px rgba(114,241,255,.25), 0 0 20px rgba(114,241,255,.12)',
      },
      borderRadius: {
        pixel: '18px',
      },
      fontFamily: {
        pixel: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};
