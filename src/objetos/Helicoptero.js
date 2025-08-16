import { ConfiguracionDelJuego } from '../config/ConfiguracionDelJuego.js';

export class Helicoptero {
    constructor(escena, x, y) {
        this.escena = escena;
        this.sprite = escena.add.sprite(x, y, 'helicoptero');
        this.velocidad = ConfiguracionDelJuego.helicoptero.velocidad;
        this.balas = [];

        // Temporizador para disparar
        this.temporizadorDeDisparos = escena.time.addEvent({
            delay: ConfiguracionDelJuego.helicoptero.tiempoEntreDisparos,
            callback: this.disparar,
            callbackScope: this,
            loop: true
        });
    }

    mover() {
        this.sprite.x += this.velocidad;
    }

    disparar() {
        // Solo disparar si el helicóptero está en pantalla
        if (this.sprite.x > 0 && this.sprite.x < ConfiguracionDelJuego.pantalla.ancho) {
            const nuevaBala = new Bala(
                this.escena,
                this.sprite.x,
                this.sprite.y + 20  // Disparar desde abajo del helicóptero
            );
            this.balas.push(nuevaBala);
        }
    }

    actualizarBalas() {
        // Mover todas las balas y eliminar las que salen de pantalla
        for (let i = this.balas.length - 1; i >= 0; i--) {
            const bala = this.balas[i];
            bala.mover();

            if (bala.esteFueraDePantalla()) {
                bala.destruir();
                this.balas.splice(i, 1);
            }
        }
    }

    verificarColisionConPato(pato) {
        // Verificar si alguna bala tocó al pato
        for (const bala of this.balas) {
            if (Phaser.Geom.Intersects.RectangleToRectangle(
                pato.obtenerLimites(),
                bala.obtenerLimites()
            )) {
                return true;
            }
        }
        return false;
    }

    esteFueraDePantalla() {
        return this.sprite.x > ConfiguracionDelJuego.helicoptero.limiteFueraDePantalla;
    }

    destruir() {
        // Destruir el temporizador de disparos
        if (this.temporizadorDeDisparos) {
            this.temporizadorDeDisparos.destroy();
        }

        // Destruir todas las balas
        for (const bala of this.balas) {
            bala.destruir();
        }

        // Destruir el sprite del helicóptero
        this.sprite.destroy();
    }

    obtenerLimites() {
        return this.sprite.getBounds();
    }
}

// Clase para las balas del helicóptero
export class Bala {
    constructor(escena, x, y) {
        this.escena = escena;
        this.sprite = escena.add.sprite(x, y, 'bala');
        this.velocidad = ConfiguracionDelJuego.helicoptero.velocidadDeBalas;
    }

    mover() {
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
}