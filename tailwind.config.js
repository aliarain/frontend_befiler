module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10B981',
        // main: '#4e0057ee',
        // main2: '#4e0057',
        main: 'white',
        main2: 'white',
        // light: '#F3F4F9',
        hover: '#D58F76',
        secondary_gray: '#696161',
        // background: '#FAF7F6',
        grray: '#EAEBEC',
        off_purple:'#a855f7'
      },
      spacing: {
        sidebar: 270,
        'sidebar-mini': 100,
      }
    },
  },
  plugins: [],
}