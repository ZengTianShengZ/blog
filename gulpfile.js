var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-minify-css'),
    minify = require('gulp-minify');

gulp.task('less', function () {
    gulp.src('src/less/blogz.less')
        .pipe(less())
        .pipe(cssmin()) //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
        .pipe(gulp.dest('build/css'));
});

gulp.task('minifycss', function () {
    gulp.src('build/css/combined-a6688a62c6.css')
        .pipe(cssmin()) //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
        .pipe(gulp.dest('build/css'));
});



gulp.task('minifyjs', function() {
    gulp.src('build/js/*.js')
        .pipe(minify())
        .pipe(gulp.dest('build/js'))
});