const gulp = require('gulp');

// gulp-webpackは古いので非推奨
// const webpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const webpackStream = require('webpack-stream');

// 出力html, js のあるディレクトリを定義
const htmlRootPath = __dirname + '/htdocs'
const jsRootPath = htmlRootPath

// gulpのタスクを入れる配列
var taskNames = []
/** TypeScriptのコンパイル, webpackによるbundleを実行 */
webpackConfig.map(function (config, i) {
  var name = "main" + i
  taskNames.push(name)
  gulp.task(name, function () {
    return webpackStream(config, webpack).pipe(gulp.dest(jsRootPath))
  })
})


// gulp.task(buildTaskNames[0], function () {
//   return webpackStream(webpackConfig[0], webpack)
//     .pipe(gulp.dest(jsRootPath));
// })

var browserSync = require('browser-sync').create();
// web-browser の自動更新のタスク設定
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: [htmlRootPath],
      index: 'todo.html'
    },
    files: [
      htmlRootPath + '/**/*'
    ]
  });
});

gulp.task('watch', function () {
  gulp.watch(
    // 第一引数: 変更を watch するファイル
    // 第二引数: 実行するタスク名
    ['./src/**/*.ts',
      './src/**/*.js',
      './src/view/template/*.html',
      './src/**/*.vue'], [taskNames[0]]
  )
})

// default タスクが gulp で実行される (main関数のような役割)
// webpackのときにpushしたtaskNamesをconcatしてdefaultタスクに登録する
gulp.task('default', ['browser-sync', 'watch'].concat(taskNames));