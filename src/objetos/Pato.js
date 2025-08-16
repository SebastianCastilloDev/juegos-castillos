import { ConfiguracionDelJuego } from '../config/ConfiguracionDelJuego.js';

export class Pato {
    constructor(escena, x, y) {
        this.escena = escena;
        this.sprite = escena.add.sprite(x, y, 'pato');
        this.sprite.setScale(ConfiguracionDelJuego.pato.escala);
        this.velocidad = ConfiguracionDelJuego.pato.velocidad;
    }

    mover(flechas, wasd) {
        // Mover hacia la izquierda
        if (flechas.left.isDown || wasd.A.isDown) {
            this.sprite.x -= this.velocidad * this.escena.game.loop.delta / 1000;
        }
        // Mover hacia la derecha
        if (flechas.right.isDown || wasd.D.isDown) {
            this.sprite.x += this.velocidad * this.escena.game.loop.delta / 1000;
        }
        // Mover hacia arriba
        if (flechas.up.isDown || wasd.W.isDown) {
            this.sprite.y -= this.velocidad * this.escena.game.loop.delta / 1000;
        }
        // Mover hacia abajo
        if (flechas.down.isDown || wasd.S.isDown) {
            this.sprite.y += this.velocidad * this.escena.game.loop.delta / 1000;
        }

        // No dejar que el pato se salga de la pantalla
        const margen = ConfiguracionDelJuego.pato.margenDePantalla;
        this.sprite.x = Phaser.Math.Clamp(this.sprite.x, margen, ConfiguracionDelJuego.pantalla.ancho - margen);
        this.sprite.y = Phaser.Math.Clamp(this.sprite.y, margen, ConfiguracionDelJuego.pantalla.alto - margen);
    }

    obtenerLimites() {
        return this.sprite.getBounds();
    }

    ponerColorRojo() {
        this.sprite.setTint(ConfiguracionDelJuego.gameOver.colorDelPatoAlPerder);
    }
}