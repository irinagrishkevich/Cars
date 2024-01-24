'use strict';

const {src, dest, watch, task} = require('gulp');
const less = require('gulp-less');
const concatCss = require('gulp-concat-css');

task('less', ()=>{
    return src('./src/style/*.less')
        .pipe(less())
        .pipe(concatCss("style.css"))
        .pipe(dest('./dist/style'));
})

task('watch', ()=> {
    watch('./src/style/*.less', task('less'));
});

task('default', task('watch'));