var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    server = require('browser-sync'),
    reload = server.reload,
    sass = require('gulp-sass'),
    minify = require('gulp-csso'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    tinypng = require('gulp-tinypng'),
    del = require('del'),
    runsequence = require('run-sequence');
    

gulp.task('styles', function() {
  gulp.src('sass/style.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(autoprefixer({ browsers: ['last 4 versions'] }))
  .pipe(gulp.dest('css'))
  .pipe(minify())
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest('css'))
  .pipe(reload({stream: true}));
});

gulp.task('webserver', function(){
  server.init({
    server: {
      baseDir: './'
    },
    notify: false
  });
});

gulp.task('tinypng', function() {
  gulp.src('img/*')
  .pipe(tinypng('OqvQ0pn0iAaJbR8QeJbvbVf5t41GplS'))
  .pipe(gulp.dest('img'));
});

gulp.task('css', function() {
  gulp.src('css/*.css')
  .pipe(gulp.dest('build/css'));
})

gulp.task('html', function() {
  gulp.src('*.html')
  .pipe(gulp.dest('build'));
})

gulp.task('img', function() {
  gulp.src('img/*')
  .pipe(gulp.dest('build/img'));
})

gulp.task('fonts', function() {
  gulp.src('fonts/*')
  .pipe(gulp.dest('build/fonts'));
})

gulp.task('js', function() {
  gulp.src('js/main.js')
  .pipe(gulp.dest('build'));
})

gulp.task('clean', function() {
  del('build');
})

gulp.task ('build', function(callback) {
  runsequence('clean', 'html', 'css', 'js', 'fonts', 'img', callback)
})

gulp.task ('watch', ['webserver', 'styles'], function() {
  gulp.watch('sass/**/*.scss', ['styles']);
  gulp.watch('*.html', server.reload);
  gulp.watch('js/*.js', server.reload);
});