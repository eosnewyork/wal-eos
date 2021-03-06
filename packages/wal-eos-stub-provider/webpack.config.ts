import path from 'path';
import { Configuration, ProvidePlugin } from 'webpack';

const config: Configuration = {
  mode: 'production',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.webpack.json'
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'wal-eos-stub-provider.min.js',
    path: path.resolve(__dirname, 'umd'),
    libraryTarget: 'umd',
    library: ['WAL', 'providers', 'stub'],
    libraryExport: 'default'
  },
  plugins: [
    new ProvidePlugin({
      'window.WAL': ['wal-eos', 'default']
    })
  ],
  externals: {
    'wal-eos': 'WAL'
  },
  stats: {
    colors: true
  }
};

export default config;
