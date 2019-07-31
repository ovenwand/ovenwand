const babelConfig = {
  presets: [
    ['@babel/preset-env', {
      modules: false,
      useBuiltIns: 'entry',
      corejs: '3.1.4',
      targets: {
        browsers: [
          '> 1%',
          'last 2 versions',
          'not ie <= 12',
        ],
      },
    }],
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    '@babel/plugin-syntax-dynamic-import',
  ]
};

module.exports = babelConfig;
