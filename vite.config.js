import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // React HMRの設定
      fastRefresh: true,
      // JSXファイルの対象を指定
      include: '**/*.{jsx,js,ts,tsx}',
      // JSXのBabelトランスフォーム設定
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx']
        ]
      }
    })
  ],
  resolve: {
    alias: {
      // ソースディレクトリを起点としたパス解決のためのエイリアス
      'scss': path.resolve(__dirname, './src/scss'),
      'pages': path.resolve(__dirname, './src/pages'),
      'components': path.resolve(__dirname, './src/components'),
      'utils': path.resolve(__dirname, './src/utils'),
      'modals': path.resolve(__dirname, './src/modals'),
      'translations': path.resolve(__dirname, './src/translations'),
      'bootstrap': path.resolve(__dirname, './node_modules/bootstrap'),
    },
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
  },
  // 環境変数の定義
  define: {
    // 古いprocess.env参照の互換性のために残す
    'process.env': {},
    'process.env.PUBLIC_URL': JSON.stringify(process.env.VITE_PUBLIC_URL || ''),
  },
  // 開発サーバー設定
  server: {
    port: 3000, // CRAと同じポートに設定
    hmr: true, // Hot Module Replacementを有効化
  },
  // ビルド設定
  build: {
    outDir: 'build', // CRAと同じoutDirを使用
    sourcemap: true,
  },
  // publicディレクトリの設定
  publicDir: 'public',
  // テスト設定
  test: {
    globals: true,
    environment: 'jsdom',
  },
  // esbuildの設定をオプティマイズ
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
      jsx: 'automatic',
      jsxImportSource: 'react',
    }
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  // CSSモジュールのサポート
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
    preprocessorOptions: {
      scss: {
        // node_modulesからのインポートパスを解決するための設定
        additionalData: '',
        includePaths: [
          path.resolve(__dirname, './node_modules')
        ]
      },
    },
  },
});
