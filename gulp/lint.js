var gulp = require('gulp'),
	config = require('./config.js'),
	plugin = require('gulp-load-plugins')();

gulp.task('lint', function (cb) {
	gulp.src('src/js/setting.js')
		.pipe(plugin.plumber())
		.pipe(plugin.eslint({
			"rules": {
				"semi": ["error", "always"],
			}
		}))
		.pipe(plugin.eslint.format())
		.pipe(plugin.eslint.failAfterError());
	cb();
});