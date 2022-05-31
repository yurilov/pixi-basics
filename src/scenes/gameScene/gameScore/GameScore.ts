import { Container, TextStyle, Text } from "pixi.js";

export default class GameScore extends Container {
  private score: number;
  private scoreText: Text;
  private scoreStyle: TextStyle;
  constructor(score: number) {
    super();

    this.score = score;
    this.scoreStyle = new TextStyle({
      fill: "#FFFFFF",
      fontSize: 20,
      fontFamily: "Arial",
    });
    this.scoreText = new Text(`Enemies killed: ${this.score}`, this.scoreStyle);
    this.setup();
  }

  setup(): void {
    this.addChild(this.scoreText);
  }

  updateScore(newScore: number): void {
    this.score = newScore;
    this.scoreText.text = `Enemies killed: ${this.score}`;
  }
}
