const { Container, Sprite } = PIXI;

export default class Bullets extends Container {
  constructor() {
    super();
  }

  spawnBullet(spaceShip) {
    const bullet = Sprite.from("./resources/bullet.png");
    bullet.position.x =
      spaceShip.getSpitePositionX() + spaceShip.getSpiteWidth() / 4;
    bullet.position.y = spaceShip.getSpitePositionY();
    bullet.scale.x = 0.25;
    bullet.scale.y = 0.25;
    this.addChild(bullet);
  }
}
