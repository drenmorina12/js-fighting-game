const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const WIDTH = 1024;
const HEIGHT = 576;
const SPRITE_HEIGHT = 150;
const SPRITE_WIDTH = 50;
const GRAVITY = 0.2;

canvas.width = WIDTH;
canvas.height = HEIGHT;

c.fillRect(0, 0, WIDTH, HEIGHT);

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./images/background.png",
});

const shop = new Sprite({
  position: {
    x: 600,
    y: 128,
  },
  imageSrc: "./images/shop.png",
  scale: 2.75,
  framesMax: 6,
});

const player = new Fighter({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
  imageSrc: "./images/samuraiMack/Idle.png",
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 157,
  },
  sprites: {
    idle: {
      imageSrc: "./images/samuraiMack/Idle.png",
      framesMax: 8,
    },
    run: {
      imageSrc: "./images/samuraiMack/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./images/samuraiMack/Jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./images/samuraiMack/Fall.png",
      framesMax: 2,
    },
    attack1: {
      imageSrc: "./images/samuraiMack/Attack1.png",
      framesMax: 6,
    },
    takeHit: {
      imageSrc: "./images/samuraiMack/Take Hit - white silhouette.png",
      framesMax: 4,
    },
  },
  attackBox: {
    offset: {
      x: 50,
      y: 50,
    },
    width: 200,
    height: 50,
  },
});

const enemy = new Fighter({
  position: {
    x: 500,
    y: 200,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: -50,
    y: 0,
  },
  imageSrc: "./images/kenji/Idle.png",
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 167,
  },
  sprites: {
    idle: {
      imageSrc: "./images/kenji/Idle.png",
      framesMax: 4,
    },
    run: {
      imageSrc: "./images/kenji/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./images/kenji/Jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./images/kenji/Fall.png",
      framesMax: 2,
    },
    attack1: {
      imageSrc: "./images/kenji/Attack1.png",
      framesMax: 4,
    },
    takeHit: {
      imageSrc: "./images/kenji/TakeHit.png",
      framesMax: 3,
    },
  },
  attackBox: {
    offset: {
      x: -165,
      y: 50,
    },
    width: 165,
    height: 50,
  },
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
};

decreaseTimer();

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  // To clear rect
  c.fillRect(0, 0, WIDTH, HEIGHT);

  background.update();
  shop.update();
  player.update();
  enemy.update();

  // Player movement
  player.velocity.x = 0;

  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -3;
    player.switchSprite("run");
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 3;
    player.switchSprite("run");
  } else {
    player.switchSprite("idle");
  }

  if (player.velocity.y < 0) {
    player.switchSprite("jump");
  } else if (player.velocity.y > 0) {
    player.switchSprite("fall");
  }

  // Enemy movement
  enemy.velocity.x = 0;

  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -3;
    enemy.switchSprite("run");
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 3;
    enemy.switchSprite("run");
  } else {
    enemy.switchSprite("idle");
  }

  if (enemy.velocity.y < 0) {
    enemy.switchSprite("jump");
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite("fall");
  }

  // Detect for collision - Player
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy,
    }) &&
    player.isAttacking &&
    player.framesCurrent === 4
  ) {
    enemy.takeHit();
    player.isAttacking = false;

    document.querySelector("#enemy-bar").style.width = enemy.health + "%";
  }

  // If player misses
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false;
  }

  // Detect for collision - Enemy
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player,
    }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 1
  ) {
    player.takeHit();
    enemy.isAttacking = false;

    document.querySelector("#player-bar").style.width = player.health + "%";
  }

  // If enemy misses
  if (enemy.isAttacking && enemy.framesCurrent === 1) {
    enemy.isAttacking = false;
  }

  // Game over
  if (player.health <= 0 || enemy.health <= 0) {
    determineWinner({ player, enemy, timerId });
  }
}

animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    // Player
    case "d":
      keys.d.pressed = true;
      player.lastKey = event.key;
      break;
    case "a":
      keys.a.pressed = true;
      player.lastKey = event.key;
      break;
    case "w":
      player.velocity.y = -10;
      break;
    case " ":
      player.attack();
      break;

    // Enemy
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey = event.key;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = event.key;
      break;
    case "ArrowUp":
      enemy.velocity.y = -10;
      break;
    case "ArrowDown":
      enemy.attack();
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    // Player
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;

    // Enemy
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
});
