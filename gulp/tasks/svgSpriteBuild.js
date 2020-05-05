const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');

module.exports = function svgSpriteBuild() {
    return gulp.src('src/images/svg/*.svg')
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "../sprite.svg",
                    render: {
                        scss: {
                            dest:'../../styles/untils/_sprite.scss',
                            template: 'src/styles/mixins/_sprite_template.scss'
                        }
                    },
                    example: true
                }
            }
        }))
        .pipe(gulp.dest('src/images/'));
}