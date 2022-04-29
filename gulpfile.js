/* eslint-disable import/extensions */
// Модули
import gulp from "gulp";
// Пути
import { path } from "./gulp/config/path.js";
// Плагины
import { plugins } from "./gulp/config/plugins.js";

// tasks
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { style } from "./gulp/tasks/style.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { ftpPush } from "./gulp/tasks/ftpPush.js";
import { ghPagePush } from "./gulp/tasks/ghPage.js";
import { sprite, svg } from "./gulp/tasks/svg.js";
import { reload } from "./gulp/tasks/reload.js";
import { otfToTtf, ttfToWoff, fontGenerator } from "./gulp/tasks/fonts.js";

// Передаем значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path,
  gulp,
  plugins,
};

// Наблюдатель
const watcher = () => {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, gulp.series(style, reload));
  // gulp.watch(path.watch.scss, style);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
  gulp.watch(path.watch.spriteSvg, sprite);
  gulp.watch(path.watch.svg, svg);
};

const fonts = gulp.series(otfToTtf, ttfToWoff, fontGenerator);

const tasks = gulp.series(
  fonts,
  gulp.parallel(copy, html, style, js, images, sprite, svg)
);

// Построение сценария выполнения задач
// series-последовательное выполнение в указанном порядке.
export const dev = gulp.series(reset, tasks, gulp.parallel(watcher, server));
export const build = gulp.series(reset, tasks);
export const deployFTP = gulp.series(reset, tasks, ftpPush);
export const deployGhPage = gulp.series(reset, tasks, ghPagePush);

gulp.task("default", dev);
