import { Container } from "pixi.js";
import { IScene } from "./Manager/Manager";
import StartGameField from "./StartGameField";
import Style from "./Style";

export default class MainScene extends Container implements IScene {
  startGameField: StartGameField;
  gameWidth: number;
  gameHeight: number;
  style: object;
  constructor(gameWidth: number, gameHeight: number) {
    super();
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.style = new Style(this.gameWidth);
    this.startGameField = new StartGameField(
      this.gameWidth,
      this.gameHeight,
      this.style
    );
    this.setup();
  }

  setup(): void {
    this.addChild(this.startGameField);
  }

  update() {}
}
