const { Text } = PIXI;

export default class LoseField extends Text {
  #gameWidth;
  #gameHeight;

  constructor(gameWidth, gameHeight, style, score) {
    super(`You lost. Final score is: ${score}`, style);

    this.#gameWidth = gameWidth;
    this.#gameHeight = gameHeight;

    this.setup();
  }

  setup() {
    this.position.x = this.#gameWidth / 2 - this.width / 2;
    this.position.y = this.#gameHeight / 2 - this.height / 2;
  }
}
