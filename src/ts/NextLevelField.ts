import { Text } from "pixi.js";

export default class NextLevelField extends Text {
  private gameWidth:number;
  private gameHeight:number;

  constructor(gameWidth:number, gameHeight:number, style:object) {
    super("Next level", style);

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.setup();
  }

  setup() {
    this.interactive = true;
    this.buttonMode = true;
    this.position.x = this.gameWidth - this.width;
    this.position.y = this.gameHeight - this.height;
  }
}
