var gulp = require("gulp");
var gutil = require( 'gulp-util' );
var webpackstream = require('webpack-stream');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig    = require('./webpack.config.js');
var rename = require("gulp-rename");
var del = require("del");
var ts = require("gulp-typescript");
var tslint = require("gulp-tslint");
var tsconfig = require("./tsconfig.json");

var FOLDER_DIST        = "./dist";
var FOLDER_SRC         = "./src";
var FOLDER_TS          = FOLDER_SRC + "/scripts";
var FOLDER_JS          = FOLDER_DIST + "/scripts";
var FOLDER_JS_EXTERNAL = FOLDER_JS + "/external";

gulp.task("tslint", function () {
    return gulp.src([FOLDER_TS + "/**/*.{ts,tsx}"])
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});

gulp.task('webpack', function() {
    return gulp.src('src/scripts/Trust1Connector.ts')
        .pipe(webpackstream( require('./webpack.config.js') ))
        .pipe(gulp.dest('dist/'));
});

gulp.task('webpack-dev-server', function (callback) {
    new WebpackDevServer(webpack(webpackConfig), {
    }).listen(8080, 'localhost', function (err) {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        }
        gutil.log('[webpack-dev-server]', 'http://localhost:8080/index.html');
    });
});

gulp.task("clean-css", function(cb) {
    return del([FOLDER_CSS], cb);
});

gulp.task("clean-html", function(cb) {
    return del([FOLDER_DIST + "/*/**.html"], cb);
});

gulp.task("clean-scripts", function(cb) {
    return del([FOLDER_JS + "/**/*", "!" + FOLDER_JS_EXTERNAL, "!" + FOLDER_JS_EXTERNAL + "/**/*"], cb);
});

gulp.task("clean-external-scripts", function(cb) {
    return del([FOLDER_JS_EXTERNAL + "/**/*"], cb);
});

gulp.task("clean-tests", function(cb) {
    return del([FOLDER_TESTS], cb);
});

gulp.task("default", ["tslint"]);