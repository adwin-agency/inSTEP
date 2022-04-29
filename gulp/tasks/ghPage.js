import ghPage from "gh-pages";

export const ghPagePush = () =>
  ghPage.publish("dist", (err) => {
    console.log(`${err}`);
  });
