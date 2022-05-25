import { Application } from "pixi.js";
import Style from "./Style";
import GameScene from "./GameScene";
import MainScene from "./MainScene";
import WinField from "./WinField";
import LoseField from "./LoseField";
import RestartField from "./RestartField";

export default class App extends Application {
  gameWidth: number;
  gameHeight: number;
  gameScene: GameScene;
  mainScene: MainScene;
  state: string;
  style: Style;
  updateScene: (delay: number) => void;
  constructor(settings: any) {
    super(settings);
    this.gameWidth = settings.width;
    this.gameHeight = settings.height;
    this.state = "mainMenu";
    this.style = new Style(this.gameWidth);
    this.gameScene = new GameScene(
      this.gameWidth,
      this.gameHeight,
      15,
      2,
      250,
      10,
      3
    );
    this.mainScene = new MainScene(this.gameWidth, this.gameHeight);
    this.updateScene = this.gameScene.setup();
  }

  setup() {
    this.stage.addChild(this.mainScene);

    this.mainScene.startGameField.on("click", () => {
      this.state = "game";
      this.stage.removeChild(this.mainScene);
      this.stage.addChild(this.gameScene);
    });

    this.ticker.add((delay) => {
      if (this.state === "game") {
        this.updateScene(delay);
      }

      if (this.state === "mainMenu") {
        this.stage.removeChild(this.gameScene);
        this.stage.addChild(this.mainScene);
      }

      if (this.state === "winScreen") {
        this.stage.removeChild(this.gameScene);
      }

      if (this.state === "gameOver") {
        this.stage.removeChild(this.gameScene);
      }
    });
  }

  showWinScreen(score: number, livesCount: number) {
    const winField = new WinField(
      this.gameWidth,
      this.gameHeight,
      this.style,
      score,
      livesCount
    );

    this.stage.addChild(winField);
  }

  showLoseScreen(score: number) {
    const lostField = new LoseField(
      this.gameWidth,
      this.gameHeight,
      this.style,
      score
    );
    this.stage.addChild(lostField);

    const restartField = new RestartField(
      this.gameWidth,
      this.gameHeight,
      this.style
    );
    this.stage.addChild(restartField);
    restartField.on("click", () => {
      this.state = "mainMenu";
      for (const child of this.gameScene.children.slice()) {
        this.gameScene.removeChild(child);
      }
      this.setup();
    });
  }
}
