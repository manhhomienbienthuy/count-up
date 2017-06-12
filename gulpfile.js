/*!
 * gulpfile for count-up
 * Description: Count up for my April girl
 * Copyright (C) 2017-present Anh Tranngoc
 * This file is distributed under the same license as the count-up package.
 * Anh Tranngoc <naa@sfc.wide.ad.jp>, 2017.
 */

'use strict';

// Load basic plugins
const gulp        = require('gulp'),
      gulpif      = require('gulp-if'),
      argv        = require('yargs').argv,
      production  = !!argv.production; // --production

// Load plugins for stylesheet task
const sass          = require('gulp-sass'),
      csslint       = require('gulp-csslint'),
      sourcemaps    = require('gulp-sourcemaps'),
      postcss       = require('gulp-postcss'),
      cssnext       = require('postcss-cssnext'),
      cssnano       = require('cssnano'),
      mqpacker      = require('css-mqpacker'),
      plumber       = require('gulp-plumber');

// Load plugins for javascript task
const eslint  = require('gulp-eslint'),
      uglify  = require('gulp-uglify'),
      header  = require('gulp-header'),
      browserify = require('browserify'),
      babelify   = require('babelify'),
      source     = require('vinyl-source-stream'),
      buffer     = require('vinyl-buffer'),
      glob       = require('glob'),
      transform  = require('vinyl-transform'),
      collapse   = require('bundle-collapser/plugin'),
      uglifyify  = require('uglifyify');

// Live reload for any changes
const browser_sync = require('browser-sync').create();

const config = {
    src: {
        css: 'static/src/scss/**/*.scss',
        js: 'static/src/js/**/*.jsx',
        img: 'static/src/img/*',
        sync: ['index.html', 'static/dest/**/*']
    },
    dest: {
        css: 'static/dest/css',
        js: 'static/dest/js',
        img: 'static/dest/img'
    },
    postcss: {
        plugins: [
            cssnext({
                browsers: [
                    'last 2 versions',
                    '> 1%',
                    'iOS 7'
                ]
            }),
            cssnano({autoprefixer: false}),
            mqpacker()
        ]
    },
    babel: {
        presets: [
            'es2015',
            'react'
        ]
    },
    uglify: {
        compress: {
            unused: true,
            dead_code: true
        }
    },
    plumber: {
        errorHandler: function(error) {
            console.log(error.toString());
            this.emit('end');
        }
    },
    header: [
        '/*!',
        ' * Script for count-up',
        ' * Description: Count up for my April girl',
        ' * Copyright (C) 2017-present Anh Tranngoc',
        ' * This file is distributed under the same license as the count-up package.',
        ' * Anh Tranngoc <naa@sfc.wide.ad.jp>, 2017.',
        ' */',
        ''
    ].join('\n'),
    browser_sync: {
        server: {
            baseDir: './'
        },
        port: '8000',
        notify: {
            styles: {
                top: 'auto',
                bottom: 0,
                left: 0,
                right: 'auto',
                borderRadius: '0 10px 0 0'
            }
        }
    }
};
config.browserify = {
    debug: !production,
    entries: glob.sync(config.src.js),
    extensions: [
        ".jsx"
    ]
}

gulp.task('set-env', () => {
    const env = production ? 'production' : 'development';
    return process.env.NODE_ENV = env;
});

gulp.task('css', () => {
    return gulp
        .src(config.src.css)
        .pipe(plumber(config.plumber))
        .pipe(gulpif(!production, sourcemaps.init()))
        .pipe(sass())
        .pipe(postcss(config.postcss.plugins))
        .pipe(csslint('.csslintrc.json'))
        .pipe(csslint.formatter('compact'))
        .pipe(gulpif(!production, sourcemaps.write('.')))
        .pipe(gulp.dest(config.dest.css))
});

gulp.task('img', () => {
    return gulp
        .src(config.src.img)
        .pipe(gulp.dest(config.dest.img))
});

gulp.task('js-lint', () => {
    return gulp
        .src(config.src.js)
        .pipe(eslint('.eslintrc.json'))
        .pipe(eslint.format());
});

gulp.task('js', ['js-lint'], () => {
    return browserify(config.browserify)
        .plugin(collapse)
        .transform(babelify.configure(config.babel))
        .transform(uglifyify)
        .bundle()
        .pipe(plumber(config.plumber))
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulpif(!production, sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(production, uglify(config.uglify)))
        .pipe(header(config.header))
        .pipe(gulpif(!production, sourcemaps.write('.')))
        .pipe(gulp.dest(config.dest.js))
});

gulp.task('build', [
    'set-env',
    'css',
    'js',
    'img'
]);

gulp.task('watch', ['build'], () => {
        browser_sync.init(config.browser_sync);

        gulp.watch(config.src.css, ['css']);
        gulp.watch(config.src.js, ['js-lint', 'js']);
        gulp.watch(config.src.img, ['img']);

        gulp.watch(config.src.sync).on('change', browser_sync.reload);
    }
);

gulp.task('default', ['watch']);
