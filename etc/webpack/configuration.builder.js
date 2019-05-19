const path = require('path')
const fs = require('fs')
const entriesFolder = path.join(__dirname, './../../src/entries')
const distributedFolder = path.join(__dirname, './../../dist')

module.exports = {
  buildConfigurations: (baseConfiguration) => {
    let entriesFilesNames = fs.readdirSync(entriesFolder)
    return entriesFilesNames.reduce((webpackConfigurations, entryFileName) => {
      console.log(`Building configuration of entry file: ${path.join(entriesFolder, entryFileName)}`)
      webpackConfigurations.push({
        mode: (baseConfiguration.mode) ? baseConfiguration.mode : 'development',
        watch: (baseConfiguration.watch) ? baseConfiguration.watch : false,
        entry: path.join(entriesFolder, entryFileName),
        output: {
          path: distributedFolder,
          filename: entryFileName
        },
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: [
                'babel-loader',
                'eslint-loader'
              ]
            }
          ]
        }
      })
      return webpackConfigurations
    }, [])
  }
}
