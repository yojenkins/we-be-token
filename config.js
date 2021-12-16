module.exports = {
    "source": ["tokens/*.json"],
    "platforms": {
      "scss": {
        "transformGroup": "custom/scss",
        "buildPath": "build/scss/",
        "files": [{
          "destination": "_variables.scss",
          "format": "scss/variables"
        }]
      },
      "css": {
        "transformGroup": "custom/css",
        "buildPath": "build/css/",
        "files": [{
          "destination": "_variables.css",
          "format": "css/variables",
          "options" : {
            "showFileHeader": false
          }
        }]
      },
      "json-flat": {
        "transformGroup": "js",
        "buildPath": "build/json/",
        "files": [
          {
            "destination": "styles.json",
            "format": "json/flat"
          }
        ]
      },
    }
  }