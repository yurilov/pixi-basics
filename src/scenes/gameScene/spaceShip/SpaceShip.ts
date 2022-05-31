import { Container, Sprite, Loader } from "pixi.js";

export default class SpaceShip extends Container {
  private gameWidth: number;
  private gameHeight: number;
  private speed: number;
  private sprite: Sprite;

  constructor(gameWidth: number, gameHeight: number, speed: number) {
    super();

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.speed = speed;
    const playerImg = Loader.shared.resources["player"].url;
    this.sprite = Sprite.from(playerImg);

    this.setup();
  }

  setup(): void {
    this.sprite.position.x = this.gameWidth * 0.5;
    this.sprite.position.y = this.gameHeight * 0.9;
    this.addChild(this.sprite);
  }

  moveSpriteLeft(delay: number): void {
    this.sprite.position.x -= delay * this.speed;

    if (this.sprite.position.x <= 0) {
      this.sprite.position.x = this.gameWidth;
    }
  }

  moveSpriteRight(delay: number): void {
    this.sprite.position.x += delay * this.speed;

    if (this.sprite.position.x >= this.gameWidth) {
      this.sprite.position.x = 0;
    }
  }

  moveSpriteUp(delay: number): void {
    this.sprite.position.y -= delay * this.speed;
  }

  moveSpriteDown(delay: number): void {
    this.sprite.position.y += delay * this.speed;
  }

  getSpitePositionX(): number {
    return this.sprite.position.x;
  }

  getSpitePositionY(): number {
    return this.sprite.position.y;
  }

  getSpiteWidth(): number {
    return this.sprite.width;
  }
}
