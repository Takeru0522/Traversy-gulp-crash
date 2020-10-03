const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
/*
    -- TOP LEVEL FUNCTIONS --
    gulp.task - Define tasks
    gulp.src - Points to files to use
    gulp.dest - Points to folder to output
    gulp.watch - Watch files and folders for changes
*/

// Logs Message
gulp.task('message', function(cb) {
    console.log('Gulp is running...');
    cb();
});

// Copy All HTML files
gulp.task('copyHtml', function(cb) {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
    cb();
})

// Optimize images
gulp.task('imageMin', (cb) => {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
    cb();
})

// Minify JS
// gulp.task('minify', function(cb) {
//     gulp.src('src/js/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'));
//     cb();
// });

// Compile Sass
gulp.task('sass', function(cb) {
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
    cb();
});

// Scripts
gulp.task('scripts', function(cb) {
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
    cb();
});

// version 3.x
// gulp.task('default', ['message', 'copyHtml', 'imageMin', 'sass', 'scripts']);

// version 4.x
// 並行してタスクを実行
gulp.task('default', gulp.parallel('message', 'copyHtml', 'imageMin', 'sass', 'scripts'));
// 順番にタスクを実行
// gulp.task('default', gulp.series('message', 'copyHtml', 'imageMin', 'sass', 'scripts'));

// gulp.task('watch', function(cb) {
//     gulp.watch('src/js/*.js', ['scripts']);
//     gulp.watch('src/images/*', ['imageMin']);
//     gulp.watch('src/sass/*.sass', ['sass']);
//     gulp.watch('src/js/*.html', ['copyHtml']);
//     cb();
// })
gulp.task('watch', function(cb) {
    gulp.watch('src/js/*.js', gulp.series('scripts'));
    gulp.watch('src/images/*', gulp.series('imageMin'));
    gulp.watch('src/sass/*.scss', gulp.series('sass'));
    gulp.watch('src/*.html', gulp.series('copyHtml'));
    cb();
})