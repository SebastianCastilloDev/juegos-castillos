import { Helicoptero } from '../objetos/Helicoptero.js';
import { ConfiguracionDelJuego } from '../config/ConfiguracionDelJuego.js';

export class ManejadorDeHelicopteros {
    constructor(escena) {
        this.escena = escena;
        this.helicopteros = [];

        // Crear temporizador para hacer aparecer helicópteros
        this.temporizador = escena.time.addEvent({
            delay: ConfiguracionDelJuego.helicoptero.tiempoEntreHelicopteros,
            callback: this.intentarCrearHelicoptero,
            callbackScope: this,
            loop: true
        });
    }

    intentarCrearHelicoptero() {
        // Solo crear helicóptero si la probabilidad lo permite
        if (Math.random() < ConfiguracionDelJuego.helicoptero.probabilidadDeAparicion) {
            this.crearHelicoptero();
        }
    }

    crearHelicoptero() {
        const nuevoHelicoptero = new Helicoptero(
            this.escena,
            ConfiguracionDelJuego.helicoptero.posicionDeAparicion,
            ConfiguracionDelJuego.helicoptero.alturaDeVuelo
        );
        this.helicopteros.push(nuevoHelicoptero);
    }

    actualizarTodos() {
        // Mover todos los helicópteros y actualizar sus balas
        for (let i = this.helicopteros.length - 1; i >= 0; i--) {
            const helicoptero = this.helicopteros[i];
            helicoptero.mover();
            helicoptero.actualizarBalas();

            // Eliminar helicópteros que salen de pantalla
            if (helicoptero.esteFueraDePantalla()) {
                helicoptero.destruir();
                this.helicopteros.splice(i, 1);
            }
        }
    }

    verificarColisionConPato(pato) {
        // Verificar si algún helicóptero o sus balas tocaron al pato
        for (const helicoptero of this.helicopteros) {
            // Verificar colisión con las balas
            if (helicoptero.verificarColisionConPato(pato)) {
                return true;
            }

            // Verificar colisión directa con el helicóptero
            if (Phaser.Geom.Intersects.RectangleToRectangle(
                pato.obtenerLimites(),
                helicoptero.obtenerLimites()
            )) {
                return true;
            }
        }
        return false;
    }

    detenerCreacion() {
        if (this.temporizador) {
            this.temporizador.destroy();
        }

        // Destruir todos los helicópteros
        for (const helicoptero of this.helicopteros) {
            helicoptero.destruir();
        }
        this.helicopteros = [];
    }
}