import * as nodePath from "path";

const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = "./dist";
const srcFolder = "./src";

export const path = {
  build: {
    css: `${buildFolder}/style/`,
    html: `${buildFolder}/`,
    files: `${buildFolder}/files/`,
    images: `${buildFolder}/images/`,
    js: `${buildFolder}/js/`,
    fonts: `${buildFolder}/fonts/`,
    icons: `${buildFolder}/icons/`,
  },
  src: {
    js: `${srcFolder}/js/app.js`,
    scss: `${srcFolder}/style/style.scss`,
    html: `${srcFolder}/*.html`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp,ico}`,
    svg: [`${srcFolder}/icons/**/*.svg`, `!${srcFolder}/icons/sprite/**/*.svg`],
    spriteSvg: `${srcFolder}/icons/sprite/*.svg`,
    files: `${srcFolder}/files/**/*.*`,
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    scss: [`${srcFolder}/components/**/*.scss`, `${srcFolder}/style/*.scss`],
    html: `${srcFolder}/**/*.html`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
    files: `${srcFolder}/files/**/*.*`,
    svg: [`${srcFolder}/icons/**/*.svg`, `!${srcFolder}/icons/sprite/**/*.svg`],
    spriteSvg: `${srcFolder}/icons/sprite/*.svg`,
  },
  clean: buildFolder,
  buildFolder,
  srcFolder,
  rootFolder,
  ftp: "", // название папки на сервере
};
