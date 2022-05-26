import { Container, TextStyle, Text } from "pixi.js";

export default class GameScore extends Container {
  private score: number;
  constructor(score: number) {
    super();

    this.score = score;
    this.setup();
  }

  setup(): void {
    const scoreStyle = new TextStyle({
      fill: "#FFFFFF",
      fontSize: 20,
      fontFamily: "Arial",
    });

    const scoreText = new Text(`Enemies killed: ${this.score}`, scoreStyle);
    this.addChild(scoreText);
  }

  updateScore(newScore: number): void {
    this.score = newScore;
    this.children[0].text = `Enemies killed: ${this.score}`;
  }
}
