const { Text } = PIXI;

export default class StartGameField extends Text {
  #gameWidth;
  #gameHeight;

  constructor(gameWidth, gameHeight, style) {
    super("Start Game", style);

    this.#gameWidth = gameWidth;
    this.#gameHeight = gameHeight;

    this.setup();
  }

  setup() {
    this.interactive = true;
    this.buttonMode = true;
    this.position.x = this.#gameWidth / 2 - 100;
    this.position.y = this.#gameHeight / 2;
  }
}
