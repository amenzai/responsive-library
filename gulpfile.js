/*
 * @Author: amenzai <amenzai@qq.com>
 * @Version: 1.0.0
 * @Date:   2016-11-06 16:19:40
 * @Last Modified by:   achao
 * @Last Modified time: 2016-12-14 15:42:03
 *
 * @Summary:
 *
 *  description....
 */

'use strict';

// 载入Gulp模块
var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// 注册样式编译任务
gulp.task('style', function() {
  gulp.src('src/styles/main.less')
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'Android >= 4.0']
    }))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'))
    .pipe(reload({
      stream: true
    }));
});

// 注册脚本合并压缩任务
gulp.task('script', function() {
  gulp.src('src/scripts/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('image', function() {
  gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/img'))
    .pipe(reload({
      stream: true
    }));
})
gulp.task('lib', function() {
  gulp.src('src/lib/**/*')
    .pipe(gulp.dest('dist/lib'))
    .pipe(reload({
      stream: true
    }));
})

gulp.task('html', function() {
  gulp.src('src/*.html')
    // .pipe(htmlmin({
    //   collapseWhitespace: true,
    //   collapseBooleanAttributes: true,
    //   removeAttributeQuotes: true,
    //   removeComments: true,
    //   removeEmptyAttributes: true,
    //   removeScriptTypeAttributes: true,
    //   removeStyleLinkTypeAttributes: true,
    // }))
    .pipe(gulp.dest('dist'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('serve', ['style', 'script', 'image', 'lib', 'html'], function() {
  browserSync({
    notify: false,
    port: 2016,
    server: {
      baseDir: ['dist']
    }
  });
  gulp.watch('src/styles/**/*.less', ['style']);
  gulp.watch('src/scripts/*.js', ['script']);
  gulp.watch('src/images/**/*', ['image']);
  gulp.watch('src/lib/**/*', ['lib']);
  gulp.watch('src/*.html', ['html']);
});
