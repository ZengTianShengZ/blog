// 引入 gulp
var gulp = require('gulp');

// 引入组件
var uglify = require('gulp-uglify'); // 压缩 js 的文件
var filter = require('gulp-filter'); // 用于帅选文件，还有放会文件，就是读取流，读完后再把文件放回流中
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var useref = require('gulp-useref');
var csso = require('gulp-csso'); // 压缩 css 的文件
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var sass = require('gulp-sass');


// 合并，压缩文件，将 js文件夹下的js文件合并压缩成 all.js 放在 /dist文件夹下
gulp.task('scripts', function() {
    gulp.src('./zBase-1.1.0/zBase-1.1.0.js')
       // .pipe(concat('all.js')) // concat 合并
        .pipe(gulp.dest('./dist'))
        .pipe(rename('zBase-1.1.0.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

// 编译Sass , 会将 scss/文件夹下的 .scss 文件编译成 .css 文件放在 /css文件夹下
gulp.task('sass', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'));
});

// watch-sass
gulp.task('watch-sass', function(){
    // 监听文件变化，有了监听，当你编写 js 或 sacc 文件时就会自动编译
    gulp.watch('src/scss/*.scss',['sass']);
});

