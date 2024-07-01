import { defineConfig } from 'umi';
import router from './router';

export default defineConfig({
  npmClient: 'yarn',
  history: {
    type: 'hash',
  },
  proxy: {
    // '/api': {
    //   target: 'http://10.0.1.174:8500',
    //   changeOrigin: true,
    //   secure: false,
    // },
    '/api': {
      target: 'http://10.0.0.99:8500',
      changeOrigin: true,
      secure: false,
    },
    '/roadmap': {
      target: 'http://10.0.0.99:8500',
      changeOrigin: true,
      secure: false,
    },
    // '/roadmap': {
    //   target: 'http://127.0.0.1:8080',
    //   changeOrigin: true,
    //   secure: false,
    // },
  },
  routes: router.routes,
  title: '拉油点管控系统',
  hash: true,
  // mfsu: false,
  // targets: {
  //   ie: 11,
  // },
  // codeSplitting: {
  //   jsStrategy: 'granularChunks',
  // },
});
