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
  babel: {
    plugins: ['babel-plugin-styled-components']
  },
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')]
    }
  },
  webpack: {
    alias: {
      '@/components': path.resolve(__dirname, 'src/components/'),
      '@/containers': path.resolve(__dirname, 'src/containers/'),
      '@/utils': path.resolve(__dirname, 'src/utils/'),
      '@/styles': path.resolve(__dirname, 'src/styles/'),
      '@/xstate': path.resolve(__dirname, 'src/xstate/')
    }
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@/components(.*)$': '<rootDir>/src/components$1',
        '^@/containers(.*)$': '<rootDir>/src/containers$1',
        '^@/utils(.*)$': '<rootDir>/src/utils$1',
        '^@/styles(.*)$': '<rootDir>/src/styles$1',
        '^@/xstate(.*)$': '<rootDir>/src/xstate$1'
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
