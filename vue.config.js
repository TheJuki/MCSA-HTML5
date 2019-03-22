module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/MCSA-HTML5/'
    : '/',

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
