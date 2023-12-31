module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            assets: './src/assets',
            components: './src/components',
            contexts: './src/contexts',
            env: './src/env',
            helpers: './src/helpers',
            hooks: './src/hooks',
            routes: './src/routes',
            config: './src/config',
            screens: './src/screens',
            services: './src/services',
            theme: './src/theme',
            types: './src/types',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
        },
      ],
      ["module:react-native-dotenv"],
    ],
  };
};
