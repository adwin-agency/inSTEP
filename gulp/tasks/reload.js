export const reload = (done) => {
  app.plugins.browserSync.reload();
  done();
};
