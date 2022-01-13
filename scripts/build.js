const StyleDictionary = require("style-dictionary");
 
const tokenSets = ['color', 'size', 'typography']

tokenSets.forEach((name) => {
  StyleDictionary.registerTransformGroup({
    name: "react-native",
    transforms: ["attribute/cti", "name/ti/constant"],
  });

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