import { Container, Sprite } from "pixi.js";

export default class Background extends Container {
  #bcgPath;
  constructor(bcgPath) {
    super();
    this.#bcgPath = bcgPath;
    this.setup();
  }

  setup() {
    const backgroundImg = new Sprite.from(this.#bcgPath);
    this.addChild(backgroundImg);
  }
}
