/**
 * @Author: Pacific_D
 * @Date: 2022-03-29 10:48:44
 * @LastEditTime: 2022-10-21 20:15:50
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \todo-native\babel.config.js
 */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin',
      ["module-resolver", {
        "alias": {
          "@navigation": "./src/navigation",
          "@components": "./src/components",
          "@screens": "./src/screens",
          "@assets": "./src/assets",
          "@types": "./src/types",
          '@store': "./src/store",
          "@utils": "./src/utils"
        },
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
        ]
      }]]
  };
};
