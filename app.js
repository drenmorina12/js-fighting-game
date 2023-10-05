const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const WIDTH = 1024
const HEIGHT = 576
const SPRITE_HEIGHT = 150
const SPRITE_WIDTH = 50
const GRAVITY = 0.2

canvas.width = WIDTH
canvas.height = HEIGHT

c.fillRect(0, 0, WIDTH, HEIGHT)

class Sprite {
    constructor({ position, velocity, color='red'}) {
        this.position = position
        this.velocity = velocity
        this.width = SPRITE_WIDTH
        this.height = SPRITE_HEIGHT
        this.lastKey
        this.attackBox = {
            position: this.position,
            width: 100,
            height: 50
        }
        this.color = color
    }
    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height    )

        // Attack box
        c.fillStyle = 'green'
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }

    update() {  
        this.draw()
        // To accelerate objects until they hit ground
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= HEIGHT){
            this.velocity.y = 0
        } else {
            this.velocity.y += GRAVITY
        }
    }
}

const player = new Sprite({
    position: {  
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})


const enemy = new Sprite({
    position: {
        x: 500,
        y: 200
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue'
})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    // To clear rect
    c.fillRect(0, 0, WIDTH, HEIGHT)
    player.update()
    enemy.update()



    // Player
    player.velocity.x = 0

    if (keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -3
    } else if (keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 3
    }

    // Enemy
    enemy.velocity.x = 0

    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -3
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x = 3
    }

    // Detect for collision 
    if (player.attackBox.position.x + player.attackBox.width >= enemy.position.x && 
        player.attackBox.position.x <= enemy.position.x + enemy.width &&
        player.attackBox.position.y + player.attackBox.height >= enemy.attackBox.position.y &&
        player.attackBox.position.y <= enemy.attackBox.position.y + enemy.attackBox.height){
        console.log("DAMAGE")
    }
}

animate()

window.addEventListener('keydown', (event) => {
    console.log(event.key)
    switch(event.key) {
        // Player
        case 'd':
            keys.d.pressed = true
            player.lastKey = event.key
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = event.key
            break
        case 'w':
            player.velocity.y = -10
            break

        // Enemy
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = event.key
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = event.key
            break
        case 'ArrowUp':
            enemy.velocity.y = -10    
            break       
    }
})

window.addEventListener('keyup', (event) => {
    console.log(event.key)
    switch(event.key) {
        // Player
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break

        // Enemy
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
})