// Gulp.js 配置
var gulp = require('gulp'),
  postcss = require('gulp-postcss'),
  babel = require('gulp-babel'),
  sass = require('gulp-sass'),
  htmlmin = require('gulp-htmlmin'),
  cssnano = require('cssnano'),
  autoprefixer = require('autoprefixer'),
  clean = require('gulp-clean'),// 清除文件、文件夹
  imagemin = require('gulp-imagemin'), //压缩图片
  rename = require('gulp-rename'),   //文件重命名
  notify = require("gulp-notify"),   //gulp日志
  uglify = require('gulp-uglify'), //js压缩
  minifyCss = require('gulp-clean-css');//合并css

// 清空文件夹 (read: false:不读取文件，加快程序)
gulp.task('clean', function () {
  return gulp.src('dist', { read: false })
    .pipe(clean());
});



//应用 PostCSS 插件
gulp.task('css', function () {
  return gulp.src('src/css/*.css')
    .pipe(postcss([
      autoprefixer({
      }),
      cssnano({
        preset: ['default', {
          normalizeWhitespace: true,
          discardComments: {
            removeAll: true,
          },
        }]
      })
    ]))
    .pipe(gulp.dest('dist/css'));
});

//ES6转为ES5
gulp.task('ES5', function () {
  return gulp.src('src/js/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/js'));
});

//编译scss并用postCss处理
gulp.task('scss', function () {
  return gulp.src('src/scss/*.scss')
    .pipe(sass()
      .on('error', sass.logError))
    .pipe(postcss([
      require('autoprefixer')({
      }),
      require('cssnano')({
        preset: ['default', {
          normalizeWhitespace: {
            removeAll: true,
          },
        }]
      })
    ]))
    .pipe(gulp.dest('dist/scss'));
});


//压缩js并且重命名
gulp.task('jsmin', function () {
  return gulp.src('src/js/*.js') //压缩的文件
    .pipe(uglify(
      {
        compress: {
            drop_console: true,  // 过滤 console
            drop_debugger: true  // 过滤 debugger
        },
        output: {
          beautify: true, //只删除注释
      },
    }
    ))
    .pipe(rename({suffix: '.min'}),)
    .pipe(gulp.dest('dist/js')) //输出文件夹
});




//改变html引用路径
gulp.task('html', function () {
  var options = {
    removeComments: true,//清除HTML注释
    collapseWhitespace: false,//压缩HTML
    collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    minifyJS: true,//压缩页面JS
    minifyCSS: true//压缩页面CSS
  };
  return gulp.src('src/*.html')
    .pipe(htmlmin(options))
    .pipe(gulp.dest('dist/html'));
});

//压缩图片
gulp.task('imagemin', function (done) {
  gulp.src('src/img/*.{jpg,png,gif}')
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"))
  done();
});


gulp.task('default', gulp.series('clean', gulp.parallel('scss', 'ES5', 'html', 'imagemin')), (done) => done());  