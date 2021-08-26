const plugin = require('tailwindcss/plugin');

const pluginCustomCSSProps = plugin.withOptions(() => {
    return function ({theme}) {
        // console.log(`3--------------theme------------------`, arguments);
        console.log(`4--------------theme------------------`, theme('colors'));
    };
});

module.exports = pluginCustomCSSProps;
