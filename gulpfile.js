const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const browserSync = require('browser-sync').create();
const plugins = require('./js/modules');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');

// from smartgriid ///////////////////////////////////////////////
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
/* const less = require('gulp-less'); */
const gcmq = require('gulp-group-css-media-queries');
const smartgrid = require('smart-grid');

// config /////////////////////////////////////////////////////////
const config = {
    root: './dist/',
    // html: {
    //     src: 'index.html'
    // },
    // css_less: {
    //     watch: 'precss/**/*.less', // прослушка и источник это разные файлы
    //     src: 'precss/+(styles|styles-per|styles-ie9).less',
    //     dest: './dist/css' // было dest: 'css'
    // },
    smartgrid: {
        src: 'smartgrid.js',
        dest: 'scss/smart-grid'
    }
};

// building smartgriid /////////////////////////////////////////////
gulp.task('grid', function(){
    delete require.cache[require.resolve('./' + config.smartgrid.src)];
    let options = require('./' + config.smartgrid.src);
    smartgrid(config.smartgrid.dest, options);

    options.offset = '3.15%';
    options.breakPoints.xxs.offset = '1%';
    options.filename = 'smart-grid-per';
    smartgrid(config.smartgrid.dest, options);
});



// CSS Tasks
gulp.task('css-compile', function() {
  gulp.src('scss/**/*.scss')
    .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('css-minify', function() {
    gulp.src(['./dist/css/*.css', '!dist/css/*.min.css'])
      .pipe(cssmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./dist/css'))
});

// JavaScript Tasks
gulp.task('js-build', function() {
  gulp.src(plugins.modules)
    .pipe(concat('mdb.js'))
    .pipe(gulp.dest('./dist/js/'))
});

gulp.task('js-minify', function() {
  gulp.src('./dist/js/mdb.js')
    .pipe(minify({
      ext:{
        // src:'.js',
        min:'.min.js'
      },
      noSource: true,
    }))
    .pipe(gulp.dest('./dist/js'));
});

// Image Compression
gulp.task('img-compression', function() {
  gulp.src('./img/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest('./dist/img'));
});

// Live Server
gulp.task('live-server', function() {
  browserSync.init({
    server: {
      baseDir: "./dist",
      directory: true
    },
    notify: false
  });

  gulp.watch("**/*", {cwd: './dist/'}, browserSync.reload);
});

// Watch on everything
gulp.task('mdb-go', function() {
  gulp.start('live-server');
  gulp.watch("scss/**/*.scss", ['css-compile']);
  // gulp.watch(["dist/css/*.css", "!dist/css/*.min.css"], ['css-minify']);
  // gulp.watch("js/**/*.js", ['js-build']);
  // gulp.watch("dist/js/mdb.js", ['js-minify']);
  gulp.watch("**/*", {cwd: './img/'}, ['img-compression']);
});
