import Background from "./js/Background.js";
import GameScore from "./js/GameScore.js";
import Lives from "./js/Lives.js";
import Enemies from "./js/Enemies.js";
import StartGameField from "./js/StartGameField.js";
import SpaceShip from "./js/SpaceShip.js";
import Bullets from "./js/Bullets.js";

const { Application, Container, Sprite, TextStyle, Text } = PIXI;

const canvas = document.querySelector("canvas");
const gameWidth = 1000;
const gameHeight = 600;

const app = new Application({
  view: canvas,
  width: gameWidth,
  height: gameHeight,
  backgroundColor: 138298,
});

const gameScene = new Container();
const secondLevelScene = new Container();

let state = "mainMenu";
let score = 0;
let livesCount = 3;

function createGameScene(gameScene, enemySpeed = 2) {
  const enemyCount = 15;
  let isMouseFlag = false;
  let lastBulletSpawnTime = 0;
  const spawnSpeed = 250;
  const keysMaps = {};
  const speed = 10;
  const bulletSpeed = 15;

  const background = new Background();
  gameScene.addChild(background);

  const spaceShip = new SpaceShip(gameWidth, gameHeight, speed);
  gameScene.addChild(spaceShip);

  const bullets = new Bullets();
  gameScene.addChild(bullets);

  const enemies = new Enemies(enemyCount, gameWidth, gameHeight);
  gameScene.addChild(enemies);

  const stats = new GameScore(score);
  gameScene.addChild(stats);

  const lives = new Lives(livesCount, gameWidth, gameHeight);
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

    if (isMouseFlag) {
      const currentTime = Date.now();

      if (currentTime - lastBulletSpawnTime > spawnSpeed) {
        bullets.spawnBullet(spaceShip);

        lastBulletSpawnTime = currentTime;
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
          showWinScreen();
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
          stats.updateScore(score);
          lives.loseLife();
        }

        if (enemies.children.length === 0) {
          state = "winScreen";
          showWinScreen();
        }
      }
    }
    if (livesCount === 0) {
      state = "gameOver";
      showLoseScreen();
    }
  };
}

const updateScene = createGameScene(gameScene);
// const updateSecondLevelScene = createGameScene(secondLevelScene);

const mainScene = new Container();

const style = new TextStyle({
  fontFamily: "Arial",
  fill: "#FFF",
  fontSize: 36,
  wordWrap: true,
  wordWrapWidth: app.screen.width / 2 - 100,
});

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

  // if (state === "secondLevel") {
  //   createGameScene(secondLevelScene, 3)(delay);
  // }

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

function showWinScreen() {
  const winField = new Text(
    `You won. Final score is: ${score}. Lives left: ${livesCount}`,
    style
  );
  winField.position.x = app.screen.width / 2 - winField.width / 2;
  winField.position.y = app.screen.height / 2 - winField.height / 2;
  app.stage.addChild(winField);

  const nextLevel = new Text("Next level", style);
  nextLevel.interactive = true;
  nextLevel.buttonMode = true;
  nextLevel.position.x = app.screen.width - nextLevel.width;
  nextLevel.position.y = app.screen.height - nextLevel.height;
  app.stage.addChild(nextLevel);
  nextLevel.on("click", () => {
    state = "secondLevel";
    app.stage.removeChild(winField);
    app.stage.addChild(secondLevelScene);
  });
}

function showLoseScreen() {
  const lostField = new Text(`You lost. Final score is: ${score}`, style);
  lostField.position.x = app.screen.width / 2 - lostField.width / 2;
  lostField.position.y = app.screen.height / 2;
  app.stage.addChild(lostField);

  // const restartField = new Text("Restart Game", style);
  // restartField.interactive = true;
  // restartField.buttonMode = true;
  // restartField.position.x = app.screen.width - restartField.width;
  // restartField.position.y = app.screen.height - restartField.height;

  // restartField.on("click", () => {
  //   state = "game";
  //   app.stage.removeChild(mainScene);
  //   app.stage.addChild(gameScene);
  // });

  // app.stage.addChild(restartField);
}
