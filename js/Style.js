const { TextStyle } = PIXI;

export default class Style extends TextStyle {
  constructor(gameWidth) {
    super({
      fontFamily: "Arial",
      fill: "#FFF",
      fontSize: 36,
      wordWrap: true,
      wordWrapWidth: gameWidth / 2 - 100,
    });
  }
}
