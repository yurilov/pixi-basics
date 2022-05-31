import { Text } from "pixi.js";

export default class WinField extends Text {
  private gameWidth: number;
  private gameHeight: number;

  constructor(
    gameWidth: number,
    gameHeight: number,
    style: object,
    score: number,
    livesCount: number
  ) {
    super(
      `You won. Final score is: ${score}. Lives left: ${livesCount}`,
      style
    );

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.setup();
  }

  setup(): void {
    this.position.x = this.gameWidth / 2 - this.width / 2;
    this.position.y = this.gameHeight / 2 - this.height / 2;
  }
  update() {}
}
