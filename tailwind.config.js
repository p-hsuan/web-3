module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        screens: {
          '2xl': {'max': '1535px'},
          // => @media (max-width: 1535px) { ... }
    
          'xl': {'max': '1279px'},
          // => @media (max-width: 1279px) { ... }
    
          'lg': {'max': '1023px'},
          // => @media (max-width: 1023px) { ... }
    
          'md': {'max': '767px'},
          // => @media (max-width: 767px) { ... }
    
          'sm': {'max': '639px'},
          // => @media (max-width: 639px) { ... }
        },
        fontSize: {
            'xxs': '0.6rem',
            'xs': '.75rem',
            'sm': '.875rem',
            'tiny': '.875rem',
            'base': '1rem',
            'lg': '1.125rem',
            'xl': '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem',
            '6xl': '4rem',
            '7xl': '5rem',
        },
        animation: {
            'fade-in': 'fade-in 0.5s linear',
            'blinking-1': 'blinking-1 0.5s linear',
            'blinking-2': 'blinking-2 0.5s linear',
            'flash': 'flash linear 1.5s infinite',
        },
        keyframes: {
            'fade-in': {
                '0%': { 
                    // transform: 'translateY(5px)',
                    opacity: '0.4',
                },
                '100%': { 
                    // transform: 'translateY(0px)',
                    opacity: '1',
                },
            },
            'blinking-1': {
                '0%': {
                    'background-color': '#ff3d50',
                    color: '#ddd',
                },
                '90%': {
                    'background-color': '#222291',
                    color: '#ffffff',
                },
                '100%': {
                    'background-color': '#94a3b8',
                    color: '#000000',
                }
            },
            'blinking-2': {
                '0%': {
                    'background-color': '#ff3d50',
                    color: '#ddd',
                },
                '90%': {
                    'background-color': '#222291',
                    color: '#ffffff',
                },
                '100%': {
                    'background-color': '#94a3b8',
                    color: '#000000',
                }
            },
            'flash': {
                '0%': { opacity: '1' } ,
                '50%': { opacity: '0.5' },
                '100%': { opacity: '1' },
            },
        }
    },
    plugins: [],
  }
