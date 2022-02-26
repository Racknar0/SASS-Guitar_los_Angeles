const { src, dest, watch, series } = require('gulp');
const plumber = require('gulp-plumber')

// Compilar CSS
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');
const rename = require('gulp-rename');

// Imagenes
const imagemin = require('gulp-imagemin');

function css( done ) {
    src('src/scss/app.scss') // Identificar el archivo principal
    .pipe(plumber()) //se instala el plumber antes de compilar
        .pipe( sass() ) // Compilar SASS
        .pipe( dest('build/css') ) // Exportarlo o guardarlo en una ubicación
    done();
}

function cssbuild( done ) {
    src('build/css/app.css')
        .pipe( rename({
            suffix: '.min'
        }))
        .pipe( purgecss({
            content: ['index.html', 'blog.html', 'entrada.html', 'nosotros.html', 'producto.html', 'tienda.html']
        }))
        .pipe( dest('build/css'))

    done();
}

function dev( done ) {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', )
    done();
}

function imagenes(done) {
    src('src/img/**/*')
        .pipe( imagemin({ optimizationLevel: 3}) )
        .pipe( dest('build/img') )
    done();
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.default = series(/*  imagenes, */ css, dev );
exports.build = series( cssbuild );