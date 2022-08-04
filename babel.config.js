/**
 * @Author: Pacific_D
 * @Date: 2022-03-29 10:48:44
 * @LastEditTime: 2022-08-04 19:39:53
 * @LastEditors: Pacific_D
 * @Description: 
 * @FilePath: \animated-todo\babel.config.js
 */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin']
  };
};
