import { Container } from "pixi.js";
import Background from "./Background";
import Bullets from "./Bullets";
import Enemies from "./Enemies";
import GameScore from "./GameScore";
import Lives from "./Lives";
import SpaceShip from "./SpaceShip";

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
  constructor(
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

    this.background = new Background("../resources/bcg.png");
    this.spaceShip = new SpaceShip(
      this.gameWidth,
      this.gameHeight,
      this.speed,
      "../resources/player.png"
    );
    this.bullets = new Bullets("../resources/bullet.png");
    this.enemies = new Enemies(
      this.enemyCount,
      this.gameWidth,
      "../resources/enemy.png"
    );
    this.stats = new GameScore(this.score);
    this.lives = new Lives(
      this.livesCount,
      this.gameWidth,
      "../resources/heart.png"
    );
  }

  setup() {
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
    return (delay: number) => {
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
            // this.state = "winScreen";
            // this.showWinScreen(this.score, this.livesCount);
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
            // this.state = "winScreen";
            // this.showWinScreen(score, livesCount);
          }
        }
      }
      if (this.livesCount === 0) {
        // this.state = "gameOver";
        // this.showLoseScreen(this.score);
      }
    };
  }

  // showWinScreen(score: number, livesCount: number) {

  // }
}
