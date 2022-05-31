import { Container } from "pixi.js";
import Background from "./background/Background";
import Bullets from "./bullets/Bullets";
import Enemies from "./enemies/Enemies";
import GameScore from "./gameScore/GameScore";
import Lives from "./lives/Lives";
import SpaceShip from "./spaceShip/SpaceShip";
import WinField from "./winField/WinField";
import RestartField from "./restartField/RestartField";
import LoseField from "./loseField/LoseField";
import SceneManager from "../sceneManager/SceneManager";
import Style from "./titleStyle/Style";

export default class GameScene extends Container {
  gameWidth: number;
  gameHeight: number;
  enemyCount: number;
  isMouseFlag: boolean;
  lastBulletSpawnTime: number;
  enemySpeed: number;
  spawnSpeed: number;
  keysMaps: any;
  speed: number;
  bulletSpeed: number;
  collisionEffectDuration: number;
  lastCollisionTime: number;
  isDamaged: boolean;
  background: Background;
  enemies: Enemies;
  stats: GameScore;
  lives: Lives;
  score: number;
  livesCount: number;
  spaceShip: SpaceShip;
  bullets: Bullets;
  state: string;
  style: Style;
  protected _manager: SceneManager;

  constructor(
    manager: SceneManager,
    gameWidth: number,
    gameHeight: number,
    enemyCount: number,
    enemySpeed: number,
    spawnSpeed: number,
    speed: number,
    livesCount: number
  ) {
    super();

    this.gameWidth = gameWidth;
    this.style = new Style(this.gameWidth);
    this.gameHeight = gameHeight;
    this.enemyCount = enemyCount;
    this.isMouseFlag = false;
    this.lastBulletSpawnTime = 0;
    this.enemySpeed = enemySpeed;
    this.spawnSpeed = spawnSpeed;
    this.keysMaps = {};
    this.speed = speed;
    this.bulletSpeed = 15;
    this.collisionEffectDuration = 1000;
    this.lastCollisionTime = 0;
    this.isDamaged = false;
    this.score = 0;
    this.livesCount = livesCount;
    this.background = new Background();
    this.spaceShip = new SpaceShip(this.gameWidth, this.gameHeight, this.speed);
    this.bullets = new Bullets();
    this.enemies = new Enemies(this.enemyCount, this.gameHeight);
    this.stats = new GameScore(this.score);
    this.lives = new Lives(this.livesCount, this.gameWidth);
    this.state = "game";
    this._manager = manager;
    this.start();
  }

  public update(delay: number): void {
    if (this.keysMaps["ArrowLeft"]) {
      this.spaceShip.moveSpriteLeft(delay);
    }
    if (this.keysMaps["ArrowRight"]) {
      this.spaceShip.moveSpriteRight(delay);
    }
    if (this.keysMaps["ArrowUp"]) {
      this.spaceShip.moveSpriteUp(delay);
    }
    if (this.keysMaps["ArrowDown"]) {
      this.spaceShip.moveSpriteDown(delay);
    }

    if (this.isMouseFlag) {
      const currentTime = Date.now();
      if (currentTime - this.lastBulletSpawnTime > this.spawnSpeed) {
        this.bullets.spawnBullet(this.spaceShip);
        this.lastBulletSpawnTime = currentTime;
      }
    }

    if (this.isDamaged) {
      const currentTime = Date.now();
      const checkIfTimePassed =
        currentTime - this.lastCollisionTime > this.collisionEffectDuration;

      if (checkIfTimePassed) {
        this.spaceShip.alpha = 1;
        this.isDamaged = true;
        this.lastCollisionTime = 0;
      }
    }

    for (let index = 0; index < this.bullets.children.length; index += 1) {
      const bullet = this.bullets.children[index];
      bullet.position.y -= this.bulletSpeed * delay;

      if (bullet.position.y < 0) {
        this.bullets.removeChild(bullet);
        continue;
      }

      for (const enemy of this.enemies.children) {
        if (enemy.getBounds().intersects(bullet.getBounds())) {
          this.enemies.removeChild(enemy);
          this.score += 1;
          this.stats.updateScore(this.score);
        }
        if (this.enemies.children.length === 0) {
          this.state = "winScreen";
          this.showWinScreen(this.score, this.livesCount);
        }
      }
    }

    for (const enemy of this.enemies.children) {
      enemy.position.y += this.enemySpeed * delay;
      if (enemy.position.y >= this.gameWidth) {
        enemy.position.y = 0 + delay;
      }
      for (let index = 0; index < this.spaceShip.children.length; index++) {
        const player = this.spaceShip.children[index];

        if (enemy.getBounds().intersects(player.getBounds())) {
          this.enemies.removeChild(enemy);
          this.livesCount -= 1;
          this.score += 1;
          this.spaceShip.alpha = 0.5;
          this.isDamaged = true;
          this.lastCollisionTime = Date.now();
          this.stats.updateScore(this.score);
          this.lives.loseLife();
        }

        if (this.enemies.children.length === 0) {
          this.state = "winScreen";
          this.showWinScreen(this.score, this.livesCount);
        }
      }
    }
    if (this.livesCount === 0) {
      this.state = "gameOver";
      this.showLoseScreen(this.score);
    }
  }

  start() {
    document.onkeydown = (event) => {
      this.keysMaps[event.code] = true;
    };

    document.onkeyup = (event) => {
      this.keysMaps[event.code] = false;
    };

    document.onmousedown = () => {
      this.isMouseFlag = true;
    };

    document.onmouseup = () => {
      this.isMouseFlag = false;
    };

    this.addChild(this.background);
    this.addChild(this.spaceShip);
    this.addChild(this.bullets);
    this.addChild(this.enemies);
    this.addChild(this.stats);
    this.addChild(this.lives);
  }

  showWinScreen(score: number, livesCount: number): void {
    const winField = new WinField(
      this.gameWidth,
      this.gameHeight,
      this.style,
      score,
      livesCount
    );

    SceneManager.changeScene(winField);
  }

  showLoseScreen(score: number): void {
    const lostField = new LoseField(
      this.gameWidth,
      this.gameHeight,
      this.style,
      score
    );

    const restartField = new RestartField(
      this.gameWidth,
      this.gameHeight,
      this.style
    );
    lostField.addChild(restartField);
    restartField.on("click", () => {
      this.state = "mainMenu";
      for (const child of this.children.slice()) {
        this.removeChild(child);
      }
    });

    SceneManager.changeScene(lostField);
  }

  public stop(): void {
    this._manager = "";
  }
}
