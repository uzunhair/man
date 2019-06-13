var gulp = require('gulp'),
    config = require('../config.js');

gulp.task('ui:watch', function () {
    gulp.watch('src/ui/**/*.pug', {usePolling: true}, gulp.series('uiPug:build'));
    gulp.watch(config.path.watch.styleTheme, {usePolling: true}, gulp.series('styleTheme:build'));
    gulp.watch(['src/ui/css/*.*', 'src/sass/system.scss', 'src/sass/vendors/**/*.scss', 'src/sass/config/*.scss'], {usePolling: true}, gulp.series('uiScss:build'));
    gulp.watch(['src/ui/data/**/*.json', '!src/ui/data/data.json'], {usePolling: true}, gulp.series(['uiJson:build', 'uiPug:build']));
    gulp.watch(['src/ui/js/script.js'], {usePolling: true}, gulp.series(['uiJs:build']));
});