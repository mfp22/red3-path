const plugin = require('tailwindcss/plugin');

/*
3--------------theme------------------ [Arguments] {
  '0': {
    addVariant: [Function: addVariant],
    postcss: <ref *1> [Function: postcss] {
      plugin: [Function: plugin],
      stringify: [Function],
      parse: [Function],
      fromJSON: [Function],
      list: [Object],
      comment: [Function (anonymous)],
      atRule: [Function (anonymous)],
      decl: [Function (anonymous)],
      rule: [Function (anonymous)],
      root: [Function (anonymous)],
      document: [Function (anonymous)],
      CssSyntaxError: [Function],
      Declaration: [Function],
      Container: [Function],
      Document: [Function],
      Comment: [Function],
      Warning: [Function],
      AtRule: [Function],
      Result: [Function],
      Input: [Function],
      Rule: [Function],
      Root: [Function],
      Node: [Function],
      default: [Circular *1]
    },
    prefix: [Function: applyConfiguredPrefix],    e: [Function: escapeClassName],
    config: [Function: getConfigValue],
    theme: [Function: theme],
    corePlugins: [Function: corePlugins],
    variants: [Function: variants],
    addBase: [Function: addBase],
    addComponents: [Function: addComponents],
    addUtilities: [Function: addUtilities],
    matchUtilities: [Function: matchUtilities]  }
}
*/

/*
4--------------theme------------------ 
{
  transparent: 'transparent',
  current: 'currentColor',
  black: '#000',
  white: '#fff',
  purple: {
    '50': '#f5f3ff',
    '100': '#ede9fe',
    '200': '#ddd6fe',
    '300': '#c4b5fd',
    '400': '#a78bfa',
    '500': '#8b5cf6',
    '600': '#7c3aed',
    '700': '#6d28d9',
    '800': '#5b21b6',
    '900': '#4c1d95'
  },
  ...
}
*/

const pluginCustomCSSProps = plugin.withOptions(() => {
    return function ({theme, addBase}) {
        // console.log(`3--------------theme------------------`, arguments);
        //console.log(`4--------------theme------------------`, theme('colors'));
        //console.log(`5--------------base------------------${addBase}`);
        addBase({
            ':root': {
                '--maxzz': 'red'
            }
        });
    };
});

module.exports = pluginCustomCSSProps;
