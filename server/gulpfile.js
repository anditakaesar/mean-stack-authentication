// gulpfile to generate
var gulp = require('gulp');
var ts = require('gulp-typescript');

// gulp for typescript project
var tsProject = ts.createProject('tsconfig.json');

// build the .ts files to folder dist
function scripts() {
  var tsResult = tsProject.src().pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
}

// watch for changes
function watch() {
  gulp.watch('src/**/*.ts', scripts);
}

exports.scripts = scripts;
exports.watch = watch;

// create default series
var build = gulp.series(watch, scripts);

// expose task
gulp.task('build', build);

// default task -> run with 'gulp'
gulp.task('default', build);