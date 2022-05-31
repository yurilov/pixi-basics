import { Container } from "pixi.js";
import GameScene from "../gameScene/GameScene";
import { IScene, SceneManager } from "../sceneManager/SceneManager";
import StartGameField from "./startGameField/StartGameField";
import Style from "../gameScene/titleStyle/Style";

export default class MainScene extends Container implements IScene {
  startGameField: StartGameField;
  gameWidth: number;
  gameHeight: number;
  style: object;
  protected _manager: SceneManager;
  constructor(gameWidth: number, gameHeight: number, manager: SceneManager) {
    super();
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.style = new Style(this.gameWidth);
    this.startGameField = new StartGameField(
      this.gameWidth,
      this.gameHeight,
      this.style
    );
    this._manager = manager;
    this.setup();
    this.startGameField.on("click", () => {
      SceneManager.changeScene(
        new GameScene(
          SceneManager,
          this.gameWidth,
          this.gameHeight,
          15,
          2,
          250,
          10,
          3
        )
      );
    });
  }

  setup(): void {
    this.addChild(this.startGameField);
  }

  update() {}
}
