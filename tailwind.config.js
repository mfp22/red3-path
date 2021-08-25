const colors = require('tailwindcss/colors');

module.exports = {
    mode: 'jit',
    purge: ['*./index.html', './src/**/*.{tsx,ts,jsx,js}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                indigo: {
                    light: 'red',
                    dark: colors.blue[500],
                }
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
