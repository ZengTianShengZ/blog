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
    gulp.src('src/scss/!*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'));
});

// watch-sass
gulp.task('watch-sass', function(){
    // 监听文件变化，有了监听，当你编写 js 或 sacc 文件时就会自动编译
    gulp.watch('src/scss/!*.scss',['sass']);
});



// 默认任务
gulp.task('build', function () {
    var jsFilter = filter('**/*.js',{restore:true});
    var cssFilter = filter('**/*.css',{restore:true});
    var indexHtmlFilter = filter(['**/*','!**/index.html'],{restore:true});
    return gulp.src('src/index.html') //拿到要处理的文件
        .pipe(useref())  // 拿到 index.html 下面有 <!--build:css css(js)/combined.css(js)--> 这个注释声明的 css 和 js文件
        .pipe(jsFilter) // 将拿到的文件涮选出 js 文件
        .pipe(uglify())  // 涮选出来后做一个 压缩的操作
        .pipe(jsFilter.restore) // 压缩完再将这些文件仍回 流里面
        .pipe(cssFilter)  // css 的操作也一样
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter) // 拿到 html文件 ，注意上面有 !**/index.html ，意思是排除 对 主页 的设置
        .pipe(rev()) // 拿到html 对他们进行 生成 哈希 版本号名 ，这里说明一下，比如 xx.html -->变成 xxdshi.html
        //  为什么要这样呢，因为用户访问xx.html，就会缓存该网页，当这个网页咱们跟新它时用户有缓存怎么办
        // 就利用打包 给它后面加个哈希值 xxdshi.html ，那么 用户再次访问就不是原来的值了，就会访问新的网页
        // 这也是 排除 主页 index.html 加哈希码，因为主页改变了用户还怎么访问
        .pipe(indexHtmlFilter.restore) // 放回流中
        .pipe(revReplace())  // 对 index。html 页面中的 链接进行跟新 ， 因为你利用上面 其他网页加了哈希，网页名也就是链接改变了，需要更新
        .pipe(gulp.dest('dist'));  // 所有流操作完毕 ，将流 导入  dist 目录下
    // 最后执行这些操作  gulp default  及任务名
});
