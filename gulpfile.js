'use strict';

const {src, dest, watch, task} = require('gulp');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const concatCss = require('gulp-concat-css');

task('less', ()=>{
    return src('./src/style/style.less')
        .pipe(less())
        .pipe(concatCss("style.css"))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('./dist/style'));
})

task('watch', ()=> {
    watch('./src/style/style.less', task('less'));
});

task('default', task('watch'));