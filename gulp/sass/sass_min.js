var gulp = require('gulp'),
    config = require('../config.js'),
    plugin = require('gulp-load-plugins')();

gulp.task('styleTheme.min:build', function (cb) {
    gulp.src(config.path.src.styleTheme) //Выберем наш system.scss
        .pipe(plugin.plumber())
        //.pipe(plugin.sourcemaps.init()) //То же самое что и с js
        .pipe(plugin.sass().on('error', plugin.sass.logError)) //Скомпилируем
        .pipe(plugin.sassUnicode())
        .pipe(plugin.cssnano({zindex: false})) //Сожмем
        .pipe(plugin.autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(plugin.pxtorem())
        .pipe(plugin.rename({suffix: '.min'}))
        //.pipe(plugin.sourcemaps.write(''))
        .pipe(plugin.duration('style.min:build time'))
        .pipe(gulp.dest(config.path.build.style)) //И в build
    cb();
});

gulp.task('styleVendors.min:build', function (cb) {
    gulp.src(config.path.src.styleVendors) //Выберем наш system.scss
        .pipe(plugin.plumber())
        //.pipe(plugin.sourcemaps.init()) //То же самое что и с js
        .pipe(plugin.sass().on('error', plugin.sass.logError)) //Скомпилируем
        .pipe(plugin.sassUnicode())
        .pipe(plugin.cssnano({zindex: false})) //Сожмем
        .pipe(plugin.autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(plugin.pxtorem())
        .pipe(plugin.rename({suffix: '.min'}))
        //.pipe(plugin.sourcemaps.write(''))
        .pipe(plugin.duration('style.min:build time'))
        .pipe(gulp.dest(config.path.build.style)) //И в build
    cb();
});