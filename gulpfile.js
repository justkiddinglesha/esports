const gulp = require('gulp');

const serve = require('./gulp/tasks/serve');
const pugtohtml = require('./gulp/tasks/pugtohtml');
const styles = require('./gulp/tasks/styles');
// const script = require('./gulp/tasks/script');
const fonts = require('./gulp/tasks/fonts');
const imageMinify = require('./gulp/tasks/imageMinify');
const clean = require('./gulp/tasks/clean');
const copyDependencies = require('./gulp/tasks/copyDependencies');
// const lighthouse = require('./gulp/tasks/lighthouse');
const svgSprite = require('./gulp/tasks/svgSpriteBuild');

function setMode(isProduction = false) {
    return cb => {
        process.env.NODE_ENV = isProduction ? 'production' : 'development';
        cb()
    }
}

const dev = gulp.parallel(pugtohtml, styles, fonts, imageMinify, svgSprite);

const build = gulp.series(clean, copyDependencies, dev);

module.exports.start = gulp.series(setMode(), build, serve);
module.exports.build = gulp.series(setMode(true), build);

// module.exports.lighthouse = gulp.series(lighthouse);