export const server = (done) => {
  app.plugins.browserSync.init({
    server: {
      baseDir: `${app.path.build.html}`,
    },
    notify: true, // сообщения в браузере
    port: 3000,
  });
};
