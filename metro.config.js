/**
 * @Author: Pacific_D
 * @Date: 2022-10-19 21:08:01
 * @LastEditTime: 2022-10-19 21:08:04
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \todo-native\metro.config.js
 */
/**
 * @Author: Pacific_D
 * @Date: 2022-10-18 22:38:27
 * @LastEditTime: 2022-10-18 22:38:28
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \learn-react-native\metro.config.js
 */
const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  return config;
})();