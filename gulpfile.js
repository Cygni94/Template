// Para rodar o browsersync e o sass, utilize npm run gulp server
// Para gerar a versão dist, utilize npm run gulp

// INSTALE O GULP-SPRITESMITH: https://github.com/twolfson/gulp.spritesmith

var gulp = require('gulp'),
    imagemin = require('gulp-image'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    htmlReplace = require('gulp-html-replace'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    purify = require('gulp-purifycss'),
    cssmin = require('gulp-cssmin'),
    browserSync = require('browser-sync').create(),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish'),
    csslint = require('gulp-csslint'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    svgmin = require('gulp-svgmin');

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

gulp.task('usemin', function () {
    return gulp.src('dist/**/*.html')
        .pipe(usemin({
            js: [uglify],
            css: [autoprefixer]
        }))
        .pipe(gulp.dest('dist/assets'));
});

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

gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });

    gulp.watch('src/**/*').on('change', browserSync.reload);

    gulp.watch('src/assets/js/**/*.js').on('change', function (event) {
        console.log("Linting " + event.path);
        gulp.src(event.path)
            .pipe(jshint())
            .pipe(jshint.reporter(jshintStylish));
    });

    gulp.watch('src/assets/css/**/*.css').on('change', function (event) {
        console.log("Linting " + event.path);
        gulp.src(event.path)
            .pipe(csslint())
            .pipe(csslint.reporter());
    });

    gulp.watch('src/assets/sass/**/*.scss').on('change', function (event) {
        return gulp.src('src/assets/sass/style.scss')
            .pipe(sass(gulp.src))
            .pipe(gulp.dest('src/assets/css'));
    });
});