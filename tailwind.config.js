const colors = require('tailwindcss/colors');
// const plugin = require('tailwindcss/plugin');

// const pluginCustomCSSProps = plugin.withOptions(() => {
//     return function() {
//         console.log(`3--------------theme------------------`); 
//     };
// });

module.exports = {
    mode: 'jit',
    purge: ['*./index.html', './src/**/*.{tsx,ts,jsx,js}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                indigo: {
                    light: colors.purple[300],
                    dark: 'red',
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
