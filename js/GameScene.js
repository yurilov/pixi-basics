const { Application, Container, Sprite, TextStyle, Text } = PIXI;

export class GameScene extends Container {
  constructor() {
    super();
    this.score = 0;
    this.background = new Container();
    this.addChild(background);

    this.players = new Container();
    this.addChild(players);

    this.bullets = new Container();
    this.addChild(bullets);

    this.enemies = new Container();
    this.addChild(enemies);

    this.stats = new Container();
    this.createScore(this.stats);
  }

  createScore(stats) {
    this.addChild(stats);
    const scoreStyle = new TextStyle({ fill: "#FFFFFF", fontSize: 14 });

    const scoreText = new Text(`Enemies killed: ${this.score}`, scoreStyle);
    stats.addChild(scoreText);
  }
}
