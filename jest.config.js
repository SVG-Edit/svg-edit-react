// configuration for jest
module.exports = {
  verbose: true,
  transform: { '^.+\\.jsx?$': 'babel-jest' },
  moduleFileExtensions: ['js', 'jsx', 'json'],
  modulePaths: [
    '<rootDir>/node_modules/',
    '<rootDir>/tests/mock',
  ],
  moduleNameMapper: { '^(.*):(.*)$': '$1_$2' },
  unmockedModulePathPatterns: ['/^imports\\/.*\\.jsx?$/', '/^node_modules/'],
  // suppress warning for renderAnimationFrame (since React 16)
  setupFilesAfterEnv: ['raf/polyfill'],
  // use Enzyme to serialize jest Snapshots
  snapshotSerializers: ['enzyme-to-json/serializer'],
}
