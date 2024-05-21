import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'login-cover-bg-1': "url('/8874.jpg')",
        'login-cover-bg-2': "url('/8669.jpg')",
        'login-cover-bg-3': "url('/7110.jpg')",
        'login-cover-bg-4': "url('/3215.jpg')",
      },
    
      screens: {
        'xs': {'max': '575px'},

        'sm': {'min': '640px', 'max': '767px'},
        'smd': {'max': '767px'},
  
        'md': {'min': '768px', 'max': '1023px'},
        'mdd': {'max': '1023px'},
  
        'lg': {'min': '1024px', 'max': '1279px'},
        'lgd': {'max': '1279px'},
  
        'xl': {'min': '1280px', 'max': '1535px'},
  
        '2xl': {'min': '1536px'},
      },

      boxShadow: {
        'custom-3': '0px -2px 48px rgba(0, 0, 0, 0.1)',
        'custom-3-dark': '0px -2px 48px rgba(35, 38, 47, 0.6)',
        'custom-l-1': '-10px -2px 46px 10px rgba(0, 0, 0, 0.1)',
        'custom-l-1-dark': '-10px -2px 46px 10px rgba(35, 38, 47, 0.6)',
      },

      colors: {
        'neutral-0': "rgba(var(--neutral-0), 1)",
        'neutral-1': "rgba(var(--neutral-1), 1)",
        'neutral-2': "rgba(var(--neutral-2), 1)",
        'neutral-3': "rgba(var(--neutral-3), 1)",
        'neutral-4': "rgba(var(--neutral-4), 1)",
        'neutral-5': "rgba(var(--neutral-5), 1)",
        'neutral-6': "rgba(var(--neutral-6), 1)",
        'neutral-7': "rgba(var(--neutral-7), 1)",
        'neutral-8': "rgba(var(--neutral-8), 1)",
        'black-1': "rgba(var(--black), 1)",
        'white-1': "rgba(var(--white), 1)",

        'primary-1': 'rgba(var(--primary-1), 1)',
        
        'secondary-1': 'rgba(var(--secondary-1), 1)',
        'secondary-2': 'rgba(var(--secondary-2), 1)',
        'secondary-3': 'rgba(var(--secondary-3), 1)',
        'secondary-4': 'rgba(var(--secondary-4), 1)',
      }
    },
  },
  plugins: [],
}
export default config
