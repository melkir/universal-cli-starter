const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const ts = require('gulp-typescript');

// Pull in the project Typescript config
const tsProject = ts.createProject('src/server/tsconfig.json');
const nodemonOptions = {
  script: 'dist-server/bin/www.js',
  ext: 'js',
  env: {'NODE_ENV': 'development'},
  verbose: false,
  ignore: []
};

gulp.task('compile', () => {
  return tsProject.src()
    .pipe(tsProject()).js
    .pipe(gulp.dest('dist-server'));
});

gulp.task('watch', ['compile'], () => {
  nodemon(nodemonOptions).on('restart', () => {
    console.log('restarted!')
  });
});

gulp.task('default', ['watch']);
