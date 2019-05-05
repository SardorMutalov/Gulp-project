var gulp        = require('gulp'),
  sass          = require('gulp-sass'),
  browserSync   = require('browser-sync'),
  imagemin      = require('gulp-imagemin'),
  cache         = require('gulp-cache'),
  autoprefixer  = require('gulp-autoprefixer');


// Таск для Sass
gulp.task('sass', function() {
  return gulp.src('src/sass/*.scss')
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({stream: true}))
});

// Таск для синхонизации с браузером
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'src'
    },
    notify: false
  });
});

// Таск для перезагрузке браузера после правки html
gulp.task('html', function() {
  return gulp.src('src/*.html')
  .pipe(browserSync.reload({ stream: true }))
});

// Таск сжатия изображений

gulp.task('img', function() {
  return gulp.src('src/img/**/*')
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
    })))
    .pipe(gulp.dest('dist/img'));
});

// Таск очистки кэша

gulp.task('clear', function (callback) {
  return cache.clearAll();
})

// Слежка за изменениями в файлах

gulp.task('watch', function() {
  gulp.watch('src/sass/**/*.scss', gulp.parallel('sass'));
  gulp.watch('src/*.html', gulp.parallel('html'));
});

// Таск 'devop' для режима разработки
// Таск 'build' для режима продакшн

gulp.task('devop', gulp.parallel('sass', 'browser-sync', 'watch'));
