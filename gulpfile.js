const cleancss = require('clean-css')
const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const filelog = require('gulp-filelog')
const imagemin = require('gulp-imagemin')
const jsImport = require('gulp-js-import');
const optimizejs = require('gulp-optimize-js')
const plumber = require('gulp-plumber')
const sass = require('gulp-sass')
const sftp = require('gulp-sftp-clean');
const uglify = require('gulp-uglify')
const webp = require('gulp-webp');
const webserver = require('gulp-webserver');
const imageminGuetzli = require('imagemin-guetzli');
const map = require('vinyl-map')


const cCSS = new cleancss()

//wrapped in a function so it works with gulp.watch (+consistency)
const minify = () => map((buff, filename) =>
    cCSS.minify(buff.toString()).styles)

//used by all gulp tasks instead of gulp.src(...)
//plumber prevents pipes from stopping when errors occur
//changed only passes on files that were modified since last time
//filelog logs and counts all processed files

const beginPipe = src =>
    gulp.src(src)
        .pipe(plumber())
        .pipe(filelog())

gulp.task('copy', () => {
    beginPipe(['./src/**/*.{php,htm,html,json}', './src/**/.*'])
        .pipe(gulp.dest(`./build`));
})


//minify images
gulp.task('images', () => {
    beginPipe('./src/static/images/**/*.*')
        .pipe(webp({
            quality: 80,
            preset: 'photo',
            method: 6
        }))
    .pipe(gulp.dest(`./build/images`)),

    beginPipe('./src/static/images/**/*.png')
    .pipe(imagemin([
        imageminGuetzli({
            quality: 85
        })
    ]))
    .pipe(gulp.dest(`./build/images`)),

    beginPipe('./src/static/images/**/*.{jpg, jpeg}')
    .pipe(imagemin({
        progressive: true
    }))
    .pipe(gulp.dest(`./build/images`))
})

gulp.task('styles', () => {
    beginPipe('./src/static/**/*.{css,sass,scss}')
        .pipe(sass())
        .pipe(minify())
        .pipe(autoprefixer({ browsers: ['last 3 major versions'] }))
        .pipe(gulp.dest(`./build`));
})

//compile/transpile JSX and ES6 to ES5 and minify scripts
gulp.task('scripts', () => {
    beginPipe(['./src/static/**/*.js','./src/sw.js'])
        .pipe(jsImport({hideConsole: true}))
        .pipe(babel({
            presets: [["es2015", { modules: false }]],
        }))
        .pipe(optimizejs())
        .pipe(uglify())
        .pipe(gulp.dest(`./build`))
})

gulp.task('webserver', function() {
    gulp.src('./build')
      .pipe(webserver({
        livereload: true,
        directoryListing: true,
        open: 'http://localhost:8000/index.html',
        https: false,
      }));
  });

gulp.task('upload', function () {
    return gulp.src('./build/**/*')
    .pipe(sftp({
        host: 'ssh.hackedit.de',
        auth: 'keyMain',
        remotePath: '/customers/a/8/d/hackedit.de/httpd.www/beta-adrianjost'
    }));
});
//run all tasks, processing changed files
gulp.task('deploy', ['build-all', 'upload'])
gulp.task('build-all', ['copy', 'images', 'styles', 'scripts'])

//watch and run corresponding task on change, process changed files only
gulp.task('watch', ['build-all', 'webserver'], () => {
    gulp.watch(['./src/**/*.{php,htm,html,json}', './src/**/.*'], ['copy'])
    gulp.watch('./src/static/images/**/*.*', ['images'])
    gulp.watch('./src/static/**/*.{css,sass,scss}', ['styles'])
    gulp.watch(['./src/static/**/*.js','./src/sw.js'], ['scripts'])
})

//run this if only "gulp" is run on the commandline with no task specified
gulp.task('default', ['build-all'])
