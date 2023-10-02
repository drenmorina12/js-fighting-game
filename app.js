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
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.height = SPRITE_HEIGHT
    }
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, SPRITE_WIDTH, SPRITE_HEIGHT)
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
    }
})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}

let lastKey

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    // To clear rect
    c.fillRect(0, 0, WIDTH, HEIGHT)
    player.update()
    enemy.update()

    player.velocity.x = 0

    if (keys.a.pressed && lastKey === 'a'){
        player.velocity.x = -1
    } else if (keys.d.pressed && lastKey === 'd'){
        player.velocity.x = 1
    }
}

animate()

window.addEventListener('keydown', (event) => {
    console.log(event.key)
    switch(event.key) {
        case 'd':
            keys.d.pressed = true
            lastKey = event.key
            break
        case 'a':
            keys.a.pressed = true
            lastKey = event.key
            break
        case 'ArrowRight':
            enemy.velocity.x = 1
            break
        case 'ArrowLeft':
            enemy.velocity.x = -1
            break
    }
})

window.addEventListener('keyup', (event) => {
    console.log(event.key)
    switch(event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'ArrowRight':
            enemy.velocity.x = 0
            break
        case 'ArrowLeft':
            enemy.velocity.x = 0
            break
    }
})