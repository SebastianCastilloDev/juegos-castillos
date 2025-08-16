export class Vehiculo {
    constructor(escena, x, y, tipo) {
        this.escena = escena;
        this.sprite = escena.add.sprite(x, y, tipo);
        this.velocidad = Phaser.Math.Between(30, 80);
        this.tipo = tipo;
    }

    mover() {
        this.sprite.x -= this.velocidad;
    }

    esteFueraDePantalla() {
        return this.sprite.x < -100;
    }

    destruir() {
        this.sprite.destroy();
    }

    obtenerLimites() {
        return this.sprite.getBounds();
    }

    obtenerPosicionX() {
        return this.sprite.x;
    }
}