export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.(spec|int-spec)\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.spec.ts',
    '!src/**/*.test.ts',
    '!src/**/*mock*.ts',
  ],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],
  transformIgnorePatterns: ['/node_modules/(?!(@faker-js/faker|uuid))'],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
