import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css";
import webpcss from "gulp-webpcss";
import autoPrefixer from "gulp-autoprefixer";
import gulpGroupCssMediaQueries from "gulp-group-css-media-queries";

const sass = gulpSass(dartSass);

export const style = () =>
  app.gulp
    .src(app.path.src.scss, { sourcemap: app.isDev })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "STYLE",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.plugins.replace(/@img\//g, "../images/")) // Ставим корректные пути к картинкам
    .pipe(app.plugins.replace(/@svg\//g, "../icons/")) // Ставим корректные пути к картинкам
    .pipe(
      sass({
        outputStyle: "expanded",
      })
    )
    .pipe(app.plugins.if(app.isBuild, gulpGroupCssMediaQueries()))
    .pipe(
      app.plugins.if(
        app.isBuild,
        webpcss({
          webpClass: ".webp",
          noWebpClass: ".no-webp",
        })
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        autoPrefixer({
          grid: true,
          overrideBrowserslist: ["last 3 versions"],
          cascade: true,
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.css)) // не сжатый
    .pipe(app.plugins.if(app.isBuild, cleanCss()))
    .pipe(
      rename({
        extname: ".build.css",
      })
    )
    .pipe(app.gulp.dest(app.path.build.css));
// .pipe(app.plugins.browserSync.stream());
