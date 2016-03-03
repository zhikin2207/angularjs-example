var config = require('./gulp.config.json');
var gulp = require('gulp');
var plug = require('gulp-load-plugins')();
var mainBowerFiles = require('main-bower-files');
var stylish = require('jshint-stylish');
var server = require('karma').Server;

// remove www folder
gulp.task('clean', function () {
    return gulp
        .src('./www', {read: false})
        .pipe(plug.clean());
});

// create project build
gulp.task('build', ['inject']);

// inject js, css into result index.html and copy it to www folder
gulp.task('inject', ['js', 'tpl', 'assets', 'css'], function () {
    return gulp
        .src(config.src.index)
        .pipe(plug.inject(gulp.src(mainBowerFiles(), {read: false}), {name: 'bower'}))
        .pipe(plug.inject(gulp.src('./www/build/*.js', {read: false})))
        .pipe(plug.inject(gulp.src('./www/assets/**/*.css', {read: false})))
        .pipe(gulp.dest('./www'));
});

// handle all js files and copy to www folder
gulp.task('js', ['jshint'], function () {
    var task = gulp
        .src(config.src.js)
        .pipe(plug.ngAnnotate({
            'single_quotes': true
        }))
        .pipe(plug.concat('all.js'));

    if (config.mode === 'release') {
        task
            .pipe(plug.uglify())
            .pipe(plug.rename('all.min.js'));
    }

    return task.pipe(gulp.dest('./www/build'));
});

// copy all templates to www folder
gulp.task('tpl', function () {
    return gulp
        .src(config.src.tpl)
        .pipe(gulp.dest('./www'));
});

// handle and copy all css files into www folder
gulp.task('css', function () {
    return gulp
        .src(config.src.css)
        .pipe(plug.concat('style.min.css'))
        .pipe(plug.minifyCss('style.min.css'))
        .pipe(gulp.dest('./www/assets'));
});

// copy all assets to www folder
gulp.task('assets', function () {
    return gulp
        .src([config.src.assets, '!' + config.src.css])
        .pipe(gulp.dest('./www/assets'));
});

// check jsHing rules over js files
gulp.task('jshint', function () {
    return gulp
        .src(config.src.js)
        .pipe(plug.jshint())
        .pipe(plug.jshint.reporter(stylish));
});

// run unit tests
gulp.task('unit-test', function (done) {
    new server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});