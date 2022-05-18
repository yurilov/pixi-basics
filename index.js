const { Application, Container, Sprite, TextStyle, Text } = PIXI;
const canvas = document.querySelector("canvas");

const app = new Application({
  view: canvas,
  width: 600,
  height: 500,
  backgroundColor: 0x3bf4b,
});

const gameScene = new Container();

let state = "mainMenu";
let score = 0;
function createGameScene(gameScene) {
  const background = new Container();
  gameScene.addChild(background);

  const players = new Container();
  gameScene.addChild(players);

  const bullets = new Container();
  gameScene.addChild(bullets);

  const enemies = new Container();
  gameScene.addChild(enemies);

  const stats = new Container();
  createScore(gameScene, stats);

  const lives = new Container();
  gameScene.addChild(lives);
  const sprite = Sprite.from("resources/player.png");
  sprite.position.x = app.screen.width * 0.5;
  sprite.position.y = app.screen.height * 0.9;
  players.addChild(sprite);

  let isMouseFlag = false;
  let lastBulletSpawnTime = 0;
  let livesCount = 3;
  const spawnSpeed = 250;
  const keysMaps = {};
  const speed = 10;
  const bulletSpeed = 15;

  const enemyCount = 10;

  for (let index = 0; index < livesCount; index++) {
    const heart = Sprite.from("resources/heart.png");
    heart.width = 20;
    heart.height = 20;
    heart.position.x = app.screen.width - 25 - index * 25;
    heart.position.y = 5;

    lives.addChild(heart);
  }

  for (let index = 0; index < enemyCount; index++) {
    const enemy = Sprite.from("resources/enemy.png");
    enemy.position.x = index * 60;
    enemy.position.y = 50;
    enemies.addChild(enemy);
  }

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
      sprite.position.x -= delay * speed;
    }
    if (keysMaps["ArrowRight"]) {
      sprite.position.x += delay * speed;
    }
    if (keysMaps["ArrowUp"]) {
      sprite.position.y -= delay * speed;
    }
    if (keysMaps["ArrowDown"]) {
      sprite.position.y += delay * speed;
    }

    if (isMouseFlag) {
      const currentTime = Date.now();

      if (currentTime - lastBulletSpawnTime > spawnSpeed) {
        const bullet = Sprite.from("resources/bullet.png");
        bullet.position.x = sprite.position.x;
        bullet.position.y = sprite.position.y;
        bullet.scale.x = 0.25;
        bullet.scale.y = 0.25;
        bullets.addChild(bullet);

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
          updateScore(stats);
        }
        if (enemies.children.length === 0) {
          state = "winScreen";
          console.log(state);
        }
      }
    }

    for (const enemy of enemies.children) {
      enemy.position.y += 2 * delay;
      if (enemy.position.y >= app.screen.width) {
        enemy.position.y = 0 + delay;
      }
      for (let index = 0; index < players.children.length; index++) {
        const player = players.children[index];

        if (enemy.getBounds().intersects(player.getBounds())) {
          //   players.removeChild(player);
          // createMainScene(mainScene);
          enemies.removeChild(enemy);
          livesCount -= 1;
          lives.children.pop();
          // state = "mainMenu";
        }
      }
    }
    if (livesCount === 0) {
      state = "gameOver";
    }
  };
}

const updateScene = createGameScene(gameScene);

// function createMainScene(mainScene) {
const mainScene = new Container();

const style = new TextStyle({ fill: "#00000", fontSize: 20 });
const field = new Text("Start Game", style);
field.interactive = true;
field.buttonMode = true;
field.scale.x = 2;
field.position.x = app.screen.width / 2 - 100;
field.position.y = app.screen.height / 2;
mainScene.addChild(field);
field.on("click", () => {
  state = "game";
  app.stage.removeChild(mainScene);
  app.stage.addChild(gameScene);
});

app.stage.addChild(mainScene);

const winField = new Text("You won", style);
winField.scale.x = 2;
winField.position.x = app.screen.width / 2 - winField.width / 2;
winField.position.y = app.screen.height / 2;

const lostField = new Text("You lost", style);
lostField.scale.x = 2;
lostField.position.x = app.screen.width / 2 - winField.width / 2;
lostField.position.y = app.screen.height / 2;
app.ticker.add((delay) => {
  if (state === "game") {
    updateScene(delay);
  }

  if (state === "mainMenu") {
    app.stage.removeChild(gameScene);
    app.stage.addChild(mainScene);
    // createGameScene(mainScene)(delay);
  }

  if (state === "winScreen") {
    app.stage.addChild(winField);
    app.stage.removeChild(gameScene);
  }

  if (state === "gameOver") {
    app.stage.removeChild(gameScene);
    app.stage.addChild(lostField);
  }
});
// }

function createScore(gameScene, stats) {
  gameScene.addChild(stats);
  const scoreStyle = new TextStyle({ fill: "#FFFFFF", fontSize: 14 });

  const scoreText = new Text(`Enemies killed: ${score}`, scoreStyle);
  stats.addChild(scoreText);
}

function updateScore(stats) {
  stats.children[0].text = `Enemies killed: ${score}`;
}

function updateLivesCount() {}
