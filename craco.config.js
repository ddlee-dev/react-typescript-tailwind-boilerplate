const path = require('path');
const { ESLINT_MODES } = require('@craco/craco');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isProd = process.env.NODE_ENV === 'production';
const analyzerOptions = {
  analyzerMode: 'static',
  reportFilename: 'assets/docs/report.html'
};
const webpackPlugin = [];
if (isProd) {
  webpackPlugin.push(new BundleAnalyzerPlugin(analyzerOptions));
}

module.exports = {
  eslint: {
    mode: ESLINT_MODES.file
  },
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')]
    }
  },
  babel: {
    plugins: ['@babel/plugin-syntax-jsx']
  },
  webpack: {
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      utilities: path.resolve(__dirname, 'src/utilities/'),
      styles: path.resolve(__dirname, 'src/styles/'),
      state: path.resolve(__dirname, 'src/state/')
    },
    plugins: webpackPlugin
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^components(.*)$': '<rootDir>/src/components$1',
        '^utilities(.*)$': '<rootDir>/src/utilities$1',
        '^styles(.*)$': '<rootDir>/src/styles$1',
        '^state(.*)$': '<rootDir>/src/state$1'
      },
      collectCoverage: true,
      collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!<rootDir>/node_modules/**',
        '!<rootDir>/.storybook/**',
        '!<rootDir>/coverage/**',
        '!<rootDir>/src/setupTests.ts',
        '!<rootDir>/src/utilities/types/**',
        '!<rootDir>/src/index.tsx'
      ]
    }
  }
};
