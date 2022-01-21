const StyleDictionary = require("style-dictionary");
 
const tokenSets = ['color', 'size', 'typography']

StyleDictionary.registerTransform({
  type: 'value',
  name: 'testTransform',
  transitive: true,
  matcher: (token) => token.name.toLowerCase().includes('alias'),
  transformer: token => token.value.value
})

StyleDictionary.registerTransformGroup({
  name: "react-native",
  transforms: ["name/cti/constant", 'testTransform'],
});

tokenSets.forEach((name) => {
  StyleDictionary.extend({
    source: [`tokens/${name}/**/*.json`],
    platforms: {
      "react-native": {
          "transformGroup": "react-native",
          "buildPath": "build/json/",
          "files": [
            {
              "destination": `${name}-styles.json`,
              "format": "json/flat"
            }
          ]
        },
    },
  }).buildAllPlatforms();
}) 
