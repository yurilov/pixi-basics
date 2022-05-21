const { Text } = PIXI;

export default class NextLevelField extends Text {
  #gameWidth;
  #gameHeight;

  constructor(gameWidth, gameHeight, style) {
    super("Next level", style);

    this.#gameWidth = gameWidth;
    this.#gameHeight = gameHeight;

    this.setup();
  }

  setup() {
    this.interactive = true;
    this.buttonMode = true;
    this.position.x = this.#gameWidth - this.width;
    this.position.y = this.#gameHeight - this.height;
  }
}
