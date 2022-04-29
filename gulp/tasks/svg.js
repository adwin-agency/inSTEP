import svgSprite from "gulp-svg-sprite";

export const sprite = () =>
  app.gulp
    .src(app.path.src.spriteSvg)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SVG",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite/sprite.svg",
            example: false, // Страница примеров
          },
        },
      })
    )
    .pipe(app.gulp.dest(app.path.build.icons))
    .pipe(app.plugins.browserSync.stream());

export const svg = () =>
  app.gulp
    .src(app.path.src.svg)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SVG",
          message: "Error: <%= error.massege %>",
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.icons))
    .pipe(app.plugins.browserSync.stream());
