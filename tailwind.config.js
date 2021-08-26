const colors = require('tailwindcss/colors');

module.exports = {
    mode: 'jit',
    purge: ['*./index.html', './src/**/*.{tsx,ts,jsx,js}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                indigo: {
                    //light: colors.purple[300],
                    light: function a() {
                        console.log(`3--------------theme------------------${JSON.stringify(Object.keys(this.global))}`) //${JSON.stringify(arguments)}
                        return 'red'
                    },
                    dark: 'red',
                }
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
