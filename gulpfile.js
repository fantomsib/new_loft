const {
    src,
    dest,
    task,
    series,
    watch,
    parallel
} = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create(); //сервер для просмотра синк
const reload = browserSync.reload; //перезапуск сервера
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
//const px2rem = require('gulp-smile-px2rem');пересчет пикселей в рем
const gcmq = require('gulp-group-css-media-queries'); //груперовка медиа файлов
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;
const {
    DIST_PATCH,
    SRC_PATH,
    STYLES_LIBS,
    JS_LIBS
} = require('./gulp.config.js');
sass.compiler = require('node-sass');

task('clean', function () {
    return src(`${DIST_PATCH}/**/*`, {
        read: false
    }).pipe(rm());
});

task('copy:html', function () {
    return src(`${ SRC_PATH}/*.html`).pipe(dest(DIST_PATCH)).pipe(reload({
        stream: true
    }));
});

task('copy:fonts', function () {
    return src(`${ SRC_PATH}/fonts/*`).pipe(dest(`${DIST_PATCH}/fonts`));
});


task('copy:img', function () {
    return src(`${ SRC_PATH}/img/*`).pipe(dest(`${DIST_PATCH}/img`));
});

task('copy:sprite', function () {
    return src(`${ SRC_PATH}/sprite/*`).pipe(dest(`${DIST_PATCH}/sprite`));
});


task('copy:video', function () {
    return src(`${ SRC_PATH}/video/*`).pipe(dest(`${DIST_PATCH}/video`));
});

/*const styles = [
    'node_modules/normalize.css/normalize.css',
    'src/scss/_misk/_font.scss',
    'src/scss/main.scss'

];
*/

task('styles', function () {
    return src([...STYLES_LIBS,
            'src/scss/main.scss',
            'src/scss/_misk/_font.scss'
        ])
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.min.scss')) //слкейка
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        //.pipe(px2rem()) пересчет пикселей в рем
        .pipe(gulpif(env === 'dev', autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        })))
        .pipe(gulpif(env === 'prod', gcmq())) //группировка меди запросов НЕ работает с sours maps пока идет разработка отключаем , при заргрузке готового проэктиа включаем и отключаем сорс мап
        .pipe(gulpif(env === 'prod', cleanCSS()))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(dest(`${DIST_PATCH}/css`))
        .pipe(reload({
            stream: true
        }));
});

/*const libs = [
    "node_modules/jquery/dist/jquery.js",
    "src/script/*js"
];*/


task('script', function () {
    return src([...JS_LIBS,
            "src/script/*js",

        ])
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.min.js', {
            newLine: ";"
        }))
        .pipe(gulpif(env === 'prod', babel({
            presets: ['@babel/env']
        })))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(dest(`${DIST_PATCH}/script`))
        //.pipe(browserSync.stream());
        .pipe(reload({
            stream: true
        }));
});

/*
task('svg', function () {
    return src(`${DIST_PATCH}/sprite/*.svg`)
        .pipe(svgo({
            plugins: [{
                removeAttrs: {attrs: "(fill|stroke|style|width|height|data.*)"}
            }]
        }))
        .pipe(svgSprite({
            symbol:{
                sprite: `${DIST_PATCH}/svg/sprite.svg`
            }
        }))
        .pipe(dest(`${DIST_PATCH}/sprite/`));
});*/

task('server', function () {
    browserSync.init({
        server: {
            baseDir: `${DIST_PATCH}`
        },
        //open: false
    });
});

task('watch', function (e) {
    watch(`${ SRC_PATH}/scss/**/*.scss`, series('styles'));
    watch(`${ SRC_PATH}/*.html`, series('copy:html'));
    watch(`${ SRC_PATH}/fonts/**/*`, series('copy:fonts'));
    watch(`${ SRC_PATH}/img/*`, series('copy:img'));
    watch(`${ SRC_PATH}/script/*.js`, series('script'));
    watch(`${ SRC_PATH}/sprite/*.svg`, series('copy:sprite'));
    // watch(`${ SRC_PATH}/sprite/*.svg`, series('svg'));
    watch(`${ SRC_PATH}/video/*`, series('copy:video'));

});

task('default', series('clean', parallel('copy:html', 'copy:fonts', 'copy:img', 'copy:video', 'copy:sprite', 'styles', /*'svg',*/ 'script'),
    parallel('watch', 'server')
));


task('build', series('clean', parallel('copy:html', 'copy:fonts', 'copy:img', 'copy:sprite', 'styles', /*'svg',*/ 'script')));