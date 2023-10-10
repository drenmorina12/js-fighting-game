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
    constructor({ position, velocity, color='red', offset}) {
        this.position = position
        this.velocity = velocity
        this.width = SPRITE_WIDTH
        this.height = SPRITE_HEIGHT
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        }
        this.color = color
        this.isAttacking
        this.health = 100
    }
    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height    )

        // Attack box
        if (this.isAttacking){
            c.fillStyle = 'green'
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }

    update() {  
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y
        // To accelerate objects until they hit ground
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= HEIGHT){
            this.velocity.y = 0
        } else {
            this.velocity.y += GRAVITY
        }
    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
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
    },
    offset: {
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
    color: 'blue',
    offset: {
        x: -50,
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

function rectangularCollision({rectangle1, rectangle2}) {
    return(
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.attackBox.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.attackBox.position.y + rectangle2.attackBox.height
    )
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

    // Detect for collision - Player
    if ( rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    })&&
        player.isAttacking){
        player.isAttacking = false
        enemy.health -= 20
        document.querySelector('#enemy-bar').style.width = enemy.health + '%'
    }

    // Detect for collision - Enemy
    if ( rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    })&&
        enemy.isAttacking){
        enemy.isAttacking = false
        player.health -= 20
        document.querySelector('#player-bar').style.width = player.health + '%'
    }
}

animate()

window.addEventListener('keydown', (event) => {
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
        case ' ':
            player.attack()
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
        case 'ArrowDown':
            enemy.attack()
            break
    }
})

window.addEventListener('keyup', (event) => {
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