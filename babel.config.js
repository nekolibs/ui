module.exports = {
  presets: [
    [
      'module:metro-react-native-babel-preset',
      {
        disableImportExportTransform: true,
      },
    ],
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          'react-native': 'react-native-web',
        },
      },
    ],
  ],
}
