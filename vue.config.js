module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/MCSA-HTML5/'
    : '/',
  transpileDependencies:[/node_modules[/\\\\]vuetify[/\\\\]/]
}
