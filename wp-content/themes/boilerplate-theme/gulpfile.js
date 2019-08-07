'use strict';

const gulp = require('gulp'),
    clean = require('gulp-clean'),
    zip = require('gulp-zip'),
    composer = require('gulp-composer');

/**
 * Build final zip from dist/temp folder
 */
gulp.task('zip', () => {
    return gulp.src([
        './dist/temp/**/*',
        '!./dist/temp{node_modules,node_modules/**/*}',
        '!./dist/temp/{src,src/**/*}',
        '!./dist/temp/templates/**/*.js',
        '!./dist/temp/{dist,dist/**/*}',
        '!./dist/temp/gulpfile.js',
        '!./dist/temp/package.json',
        '!./dist/temp/package-lock.json',
        '!./dist/temp/composer.json',
        '!./dist/temp/composer.lock',
        '!./dist/temp/README.md',
        '!./dist/temp/webpack.config.js',
    ])
        .pipe(zip('wp-4p.zip'))
        .pipe(gulp.dest('./dist'));
});


/**
 * Copy all necessary files from theme to dist/temp folder
 */
gulp.task('copy-files-temp', () => {
    return gulp.src([
        './**/*',
        '!./{node_modules,node_modules/**/*}',
        '!./{src,src/**/*}',
        '!./templates/**/*.js',
        '!./{dist,dist/**/*}',
        '!./{vendor,vendor/**/*}',
        '!./gulpfile.js',
        '!./package.json',
        '!./package-lock.json',
        '!./README.md',
        '!./webpack.config.js',
    ])
        .pipe(gulp.dest('./dist/temp'));
});

/**
 * Install dependencies from composer
 */
gulp.task('install-composer-dependencies', () => {
    return composer({
        'working-dir': './dist/temp',
        'bin': 'composer',
        'async': true,
        'no-ansi': true,
        'no-dev': true,
        'no-interaction': true,
        'no-progress': true,
        'no-scripts': true,
        'optimize-autoloader': true
    });
});

/**
 * Clean dist/temp folder
 */
gulp.task('clean-temp-folder', () => {
    return gulp.src('./dist/temp', {read: false})
        .pipe(clean());
});

/**
 * build theme, call all tasks
 */
gulp.task('build-theme', gulp.series('copy-files-temp', 'install-composer-dependencies', 'zip', 'clean-temp-folder'));
