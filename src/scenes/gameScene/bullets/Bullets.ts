import { Container, Sprite, Loader } from "pixi.js";

export default class Bullets extends Container {
  constructor() {
    super();
  }

  spawnBullet(spaceShip: any): void {
    const bulletImg = Loader.shared.resources["bullet"].url;

    const bullet = Sprite.from(bulletImg);
    bullet.position.x =
      spaceShip.getSpitePositionX() + spaceShip.getSpiteWidth() / 4;
    bullet.position.y = spaceShip.getSpitePositionY();
    bullet.scale.x = 0.25;
    bullet.scale.y = 0.25;
    this.addChild(bullet);
  }
}
