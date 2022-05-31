import SceneManager from "./scenes/sceneManager/SceneManager";
import LoaderScene from "./scenes/loaderScene/LoaderScene";
import Stats from "stats.js";

// const canvas = document.querySelector("canvas");
const gameWidth = 1000;
const gameHeight = 600;

// const settings = {
//   view: canvas,
//   width: gameWidth,
//   height: gameHeight,
//   backgroundColor: 138298,
// };

// const app = new App(settings);
// app.setup();

SceneManager.initialize(gameWidth, gameHeight, 138298);

const loaderScene: LoaderScene = new LoaderScene();
SceneManager.changeScene(loaderScene);

const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

function animate() {
  stats.begin();

  stats.end();

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
