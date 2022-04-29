import replace from "gulp-replace"; // Меняем названия файлов
import plumber from "gulp-plumber"; // Обрабатываем ошибки
import notify from "gulp-notify"; // Выводим обработанные ошибки
import browserSync from "browser-sync"; // Локальный сервер
import newer from "gulp-newer"; // кеширует фиайлы
import gulpIf from "gulp-if"; // Условия для разделения логики

export const plugins = {
  replace,
  plumber,
  notify,
  browserSync,
  newer,
  if: gulpIf,
};
