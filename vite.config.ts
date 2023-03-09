import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import react from '@vitejs/plugin-react-swc';
import monkey, { cdn } from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    modules: {
      generateScopedName: '[name]_[local]_[hash:base64:5]',
      hashPrefix: "prefix"
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  plugins: [
    react(),
    solidPlugin(),
    monkey({
      entry: 'src/main.tsx',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'http://tampermonkey.net/',
        description: "适用与mockplus生成form和table配置",
        match: ['https://rp.mockplus.cn/*'],
      },
      build: {
        externalGlobals: {
          react: cdn.jsdelivr('React', 'umd/react.production.min.js'),
          'react-dom': cdn.jsdelivr(
            'ReactDOM',
            'umd/react-dom.production.min.js',
          ),
        },
      },
    }),
  ],
});
