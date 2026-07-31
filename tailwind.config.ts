import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        surface: 'hsl(var(--surface))',
        'surface-hover': 'hsl(var(--surface-hover))',
        border: 'hsl(var(--border))',
        'text-primary': 'hsl(var(--text-primary))',
        'text-muted': 'hsl(var(--text-muted))',
        accent: {
          indigo: 'hsl(var(--accent-indigo))',
          cyan: 'hsl(var(--accent-cyan))',
          purple: 'hsl(var(--accent-purple))',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern':
          'linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-sm': '32px 32px',
        'grid-md': '64px 64px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'text-shimmer': 'textShimmer 3s ease infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        textShimmer: {
          '0%': { backgroundPosition: '-500px 0' },
          '100%': { backgroundPosition: '500px 0' },
        },
      },
      boxShadow: {
        'glow-indigo': '0 0 30px rgba(99,102,241,0.3)',
        'glow-cyan': '0 0 30px rgba(34,211,238,0.3)',
        'glow-sm': '0 0 15px rgba(99,102,241,0.2)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.6)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
export default config;
