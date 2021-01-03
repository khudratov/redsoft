const { dest, src, parallel, series, watch } = require("gulp");
const browsersync = require("browser-sync").create();
const fileinclude = require("gulp-file-include");
const del = require("del");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const clean_css = require("gulp-clean-css");
const rename = require("gulp-rename");
const concatCss = require("gulp-concat-css");

const src_cat = "src";
const dist_cat = "dist";

const path = {
  build: dist_cat,
  src: {
    html: src_cat + "/index.html",
    scss: src_cat + "/**/*.scss",
    img: src_cat + "/**/*.{svg, png, jpeg}",
  },
  watch: {
    html: src_cat + "/**/*.html",
    sass: src_cat + "/**/*.scss",
  },
  clean: dist_cat,
};

function browserSync() {
  browsersync.init({
    server: {
      baseDir: path.build + "/",
    },
    port: 3000,
    notify: false,
  });
}

function html() {
  return src(path.src.html)
    .pipe(
      fileinclude({
        basepath: __dirname + "/src",
      })
    )
    .pipe(dest(path.build))
    .pipe(browsersync.stream());
}

function images() {
  return src(path.src.img)
    .pipe(dest(path.build))
    .pipe(browsersync.stream());
}

function css() {
  return src(path.src.scss)
    .pipe(
      sass({
        outputStyle: "expanded",
      })
    )
    .pipe(
      autoprefixer({
        cascade: true,
        overrideBrowserslist: ["last 5 versions"],
      })
    )
    .pipe(clean_css())
    .pipe(concatCss("bundle.css"))
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(dest(path.build))
    .pipe(browsersync.stream());
}

function clean() {
  return del(path.clean);
}

function watchFiles() {
  watch([path.watch.html], html);
  watch([path.watch.sass], css);
}

let build = series(clean, parallel(css, html, images));
let serve = parallel(build, watchFiles, browserSync);

exports.build = build;
exports.serve = serve;
