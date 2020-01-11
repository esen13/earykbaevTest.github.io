const gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs');

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
    gulp.src(['node_modules/jquery/dist/jquery.min.js', 'js/*.js'])
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
    done();
}

function watchPrint(){
    gulp.watch("./scss/**/*", styles);
    gulp.watch("./js/**/*", scripts)
}

gulp.task('default', gulp.series(watchPrint));