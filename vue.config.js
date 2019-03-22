module.exports = {
  publicPath: '/',

  transpileDependencies: [/node_modules[/\\\\]vuetify[/\\\\]/],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
