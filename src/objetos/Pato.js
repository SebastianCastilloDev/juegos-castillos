import { ConfiguracionDelJuego } from '../config/ConfiguracionDelJuego.js';

export class Pato {
    constructor(escena, x, y) {
        this.escena = escena;
        this.sprite = escena.add.sprite(x, y, 'pato');
        this.sprite.setScale(ConfiguracionDelJuego.pato.escala);
        this.velocidad = ConfiguracionDelJuego.pato.velocidad;
    }

    mover(flechas, wasd, controlesMobiles = null) {
        const deltaTime = this.escena.game.loop.delta / 1000;
        const velocidadMovimiento = this.velocidad * deltaTime;

        // Obtener estado de controles móviles si están disponibles
        const estadoMobile = controlesMobiles ? controlesMobiles.obtenerEstadoDeControles() : null;

        // Mover hacia la izquierda
        if (flechas.left.isDown || wasd.A.isDown || (estadoMobile && estadoMobile.izquierda)) {
            this.sprite.x -= velocidadMovimiento;
        }
        // Mover hacia la derecha
        if (flechas.right.isDown || wasd.D.isDown || (estadoMobile && estadoMobile.derecha)) {
            this.sprite.x += velocidadMovimiento;
        }
        // Mover hacia arriba
        if (flechas.up.isDown || wasd.W.isDown || (estadoMobile && estadoMobile.arriba)) {
            this.sprite.y -= velocidadMovimiento;
        }
        // Mover hacia abajo
        if (flechas.down.isDown || wasd.S.isDown || (estadoMobile && estadoMobile.abajo)) {
            this.sprite.y += velocidadMovimiento;
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