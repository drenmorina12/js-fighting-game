const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const WIDTH = 1024
const HEIGHT = 576

canvas.width = WIDTH
canvas.height = HEIGHT

c.fillRect(0, 0, WIDTH, HEIGHT)

class Sprite {
    constructor(position) {
        this.position = position
    }
}