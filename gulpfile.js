const gulp = require('gulp');

// gulp-webpackは古いので非推奨
// const webpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const webpackStream = require('webpack-stream');

// 出力html, js のあるディレクトリを定義
const htmlRootPath = __dirname + '/htdocs'
const jsRootPath = htmlRootPath

console.warn(htmlRootPath);

/** TypeScriptのコンパイル, webpackによるbundleを実行 */
var buildTaskNames = []
console.log(webpackConfig.length)

// webpackConfigが多言語にコンパイルするとき配列になっているため, for文を用いてタスク登録する. 
for (var i = 1; i < webpackConfig.length; i++) {
    var taskName = 'build' + i
    buildTaskNames.push(taskName)
}

gulp.task(buildTaskNames[0], function () {
    return webpackStream(webpackConfig[0], webpack)
        .pipe(gulp.dest(jsRootPath));
})

// gulp.task(buildTaskNames[1], function () {
//     return webpackStream(webpackConfig[1], webpack)
//         .pipe(gulp.dest(jsRootPath));
// })


console.log(buildTaskNames)
var browserSync = require('browser-sync').create();

// web-browser の自動更新のタスク設定
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: [htmlRootPath],
            index: 'careplan2.html'
        },
        files: [
            htmlRootPath + '/**/*'
        ]
    });
});

gulp.task('watch', function () {
    gulp.watch(
        // 第一引数が watch するファイル, 第二引数が実行するタスク
        ['./src/**/*.ts', './src/**/*.js', './src/view/template/*.html'], [buildTaskNames[0]]
    )
})

// default タスクが gulp で実行される (main関数のような役割)
gulp.task('default', ['browser-sync', 'watch'].concat(buildTaskNames));