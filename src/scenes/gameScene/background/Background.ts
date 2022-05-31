import { Container, Loader, Sprite } from "pixi.js";

export default class Background extends Container {
  constructor() {
    super();
    this.setup();
  }

  setup(): void {
    const bcg = Loader.shared.resources["bcg"].url;
    console.log(bcg);
    const backgroundImg = Sprite.from(bcg);
    this.addChild(backgroundImg);
  }
}
