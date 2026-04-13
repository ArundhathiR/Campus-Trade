/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/layouts/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        aurora: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        ocean: {
          50: '#eff6ff',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
        },
        rose: {
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
        },
        mint: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        sun: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
      },
      backgroundImage: {
        'aurora-mesh': 'radial-gradient(at 40% 20%, hsla(270, 78%, 72%, 0.25) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(210, 100%, 72%, 0.2) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(340, 80%, 72%, 0.15) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(170, 70%, 65%, 0.15) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(250, 80%, 72%, 0.15) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(30, 90%, 72%, 0.1) 0px, transparent 50%)',
        'hero-mesh': 'radial-gradient(at 20% 30%, hsla(270, 85%, 65%, 0.35) 0px, transparent 50%), radial-gradient(at 80% 20%, hsla(210, 100%, 65%, 0.3) 0px, transparent 50%), radial-gradient(at 50% 80%, hsla(340, 85%, 65%, 0.2) 0px, transparent 50%), radial-gradient(at 10% 70%, hsla(170, 75%, 55%, 0.2) 0px, transparent 50%)',
      },
      boxShadow: {
        'aurora': '0 4px 30px rgba(139, 92, 246, 0.12)',
        'aurora-lg': '0 8px 50px rgba(139, 92, 246, 0.18)',
        'aurora-xl': '0 12px 60px rgba(139, 92, 246, 0.22)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.06), 0 0 1px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 20px 60px rgba(139, 92, 246, 0.15), 0 4px 20px rgba(0, 0, 0, 0.06)',
        'btn': '0 4px 14px rgba(139, 92, 246, 0.3)',
        'btn-hover': '0 8px 25px rgba(139, 92, 246, 0.4)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 2s infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'morph': 'morph 8s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wiggle': 'wiggle 0.5s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' },
        },
        'gradient-x': {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'slide-up': {
          '0%': { opacity: 0, transform: 'translateY(40px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: 0, transform: 'scale(0.9)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: 0.5 },
          '80%, 100%': { transform: 'scale(2)', opacity: 0 },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-5deg)' },
          '75%': { transform: 'rotate(5deg)' },
        },
      },
    },
  },
  plugins: [],
}
