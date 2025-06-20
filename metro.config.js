const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

module.exports = mergeConfig(getDefaultConfig(__dirname), {
  transformer: {
    assetPlugins: [], // ⛔ disables image asset registration (no linking to drawable-mdpi)
  },
  resolver: {
    assetExts: ['png', 'jpg', 'jpeg', 'svg'], // Add all formats you use
  },
});
