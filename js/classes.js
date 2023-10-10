class Sprite {
    constructor({ position}) {
        this.position = position
        this.width = SPRITE_WIDTH
        this.height = SPRITE_HEIGHT

    }
    draw() {}

    update() {  
        this.draw()
    }
}


class Fighter {
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