const {src, dest, task, series, watch} = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
//const browserSync = require('browser-sync').create();
//const reload = browserSync.reload;


sass.compiler = require('node-sass');

task('clean', function () {
    return src('dist/**/*', {read: false }).pipe(rm());
});




task('copy', function (){
    return src('src/style/*.scss').pipe(dest('dist'));
});




const styles = [
    'node_modules/normalize.css/normalize.css',
    'src/style/main.scss'
];


task('styles', function (){
    return src(styles)
    .pipe(concat('main.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('dist'));
});



//watch('./src/style/**/*.scss', series('styles'));
watch('./scss/**/*.scss', series('styles'));
task('default', series('clean', 'styles'));



//task('default', series('clean', 'copy:html', 'styles', 'server'));

//watch('./src/*.html', series('copy:html'));


/*task('copy:html', function (){
    return src('src/*.html').pipe(dest('dist')).pipe(reload({stream: true}));
});*/



/*
task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: false
    });
});*/