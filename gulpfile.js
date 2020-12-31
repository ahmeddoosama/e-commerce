/*
    > All Variables
 */
const gulp          = require('gulp');
const sass          = require('gulp-sass');
const pug           = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');
const connect       = require('gulp-connect');
const watch         = require('gulp-watch');
const concat        = require('gulp-concat');

/**
    > Sass Task
**/
sass.compiler = require('node-sass');
gulp.task('sass', () => {
    // import sass file
    return gulp.src('src/sass/style.scss')

            // make outputStyle => expanded
            .pipe(sass({
                outputStyle: 'expanded'
            })

            // If any error occurs, show this error in command-line
            .on('error', sass.logError))

            // Add autoprefixer to any proparty
            .pipe(autoprefixer({
                cascade: false
            }))

            // import output file
            .pipe(gulp.dest('assets/css'))
            .pipe(connect.reload())
});

/**
    > gulp Task
**/
gulp.task('pug', () => {
    return gulp.src('src/pug/*.pug')
            .pipe(pug({
                pretty: true
            }))
            .pipe(gulp.dest('./'))
            .pipe(connect.reload())
});

/**
    > JSconact Task
**/
gulp.task('JSconact', () => {
    return gulp.src(['./src/js/vendors/*.js', 'src/js/partiails/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./assets/js'))
});

/**
    > connect Task
**/
gulp.task('connect', () => {
    connect.server({
        port: 8000,
        root: './',
        livereload: true
    })
})


/**
    > Watch Task
**/
gulp.task('watch', () => {
    // Watch eny changes in sass files
    gulp.watch('src/**/*.scss', gulp.series('sass'));

    // Watch eny changes in pug files
    gulp.watch('src/**/*.pug', gulp.series('pug'));

    // Watch eny changes in JS files
    gulp.watch('src/**/*.js', gulp.series('JSconact'));
});


/**
    > config Default Task
**/
gulp.task('default', gulp.parallel('connect', 'watch'));