const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const WIDTH = 1024
const HEIGHT = 576
const SPRITE_HEIGHT = 150
const SPRITE_WIDTH = 50

canvas.width = WIDTH
canvas.height = HEIGHT

c.fillRect(0, 0, WIDTH, HEIGHT)

class Sprite {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
    }
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, SPRITE_WIDTH, SPRITE_HEIGHT)
    }
}

const player = new Sprite({
    postion: {  
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})

player.draw()

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

enemy.draw()

function animate() {

    window.requestAnimationFrame(animate)
}

animate()