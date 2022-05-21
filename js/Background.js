const { Container, Sprite } = PIXI;

export class Background extends Container {
  constructor() {
    super();
    this.setup();
  }

  setup() {
    const backgroundImg = new Sprite.from("../resources/bcg.png");
    this.addChild(backgroundImg);
  }
}