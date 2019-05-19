const configurationBuilder = require('./configuration.builder')

module.exports = configurationBuilder.buildConfigurations({
  mode: 'production',
  watch: false
})
