const plugin = require('tailwindcss/plugin');

/* plugin function arguments
{
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
    matchUtilities: [Function: matchUtilities]
}
*/

const pluginCustomCSSProps = plugin.withOptions(() => {
    return function ({theme, addBase}) {
        // addBase({
        //     ':root': {
        //         '--maxzz': 'red'
        //     }
        // });
    };
});

module.exports = pluginCustomCSSProps;
