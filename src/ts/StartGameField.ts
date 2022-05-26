import { Text } from "pixi.js";

export default class StartGameField extends Text {
  private gameWidth: number;
  private gameHeight: number;

  constructor(gameWidth: number, gameHeight: number, style: object) {
    super("Start Game", style);

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.setup();
  }

  setup(): void {
    this.interactive = true;
    this.buttonMode = true;
    this.position.x = this.gameWidth / 2 - this.width / 2;
    this.position.y = this.gameHeight / 2 - this.height / 2;
  }
}
