import { Application } from "pixi.js";
import Style from "./Style";
import GameScene from "./GameScene";
import MainScene from "./MainScene";
import WinField from "./WinField";
import LoseField from "./LoseField";
import RestartField from "./RestartField";

export default class App extends Application {
  gameWidth: number;
  gameHeight: number;
  gameScene: GameScene;
  mainScene: MainScene;
  state: string;
  style: Style;
  updateScene: (delay: number) => void;
  constructor(settings: any) {
    super(settings);
    this.gameWidth = settings.width;
    this.gameHeight = settings.height;
    this.state = "mainMenu";
    this.style = new Style(this.gameWidth);
    this.gameScene = new GameScene(
      this.gameWidth,
      this.gameHeight,
      15,
      2,
      250,
      10,
      3
    );
    this.mainScene = new MainScene(this.gameWidth, this.gameHeight);
    this.updateScene = this.createGameScene();
  }

  setup(): void {
    this.stage.addChild(this.mainScene);

    this.mainScene.startGameField.on("click", () => {
      this.state = "game";
      this.stage.removeChild(this.mainScene);
      this.stage.addChild(this.gameScene);
    });

    this.ticker.add((delay) => {
      if (this.state === "game") {
        this.updateScene(delay);
      }

      if (this.state === "mainMenu") {
        this.stage.removeChild(this.gameScene);
        this.stage.addChild(this.mainScene);
      }

      if (this.state === "winScreen") {
        this.stage.removeChild(this.gameScene);
      }

      if (this.state === "gameOver") {
        this.stage.removeChild(this.gameScene);
      }
    });
  }

  createGameScene() {
    document.onkeydown = (event) => {
      this.gameScene.keysMaps[event.code] = true;
    };

    document.onkeyup = (event) => {
      this.gameScene.keysMaps[event.code] = false;
    };

    document.onmousedown = () => {
      this.gameScene.isMouseFlag = true;
    };

    document.onmouseup = () => {
      this.gameScene.isMouseFlag = false;
    };

    this.gameScene.addChild(this.gameScene.background);
    this.gameScene.addChild(this.gameScene.spaceShip);
    this.gameScene.addChild(this.gameScene.bullets);
    this.gameScene.addChild(this.gameScene.enemies);
    this.gameScene.addChild(this.gameScene.stats);
    this.gameScene.addChild(this.gameScene.lives);
    return (delay: number) => {
      if (this.gameScene.keysMaps["ArrowLeft"]) {
        this.gameScene.spaceShip.moveSpriteLeft(delay);
      }
      if (this.gameScene.keysMaps["ArrowRight"]) {
        this.gameScene.spaceShip.moveSpriteRight(delay);
      }
      if (this.gameScene.keysMaps["ArrowUp"]) {
        this.gameScene.spaceShip.moveSpriteUp(delay);
      }
      if (this.gameScene.keysMaps["ArrowDown"]) {
        this.gameScene.spaceShip.moveSpriteDown(delay);
      }

      if (this.gameScene.isMouseFlag) {
        const currentTime = Date.now();
        if (
          currentTime - this.gameScene.lastBulletSpawnTime >
          this.gameScene.spawnSpeed
        ) {
          this.gameScene.bullets.spawnBullet(this.gameScene.spaceShip);
          this.gameScene.lastBulletSpawnTime = currentTime;
        }
      }

      if (this.gameScene.isDamaged) {
        const currentTime = Date.now();
        const checkIfTimePassed =
          currentTime - this.gameScene.lastCollisionTime >
          this.gameScene.collisionEffectDuration;

        if (checkIfTimePassed) {
          this.gameScene.spaceShip.alpha = 1;
          this.gameScene.isDamaged = true;
          this.gameScene.lastCollisionTime = 0;
        }
      }

      for (
        let index = 0;
        index < this.gameScene.bullets.children.length;
        index += 1
      ) {
        const bullet = this.gameScene.bullets.children[index];
        bullet.position.y -= this.gameScene.bulletSpeed * delay;

        if (bullet.position.y < 0) {
          this.gameScene.bullets.removeChild(bullet);
          continue;
        }

        for (const enemy of this.gameScene.enemies.children) {
          if (enemy.getBounds().intersects(bullet.getBounds())) {
            this.gameScene.enemies.removeChild(enemy);
            this.gameScene.score += 1;
            this.gameScene.stats.updateScore(this.gameScene.score);
          }
          if (this.gameScene.enemies.children.length === 0) {
            this.state = "winScreen";
            this.showWinScreen(this.gameScene.score, this.gameScene.livesCount);
          }
        }
      }

      for (const enemy of this.gameScene.enemies.children) {
        enemy.position.y += this.gameScene.enemySpeed * delay;
        if (enemy.position.y >= this.gameWidth) {
          enemy.position.y = 0 + delay;
        }
        for (
          let index = 0;
          index < this.gameScene.spaceShip.children.length;
          index++
        ) {
          const player = this.gameScene.spaceShip.children[index];

          if (enemy.getBounds().intersects(player.getBounds())) {
            this.gameScene.enemies.removeChild(enemy);
            this.gameScene.livesCount -= 1;
            this.gameScene.score += 1;
            this.gameScene.spaceShip.alpha = 0.5;
            this.gameScene.isDamaged = true;
            this.gameScene.lastCollisionTime = Date.now();
            this.gameScene.stats.updateScore(this.gameScene.score);
            this.gameScene.lives.loseLife();
          }

          if (this.gameScene.enemies.children.length === 0) {
            this.state = "winScreen";
            this.showWinScreen(this.gameScene.score, this.gameScene.livesCount);
          }
        }
      }
      if (this.gameScene.livesCount === 0) {
        this.state = "gameOver";
        this.showLoseScreen(this.gameScene.score);
      }
    };
  }

  showWinScreen(score: number, livesCount: number): void {
    const winField = new WinField(
      this.gameWidth,
      this.gameHeight,
      this.style,
      score,
      livesCount
    );

    this.stage.addChild(winField);
  }

  showLoseScreen(score: number): void {
    const lostField = new LoseField(
      this.gameWidth,
      this.gameHeight,
      this.style,
      score
    );
    this.stage.addChild(lostField);

    const restartField = new RestartField(
      this.gameWidth,
      this.gameHeight,
      this.style
    );
    this.stage.addChild(restartField);
    restartField.on("click", () => {
      this.state = "mainMenu";
      for (const child of this.stage.children.slice()) {
        this.stage.removeChild(child);
      }

      this.setup();
    });
  }
}
