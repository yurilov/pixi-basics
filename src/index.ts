import App from "./ts/App";

const canvas = document.querySelector("canvas");
const gameWidth = 1000;
const gameHeight = 600;

const settings = {
  view: canvas,
  width: gameWidth,
  height: gameHeight,
  backgroundColor: 138298,
};

const app = new App(settings);
app.setup();
