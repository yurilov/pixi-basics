import { Application, Container } from "pixi.js";

import Background from "./ts/Background";
import GameScore from "./ts/GameScore";
import Lives from "./ts/Lives";
import Enemies from "./ts/Enemies";
import StartGameField from "./ts/StartGameField";
import SpaceShip from "./ts/SpaceShip";
import Bullets from "./ts/Bullets";
import WinField from "./ts/WinField";
import LoseField from "./ts/LoseField";
import RestartField from "./ts/RestartField";
import NextLevelField from "./ts/NextLevelField";
import Style from "./ts/Style";

// const { Application, Container } = PIXI;

const canvas = document.querySelector("canvas");
const gameWidth = 1000;
const gameHeight = 600;
const style = new Style(gameWidth);

const app = new Application({
  view: canvas,
  width: gameWidth,
  height: gameHeight,
  backgroundColor: 138298,
});

const gameScene = new Container();

let state = "mainMenu";
let score = 0;
let livesCount = 3;
let level = 0;

function createGameScene(gameScene) {
  const enemyCount = 15;
  let isMouseFlag = false;
  let lastBulletSpawnTime = 0;
  let enemySpeed = 2;
  const spawnSpeed = 250;
  const keysMaps = {};
  const speed = 10;
  const bulletSpeed = 15;
  const collisionEffectDuration = 1000;
  let lastCollisionTime = 0;
  let isDamaged = false;

  const background = new Background("./resources/bcg.png");
  gameScene.addChild(background);

  const spaceShip = new SpaceShip(
    gameWidth,
    gameHeight,
    speed,
    "./resources/player.png"
  );
  gameScene.addChild(spaceShip);

  const bullets = new Bullets("./resources/bullet.png");
  gameScene.addChild(bullets);

  const enemies = new Enemies(
    enemyCount,
    gameWidth,
    gameHeight,
    "./resources/enemy.png"
  );
  gameScene.addChild(enemies);

  const stats = new GameScore(score);
  gameScene.addChild(stats);

  const lives = new Lives(
    livesCount,
    gameWidth,
    gameHeight,
    "./resources/heart.png"
  );
  gameScene.addChild(lives);

  document.onkeydown = (event) => {
    keysMaps[event.code] = true;
  };

  document.onkeyup = (event) => {
    keysMaps[event.code] = false;
  };

  document.onmousedown = (event) => {
    isMouseFlag = true;
  };

  document.onmouseup = (event) => {
    isMouseFlag = false;
  };

  return (delay) => {
    if (keysMaps["ArrowLeft"]) {
      spaceShip.moveSpriteLeft(delay);
    }
    if (keysMaps["ArrowRight"]) {
      spaceShip.moveSpriteRight(delay);
    }
    if (keysMaps["ArrowUp"]) {
      spaceShip.moveSpriteUp(delay);
    }
    if (keysMaps["ArrowDown"]) {
      spaceShip.moveSpriteDown(delay);
    }

    if (level !== 0) {
      // const enemies = new Enemies(enemyCount, gameWidth, gameHeight);
      // gameScene.addChild(enemies);
      enemySpeed += level;
    }

    if (isMouseFlag) {
      const currentTime = Date.now();

      if (currentTime - lastBulletSpawnTime > spawnSpeed) {
        bullets.spawnBullet(spaceShip);

        lastBulletSpawnTime = currentTime;
      }
    }

    if (isDamaged) {
      const currentTime = Date.now();

      const checkIfTimePassed =
        currentTime - lastCollisionTime > collisionEffectDuration;

      if (checkIfTimePassed) {
        spaceShip.alpha = 1;
        isDamaged = false;
        lastCollisionTime = 0;
      }
    }

    for (let index = 0; index < bullets.children.length; index++) {
      const bullet = bullets.children[index];
      bullet.position.y -= bulletSpeed * delay;

      if (bullet.position.y < 0) {
        bullets.removeChild(bullet);
        continue;
      }

      for (const enemy of enemies.children) {
        if (enemy.getBounds().intersects(bullet.getBounds())) {
          enemies.removeChild(enemy);
          score += 1;
          stats.updateScore(score);
        }
        if (enemies.children.length === 0) {
          state = "winScreen";
          showWinScreen(score, livesCount);
        }
      }
    }

    for (const enemy of enemies.children) {
      enemy.position.y += enemySpeed * delay;
      if (enemy.position.y >= app.screen.height) {
        enemy.position.y = 0 + delay;
      }
      for (let index = 0; index < spaceShip.children.length; index++) {
        const player = spaceShip.children[index];

        if (enemy.getBounds().intersects(player.getBounds())) {
          enemies.removeChild(enemy);
          livesCount -= 1;
          score += 1;
          spaceShip.alpha = 0.5;
          isDamaged = true;
          lastCollisionTime = Date.now();
          stats.updateScore(score);
          lives.loseLife();
        }

        if (enemies.children.length === 0) {
          state = "winScreen";
          showWinScreen(score, livesCount);
        }
      }
    }
    if (livesCount === 0) {
      state = "gameOver";
      showLoseScreen(score);
    }
  };
}

const updateScene = createGameScene(gameScene);

const mainScene = new Container();

const startGameField = new StartGameField(gameWidth, gameHeight, style);

mainScene.addChild(startGameField);

startGameField.on("click", () => {
  state = "game";
  app.stage.removeChild(mainScene);
  app.stage.addChild(gameScene);
});

app.stage.addChild(mainScene);

app.ticker.add((delay) => {
  if (state === "game") {
    updateScene(delay);
  }

  if (state === "mainMenu") {
    app.stage.removeChild(gameScene);
    app.stage.addChild(mainScene);
  }

  if (state === "winScreen") {
    app.stage.removeChild(gameScene);
  }

  if (state === "gameOver") {
    app.stage.removeChild(gameScene);
  }
});

function showWinScreen(score, livesCount) {
  const winField = new WinField(
    gameWidth,
    gameHeight,
    style,
    score,
    livesCount
  );
  app.stage.addChild(winField);

  const nextLevelField = new NextLevelField(gameWidth, gameHeight, style);
  app.stage.addChild(nextLevelField);
  nextLevelField.on("click", () => {
    state = "game";
    level += 1;
    app.stage.removeChild(winField);
    app.stage.addChild(gameScene);
  });
}

function showLoseScreen(score) {
  const lostField = new LoseField(gameWidth, gameHeight, style, score);
  app.stage.addChild(lostField);

  const restartField = new RestartField(gameWidth, gameHeight, style);
  app.stage.addChild(restartField);
  restartField.on("click", () => {
    state = "game";
    app.stage.removeChild(mainScene);
    app.stage.addChild(gameScene);
  });
}
