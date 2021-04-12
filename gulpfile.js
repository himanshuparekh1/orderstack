var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var sass = require('gulp-sass');
const terser = require('gulp-terser');
var browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const { src, dest, series, watch } = require('gulp');

function scss() {
    return src('app/*.scss', { sourcemaps: '.' })
        .pipe(sass())
        .pipe(cssnano())
        .pipe(dest('dist/css'));
    // .pipe(browserSync.stream());
}


// function copyJs() {
//     return src('node_modules/datatables.net/js/jquery.dataTables.min.js')
//         .pipe(dest('dist/js'));
// }
// function copyCss() {
//     return src('node_modules/highcharts/css/highcharts.css')
//         .pipe(dest('dist/css'));
// }

// JavaScript Task
function jsTask() {
    return src('app/js/*.js', { sourcemaps: true })
        .pipe(terser())
        .pipe(dest('dist/js', { sourcemaps: '.' }));
}

// Fonts Task
function fontTask() {
    return src('app/font/*')
        .pipe(dest('dist/font'));
}
// Imagemin task
function imgTask() {
    return src('app/img/*').pipe(gulp.dest('dist/img'));
}

// Browsersync Tasks
function browsersyncServe(cb) {
    browserSync.init({
        server: {
            baseDir: '.'
        }
    });
    cb();
}

function browsersyncReload(cb) {
    browserSync.reload();
    cb();
}

// Watch Task
function watchTask() {
    watch('*.html', browsersyncReload);
    watch(['app/*.scss', 'app/js/*.js'], series(scss, jsTask, browsersyncReload));
}

// Default Gulp task
exports.default = series(
    scss,
    // copyJs,
    // copyCss,
    jsTask,
    fontTask,
    imgTask,
    browsersyncServe,
    watchTask
);
