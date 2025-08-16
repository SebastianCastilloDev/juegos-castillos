import { ConfiguracionDelJuego } from '../config/ConfiguracionDelJuego.js';

export class Bala {
    constructor(escena, x, y) {
        this.escena = escena;
        this.sprite = escena.add.sprite(x, y, 'bala');
        this.velocidad = ConfiguracionDelJuego.helicoptero.velocidadDeBalas;

        // Hacer que la bala brille un poco
        escena.tweens.add({
            targets: this.sprite,
            alpha: 0.7,
            duration: 200,
            yoyo: true,
            repeat: -1
        });
    }

    mover() {
        // Mover la bala hacia abajo
        this.sprite.y += this.velocidad;
    }

    esteFueraDePantalla() {
        return this.sprite.y > ConfiguracionDelJuego.pantalla.alto + 50;
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

    obtenerPosicionY() {
        return this.sprite.y;
    }
}