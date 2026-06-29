import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        sidebar: { DEFAULT: '#1e293b', hover: '#334155', active: '#3b82f6' },
        status: {
          done: '#10b981',
          progress: '#3b82f6',
          review: '#8b5cf6',
          todo: '#94a3b8',
          blocked: '#ef4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
