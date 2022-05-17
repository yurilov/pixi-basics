const { Application, Container, Sprite, TextStyle, Text } = PIXI;
const canvas = document.querySelector("canvas");

const app = new Application({
  view: canvas,
  width: 600,
  height: 500,
  backgroundColor: 0xff000,
});

function createGameScene(gameScene) {
  const background = new Container();
  gameScene.addChild(background);

  const players = new Container();
  gameScene.addChild(players);

  const bullets = new Container();
  gameScene.addChild(bullets);

  const enemies = new Container();
  gameScene.addChild(enemies);

  const sprite = Sprite.from("resources/player.png");
  sprite.position.x = 100;
  sprite.position.y = 150;
  players.addChild(sprite);

  let isMouseFlag = false;
  let lastBulletSpawnTime = 0;
  const spawnSpeed = 250;
  const keysMaps = {};
  const speed = 10;
  const bulletSpeed = 15;

  const enemyCount = 10;

  for (let index = 0; index < enemyCount; index++) {
    const enemy = Sprite.from("resources/enemy.png");
    enemy.position.x = index * 50;
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
        }
      }
    }

    for (const enemy of enemies.children) {
      enemy.position.y += 2 * delay;
      for (let index = 0; index < players.children.length; index++) {
        const player = players.children[index];

        if (enemy.getBounds().intersects(player.getBounds())) {
          players.removeChild(player);
          console.log("collision happened");
        }
      }
    }
  };
}

const gameScene = new Container();
const updateScene = createGameScene(gameScene);

let state = "mainMenu";

const mainScene = new Container();

const style = new TextStyle({ fill: "#00000", fontSize: 20 });
const field = new Text("Start Game", style);
field.interactive = true;
field.buttonMode = true;
field.scale.x = 2;
field.position.x = 300;
field.position.y = 300;
mainScene.addChild(field);
field.on("click", () => {
  state = "game";
  app.stage.removeChild(mainScene);
  app.stage.addChild(gameScene);
});

app.stage.addChild(mainScene);

app.ticker.add((delay) => {
  if (state === "game") {
    updateScene(delay);
  }
});

console.log("Hello, World");
