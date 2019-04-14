var gulp = require('gulp'),
    minCss = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    autoprefixer  = require('gulp-autoprefixer');;

    // Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "src/"
    });
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
sass.compiler = require('node-sass');

gulp.task('sass', function() {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('./src/css'))
    .pipe(browserSync.reload({stream: true}));
});
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('default', ['serve']);
