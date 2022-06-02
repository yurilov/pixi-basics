import SceneManager from "./scenes/sceneManager/SceneManager";
import LoaderScene from "./scenes/loaderScene/LoaderScene";
import Stats from "stats.js";

const gameWidth = 1000;
const gameHeight = 600;

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
