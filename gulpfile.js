const { src, task, series, parallel } = require('gulp')

const webpack = require('webpack')
const moment = require('moment')
const eslint = require('gulp-eslint')
const colors = require('colors')
const run = require('gulp-run')

task('format:js', () => {
  return src(['./*.js', './src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

task('format', series('format:js'))

task('webpack', (callback) =>
  webpack(require('./webpack.config'), (err, stats) => {
    callback()
    if (err) console.log(err)
    console.log(
            `[${colors.grey(`${moment().format('HH:mm:ss')}`)}][${colors.grey(
                'Webpack'
            )}] Build '${colors.cyan(stats.hash)}' after ${colors.magenta(
                `${moment(stats.endTime).diff(moment(stats.startTime))}ms`
            )}`
    )
  })
)

task('prependHeader', () => {
  return run('node prependHeader.js').exec()
})

task('webpack:dev', () =>
  webpack(require('./webpack.dev.config'), (err, stats) => {
    if (err) console.log(err)
    console.log(
            `[${colors.grey(`${moment().format('HH:mm:ss')}`)}][${colors.grey(
                'Webpack'
            )}] Build '${colors.cyan(stats.hash)}' after ${colors.magenta(
                `${moment(stats.endTime).diff(moment(stats.startTime))}ms`
            )}`
    )
  })
)

task('build', series('webpack', 'prependHeader'))

task('default', series(parallel('webpack:dev')))
