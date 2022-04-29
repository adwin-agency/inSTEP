import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otfToTtf = () =>
  // Ищем шрифты с расширением .otf
  app.gulp
    .src(`${app.path.srcFolder}/fonts/*.otf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "FONTS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    // Конвертируем в ttf
    .pipe(
      fonter({
        formats: ["ttf"],
      })
    )
    // Выгружаем в исходную папку
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`));
export const ttfToWoff = () =>
  // Ищем шрифты с расширением .ttf
  app.gulp
    .src(`${app.path.srcFolder}/fonts/*.ttf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "FONTS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    // Конвертируем в ttf
    .pipe(
      fonter({
        formats: ["woff"],
      })
    )
    // Выгружаем woff
    .pipe(app.gulp.dest(app.path.build.fonts))
    // Ищем .ttf
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    // Конвентируем
    .pipe(ttf2woff2())
    // Выгружаем woff2
    .pipe(app.gulp.dest(app.path.build.fonts));
export const fontGenerator = () => {
  const fontsFile = `${app.path.srcFolder}/style/fonts.scss`;

  fs.readdir(app.path.build.fonts, (err, fontsFiles) => {
    if (fontsFiles) {
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, "", () => {});
        let newFileOnly;

        for (let i = 0; i < fontsFiles.length; i++) {
          const fontFileName = fontsFiles[i].split(".")[0];

          if (newFileOnly !== fontFileName) {
            const fontName = fontFileName.split("-")[0]
              ? fontFileName.split("-")[0]
              : fontFileName;
            let fontWeight = fontFileName.split("-")[1]
              ? fontFileName.split("-")[1]
              : fontFileName;
            if (fontWeight.toLowerCase() === "thin") {
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() === "extralight") {
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() === "light") {
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() === "medium") {
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() === "semibold") {
              fontWeight = 600;
            } else if (
              fontWeight.toLowerCase() === "bold" ||
              fontWeight.toLowerCase() === "heavy"
            ) {
              fontWeight = 700;
            } else if (fontWeight.toLowerCase() === "extrabold") {
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() === "black") {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }
            fs.appendFile(
              fontsFile,
              `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`,
              () => {}
            );
            newFileOnly = fontFileName;
          }
        }
      } else {
        console.log(
          "Шрифты уже созданы удалите фаил fonts.scss если хотите перезаписать при сборке."
        );
      }
    }
  });
  return app.gulp.src(app.path.srcFolder);
};
