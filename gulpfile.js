// Пакеты для работы с src

var gulp         = require('gulp'),
    browserSync  = require('browser-sync').create(),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cache        = require('gulp-cache');

// Пакеты для работы с public

var concat       = require('gulp-concat');

// Работа над src

    sass.compiler = require('node-sass');

// Таск статичного сервира и отслеживания изменений в файлах
// Обновляе браузер при сохранении
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./src"
    });

    gulp.watch("src/sass/*.scss", ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});


// Таск автоматически компилирует SCSS файл в CSS
gulp.task('sass', function() {
    return gulp.src("src/sass/*.scss")
        .pipe(sass()) //Компиляция
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) //Добавлят вендорские префиксы
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream()); //Синхронизация с browserSync
});

gulp.task('default', ['serve']);


// Работа над public



// Очистка кэша сборки

gulp.task('clear', function (callback) {
  return cache.clearAll();
})
