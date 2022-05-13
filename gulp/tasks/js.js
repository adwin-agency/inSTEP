import webpack from "webpack-stream";

export const js = () =>
  app.gulp
    .src(app.path.src.js, { sourcemap: app.isDev })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "JS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      webpack({
        entry: app.path.src.js,
        output: {
          filename: "app.build.js",
        },

        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: "babel-loader",
            },
            {
              test: /\.css$/,
              use: ["style-loader", "css-loader"],
            },
          ],
        },
        mode: app.isBuild ? "production" : "development",
      })
    )
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browserSync.stream());
