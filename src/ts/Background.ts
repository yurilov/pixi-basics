import { Container, Sprite } from "pixi.js";

export default class Background extends Container {
  private bcgPath: string;

  constructor(bcgPath: string) {
    super();
    this.bcgPath = bcgPath;
    this.setup();
  }

  setup() {
    const backgroundImg = Sprite.from(this.bcgPath);
    this.addChild(backgroundImg);
  }
}
