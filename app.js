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


function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    // To clear rect
    c.fillRect(0, 0, WIDTH, HEIGHT)
    player.update()
    enemy.update()
}

animate()

window.addEventListener('keydown', (event) => {
    console.log(event.key)
    switch(event.key) {
        case 'd':
            player.velocity.x = 1
            break
        case 'a':
            player.velocity.x = -1
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
            player.velocity.x = 0
            break
        case 'a':
            player.velocity.x = 0
            break
        case 'ArrowRight':
            enemy.velocity.x = 0
            break
        case 'ArrowLeft':
            enemy.velocity.x = 0
            break
    }
})