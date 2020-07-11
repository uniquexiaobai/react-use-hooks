const path = require('path');

module.exports = {
  stories: ['../stories/*.tsx'],
  addons: [
    // '@storybook/addon-actions',
    // '@storybook/addon-links/register',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: [/\.tsx$/],
          include: [path.resolve(__dirname, '../stories')],
        },
        loaderOptions: {
          prettierConfig: {
            printWidth: 80,
            singleQuote: true,
            useTabs: false,
          },
        },
      },
    },
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: {
            reportFiles: ['stories/**/*.{ts|tsx}'],
          },
        },
      ],
    });
    config.resolve.extensions.push('.ts', '.tsx');
    config.resolve.alias = Object.assign(config.resolve.alias, {
      '@': path.resolve(__dirname, '..'),
    });
    return config;
  },
};
