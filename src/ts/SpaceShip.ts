import { Container, Sprite } from "pixi.js";

export default class SpaceShip extends Container {
  #gameWidth;
  #gameHeight;
  #speed;
  #sprite;

  constructor(gameWidth, gameHeight, speed, imgPath) {
    super();

    this.#gameWidth = gameWidth;
    this.#gameHeight = gameHeight;
    this.#speed = speed;
    this.#sprite = Sprite.from(imgPath);

    this.setup();
  }

  setup() {
    this.#sprite.position.x = this.#gameWidth * 0.5;
    this.#sprite.position.y = this.#gameHeight * 0.9;
    this.addChild(this.#sprite);
  }

  moveSpriteLeft(delay) {
    this.#sprite.position.x -= delay * this.#speed;

    if (this.#sprite.position.x <= 0) {
      this.#sprite.position.x = this.#gameWidth;
    }
  }

  moveSpriteRight(delay) {
    this.#sprite.position.x += delay * this.#speed;

    if (this.#sprite.position.x >= this.#gameWidth) {
      this.#sprite.position.x = 0;
    }
  }

  moveSpriteUp(delay) {
    this.#sprite.position.y -= delay * this.#speed;
  }

  moveSpriteDown(delay) {
    this.#sprite.position.y += delay * this.#speed;
  }

  getSpitePositionX() {
    return this.#sprite.position.x;
  }

  getSpitePositionY() {
    return this.#sprite.position.y;
  }

  getSpiteWidth() {
    return this.#sprite.width;
  }
}
