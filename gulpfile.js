const gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    minify = require('gulp-minify');


// Проверка ошибок в скриптах
// gulp.task('lint', function() {
// return gulp.src(['./js/*.js'])
//     .pipe(jshint())
//     .pipe(jshint.reporter('default'));
// });

function styles(done) {
    gulp.src('./scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({ suffix: '.min'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css/'));
    done();
}

function scripts(done) {
    gulp.src(['js/*.js'])
        .pipe(minify({
            ext:{
                min:'.min.js'
            },
            compress: true
        }))
        .pipe(gulp.dest('dist'));
    done();
}

function watchPrint(){
    gulp.watch("./scss/**/*", styles);
    gulp.watch("./js/**/*", scripts)
}

gulp.task('default', gulp.series(watchPrint));