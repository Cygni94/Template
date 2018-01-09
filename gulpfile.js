// Para rodar o browsersync e o sass, utilize npm run gulp server
// Para gerar a versão dist, utilize npm run gulp

// INSTALE O GULP-SPRITESMITH: https://github.com/twolfson/gulp.spritesmith

let gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['copy'], function () {
    gulp.start('build-img', 'usemin', 'svgmin');
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
        .pipe(imagemin())
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

    gulp.watch('src/assets/sass/**/*.scss').on('change', function (event) {
        return gulp.src('src/assets/sass/style.scss')
            .pipe(sass(gulp.src))
            .pipe(sourcemaps.init())
            .pipe(cleanCSS())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('src/assets/css'));
    });
});