var gulp = require('gulp'),
    sass = require('gulp-sass'),
    less = require('gulp-less'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    concat  = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    filter = require('gulp-filter'), // 用于帅选文件，还有放会文件，就是读取流，读完后再把文件放回流中
    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace'),
    useref = require('gulp-useref'),
    csso = require('gulp-csso'),// 压缩 css 的文件
    print = require('gulp-print'),
    replace = require('gulp-replace'),
    base64 = require('gulp-base64'),
    rename = require("gulp-rename");

gulp.task('serve', ['less'], function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch('src/**/*.less', ['less']);
    //gulp.watch("js/*.js",['js']);
    gulp.watch("*.html").on('change', browserSync.reload);

});
gulp.task('less', function() {
    return gulp.src(['src/less/*less'])
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less())
        .pipe(gulp.dest("src/css/"))
        .pipe(autoprefixer({
            //browsers: ['last 5 versions', 'Android >= 4.0'],
            cascade: true,  //是否美化属性值 默认：true 像这样：
                            //-webkit-transform: rotate(45deg);
                            //transform: rotate(45deg);
            remove:true     //是否去掉不必要的前缀 默认：true
        }))
        //输出到dist文件夹
        .pipe(gulp.dest('src/css/'))
        .pipe(browserSync.stream());
});
gulp.task('dev', ['serve']);

