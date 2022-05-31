import { TextStyle } from "pixi.js";

export default class Style extends TextStyle {
  constructor(gameWidth: number) {
    super({
      fontFamily: "Arial",
      fill: "#FFF",
      fontSize: 36,
      wordWrap: true,
      wordWrapWidth: gameWidth / 2 - 100,
    });
  }
}
