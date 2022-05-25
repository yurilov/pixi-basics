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
}
