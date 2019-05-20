const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const RemovePlugin = require('remove-files-webpack-plugin')
const entriesFolder = path.join(__dirname, './../../src/entries')
const stylesFolder = path.join(__dirname, './../../src/styles/entries')
const distributedFolder = path.join(__dirname, './../../dist')

module.exports = {
  buildConfigurations: (baseConfiguration) => {
    let entriesFilesNames = fs.readdirSync(entriesFolder)
    let stylesFilesNames = fs.readdirSync(stylesFolder)
    //
    let entriesConfigurations = entriesFilesNames.reduce((webpackConfigurations, entryFileName) => {
      console.log(`Building configuration of entry file: ${path.join(entriesFolder, entryFileName)}`)
      webpackConfigurations.push({
        mode: (baseConfiguration.mode) ? baseConfiguration.mode : 'development',
        watch: (baseConfiguration.watch) ? baseConfiguration.watch : false,
        entry: path.join(entriesFolder, entryFileName),
        output: {
          path: path.join(distributedFolder, 'js'),
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
            },
            {
              test: /\.(sa|sc|c)ss$/,
              exclude: /node_modules/,
              use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader'
              ]
            }
          ]
        }
      })
      return webpackConfigurations
    }, [])
    //
    let stylesConfigurations = stylesFilesNames.reduce((webpackConfigurations, styleFileName) => {
      console.log(`Building configuration of style file: ${path.join(stylesFolder, styleFileName)}`)
      webpackConfigurations.push({
        mode: (baseConfiguration.mode) ? baseConfiguration.mode : 'development',
        watch: (baseConfiguration.watch) ? baseConfiguration.watch : false,
        entry: {
          styles: [path.join(stylesFolder, styleFileName)]
        },
        output: {
          path: path.join(distributedFolder, 'css'),
          filename: '__css_side_effect.js'
        },
        module: {
          rules: [
            {
              test: /\.scss$/,
              exclude: /node_modules/,
              use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader'
              ]
            }
          ]
        },
        plugins: [
          new MiniCssExtractPlugin({
            filename: styleFileName.replace('.scss', '.css'),
            chunkFilename: styleFileName.replace('.scss', '.[id].css')
          }),
          new RemovePlugin({
            after: {
              test: [
                {
                  folder: path.join(distributedFolder, 'css'),
                  method: (filePath) => {
                    return new RegExp(/\.js$/, 'm').test(filePath)
                  }
                }
              ]
            }
          })
        ]
      })
      return webpackConfigurations
    }, [])
    return [].concat(entriesConfigurations, stylesConfigurations)
  }
}
