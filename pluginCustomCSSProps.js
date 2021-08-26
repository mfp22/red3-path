const plugin = require('tailwindcss/plugin');

const pluginCustomCSSProps = plugin.withOptions(() => {
    return function () {
        console.log(`3--------------theme------------------`, arguments);
    };
});

module.exports = pluginCustomCSSProps;
