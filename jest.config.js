module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-navigation|@react-native|react-native|react-clone-referenced-element|@react-native-async-storage/async-storage)',
  ],
};
