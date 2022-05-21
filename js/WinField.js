const { Text } = PIXI;

export default class WinField extends Text {
  #gameWidth;
  #gameHeight;

  constructor(gameWidth, gameHeight, style, score, livesCount) {
    super(
      `You won. Final score is: ${score}. Lives left: ${livesCount}`,
      style
    );

    this.#gameWidth = gameWidth;
    this.#gameHeight = gameHeight;

    this.setup();
  }

  setup() {
    this.position.x = this.#gameWidth / 2 - this.width / 2;
    this.position.y = this.#gameHeight / 2 - this.height / 2;
  }
}
