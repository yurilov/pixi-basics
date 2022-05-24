import { Container, Sprite } from "pixi.js";

export default class Bullets extends Container {
  private imgPath:string;
  constructor(imgPath:string) {
    super();

    this.imgPath = imgPath;
  }

  spawnBullet(spaceShip:any) {
    const bullet = Sprite.from(this.imgPath);
    bullet.position.x =
      spaceShip.getSpitePositionX() + spaceShip.getSpiteWidth() / 4;
    bullet.position.y = spaceShip.getSpitePositionY();
    bullet.scale.x = 0.25;
    bullet.scale.y = 0.25;
    this.addChild(bullet);
  }
}
