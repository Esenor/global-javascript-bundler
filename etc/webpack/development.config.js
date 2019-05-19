const configurationBuilder = require('./configuration.builder')

module.exports = configurationBuilder.buildConfigurations({
  mode: 'development',
  watch: true
})
