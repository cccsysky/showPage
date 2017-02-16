//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp');//本地安装gulp所用到的地方
var jshint = require('gulp-jshint'),
	less = require('gulp-less'),
    minifycss = require('gulp-minify-css'), // CSS压缩
    uglify = require('gulp-uglify'), // js压缩
    concat = require('gulp-concat'), // 合并文件
    rename = require('gulp-rename'),//重命名
    watch = require('gulp-watch'),
    gulpSequence = require('gulp-sequence').use(gulp); // 同步的方式加载;

//Link任务会检查 controller/ 目录下得js文件有没有报错或警告。
gulp.task('lint', function() {
    gulp.src('./controller/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


//定义一个Less任务
gulp.task('less', function () {
    gulp.src('src/less/*.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(gulp.dest('src/dist/css')); //将会在src/css下生成index.css
});

//定义一个scripts任务
gulp.task('scripts', function() {
    gulp.src('src/controller/*.js')
        .pipe(concat('common.js'))
		// .pipe(gulp.dest('src/dist'))
        // .pipe(rename({
        // 	suffix:'.min'
        // }))
        // .pipe(uglify())
        .pipe(gulp.dest('src/dist/js'));
});


//html
gulp.task('html', function() {
    gulp.src('src/view/*.html')
        .pipe(gulp.dest('src/dist/html'))
       
});
 
gulp.task('default',gulpSequence(
	'lint',
	'less',
	'scripts',
	'html'
	)); //需要执行的任务

// gulp.task('default', function(){
//     gulp.run('lint', 'less', 'scripts','html');
//     // gulp.watch('./js/*.js', function(){
//     //     gulp.run('lint', 'sass', 'scripts');
//     // });
// });
 
//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径