import { ConfiguracionDelJuego } from '../config/ConfiguracionDelJuego.js';

export class Vehiculo {
    constructor(escena, x, y, tipo) {
        this.escena = escena;
        this.sprite = escena.add.sprite(x, y, tipo);
        this.velocidad = Phaser.Math.Between(
            ConfiguracionDelJuego.vehiculos.velocidadMinima,
            ConfiguracionDelJuego.vehiculos.velocidadMaxima
        );
        this.tipo = tipo;
    }

    mover() {
        this.sprite.x -= this.velocidad;
    }

    esteFueraDePantalla() {
        return this.sprite.x < ConfiguracionDelJuego.vehiculos.limiteFueraDePantalla;
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