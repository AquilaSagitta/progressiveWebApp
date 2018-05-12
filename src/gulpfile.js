/* global require */
var gulp = require('gulp');
var log = require('fancy-log');
var critical = require('critical').stream;

/**
 * GULP CRITICAL
 * Extracts the necessary CSS to render the specified viewport and inlines it in the header and loads the rest of the CSS async
 */
gulp.task('critical', function () {
    return gulp.src('dist/index.html')
        .pipe(critical(
            {
                base: 'dist/',
                inline: true,
                css: [
                    './dist/assets/progressiveWebApp-d41d8cd98f00b204e9800998ecf8427e.css',
                    './dist/assets/vendor-5bbb871fac98ab6f881aec4262bb4269.css'
                ],
                width: 1300,
                height: 900,
                minify: true,
                extract: true
            }))
        .on('error', function(err) { log.error(err.message); })
        .pipe(gulp.dest('dist'));
});