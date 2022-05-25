import { Container, Sprite } from "pixi.js";

export default class SpaceShip extends Container {
  private gameWidth: number;
  private gameHeight: number;
  private speed: number;
  private sprite;

  constructor(
    gameWidth: number,
    gameHeight: number,
    speed: number,
    imgPath: string
  ) {
    super();

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.speed = speed;
    this.sprite = Sprite.from(imgPath);

    this.setup();
  }

  setup() {
    this.sprite.position.x = this.gameWidth * 0.5;
    this.sprite.position.y = this.gameHeight * 0.9;
    this.addChild(this.sprite);
  }

  moveSpriteLeft(delay: number) {
    this.sprite.position.x -= delay * this.speed;

    if (this.sprite.position.x <= 0) {
      this.sprite.position.x = this.gameWidth;
    }
  }

  moveSpriteRight(delay: number) {
    this.sprite.position.x += delay * this.speed;

    if (this.sprite.position.x >= this.gameWidth) {
      this.sprite.position.x = 0;
    }
  }

  moveSpriteUp(delay: number) {
    this.sprite.position.y -= delay * this.speed;
  }

  moveSpriteDown(delay: number) {
    this.sprite.position.y += delay * this.speed;
  }

  getSpitePositionX() {
    return this.sprite.position.x;
  }

  getSpitePositionY() {
    return this.sprite.position.y;
  }

  getSpiteWidth() {
    return this.sprite.width;
  }
}
