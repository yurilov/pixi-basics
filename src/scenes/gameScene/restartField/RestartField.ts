import { Text } from "pixi.js";

export default class RestartField extends Text {
  private gameWidth: number;
  private gameHeight: number;

  constructor(gameWidth: number, gameHeight: number, style: object) {
    super("Restart Game", style);

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.setup();
  }

  setup(): void {
    this.interactive = true;
    this.buttonMode = true;
    this.position.x = this.gameWidth - this.width;
    this.position.y = this.gameHeight - this.height;
  }
}
