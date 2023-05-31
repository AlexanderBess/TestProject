export default {
  ssr: false,
  target: 'static',
  head: {
    title: 'The Test Job',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'description'
      }
    ]
  },
  css: [
    '@/assets/scss/main.scss'
  ],
  plugins: [
    { src: '@plugins/main.js' },
    { src: '@plugins/injectComponents.js' }
  ],
  components: true,
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
    '@nuxtjs/color-mode',
    '@nuxtjs/moment'
  ],
  styleResources: {
    scss: ['./assets/scss/resources.scss']
  },
  modules: [
    '@nuxtjs/style-resources',
    'bootstrap-vue/nuxt'
  ],
  build: {
    productionSourceMap: false,
    productionGzip: true,
    productionGzipExtensions: ['js', 'css', 'svg'],
    extend(config) {
      config.node = { fs: 'empty' };
    },
    transpile: [
      'vee-validate/dist/rules'
    ],
    babel: {
      compact: false
    },
    postcss: null
  }
};
