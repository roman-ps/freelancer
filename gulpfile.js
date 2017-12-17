var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    server = require('browser-sync'),
    sass = require('gulp-sass'),
    minify = require('gulp-csso'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-tinypng');
    

gulp.task('styles', function() {
  gulp.src('sass/style.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
  .pipe(gulp.dest('css'))
//  .pipe(minify())
//  .pipe(rename('style.min.css'))
//  .pipe(gulp.dest('css'))
  .pipe(server.reload({stream: true}));
});

gulp.task('serve', function(){
  server.init({
    server: {
      baseDir: './'
    },
    notify: false
  });
});

gulp.task('tinypng', function() {
  gulp.src('img/*')
  .pipe(imagemin('OqvQ0pn0iAaJbR8QeJbvbVf5t41GplS'))
  .pipe(gulp.dest('img'));
});

gulp.task ('watch', ['serve', 'styles'], function() {
  gulp.watch('sass/**/*.scss', ['styles']);
  gulp.watch('*.html', server.reload);
  gulp.watch('js/*.js', server.reload);
});