// Para rodar o browsersync e o sass, utilize npm run gulp server
// Para gerar a versão dist, utilize npm run gulp

// INSTALE O GULP-SPRITESMITH: https://github.com/twolfson/gulp.spritesmith

<<<<<<< HEAD
let gulp = require('gulp'),
=======
var gulp = require('gulp'),
    imagemin = require('gulp-image'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    htmlReplace = require('gulp-html-replace'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    purify = require('gulp-purifycss'),
    cssmin = require('gulp-cssmin'),
>>>>>>> 256f17ef5f995c3f06e8823191d69190eadc0778
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps');

<<<<<<< HEAD
=======
gulp.task('default', ['copy'], function () {
    gulp.start('build-img', 'usemin', 'svgmin', 'purifycss');
});

gulp.task('copy', ['clean'], function () {
    return gulp.src('src/**/*')
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return gulp.src('dist')
        .pipe(clean());
});

gulp.task('build-img', function () {
    return gulp.src('dist/assets/img/**/*')
        .pipe(imagemin({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            guetzli: false,
            gifsicle: true,
            svgo: true,
            concurrent: 100
        }))
        .pipe(gulp.dest('dist/assets/img'));
});
>>>>>>> 256f17ef5f995c3f06e8823191d69190eadc0778


<<<<<<< HEAD
// Static Server + watching scss/html files
gulp.task('server', ['sass'], function () {
=======
gulp.task('purifycss', function () {
    return gulp.src('./dist/assets/css/**/*.css')
        .pipe(purify(['./dist/assets/**/*.js', './dist/**/*.html']))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('svgmin', function () {
    return gulp.src('src/assets/img/**/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('dist/assets/img'));
});
>>>>>>> 256f17ef5f995c3f06e8823191d69190eadc0778

    browserSync.init({
        server: "./src"
    });

    gulp.watch("src/assets/sass/**/*.scss", ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src("src/assets/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("src/assets/css"))
        .pipe(browserSync.stream());
});