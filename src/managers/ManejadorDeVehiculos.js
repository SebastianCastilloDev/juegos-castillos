import { Vehiculo } from '../objetos/Vehiculo.js';
import { ConfiguracionDelJuego } from '../config/ConfiguracionDelJuego.js';

export class ManejadorDeVehiculos {
    constructor(escena) {
        this.escena = escena;
        this.vehiculos = [];
        this.filasDeVehiculos = ConfiguracionDelJuego.vehiculos.filasDeCarretera;

        // Crear temporizador para hacer aparecer vehículos
        this.temporizador = escena.time.addEvent({
            delay: ConfiguracionDelJuego.vehiculos.tiempoEntreVehiculos,
            callback: this.crearVehiculo,
            callbackScope: this,
            loop: true
        });
    }

    crearVehiculo() {
        const filaElegida = Phaser.Utils.Array.GetRandom(this.filasDeVehiculos);
        const esUnCamion = Math.random() < ConfiguracionDelJuego.vehiculos.probabilidadDeCamion;
        const tipoDeVehiculo = esUnCamion ? 'camion' : 'auto';

        const nuevoVehiculo = new Vehiculo(
            this.escena,
            ConfiguracionDelJuego.vehiculos.posicionDeAparicion,
            filaElegida,
            tipoDeVehiculo
        );
        this.vehiculos.push(nuevoVehiculo);
    }

    actualizarTodos() {
        // Mover todos los vehículos y eliminar los que salen de pantalla
        for (let i = this.vehiculos.length - 1; i >= 0; i--) {
            const vehiculo = this.vehiculos[i];
            vehiculo.mover();

            if (vehiculo.esteFueraDePantalla()) {
                vehiculo.destruir();
                this.vehiculos.splice(i, 1);
                return ConfiguracionDelJuego.puntuacion.puntosPorVehiculoEsquivado;
            }
        }
        return 0;
    }

    verificarColisionCon(pato) {
        for (const vehiculo of this.vehiculos) {
            if (Phaser.Geom.Intersects.RectangleToRectangle(
                pato.obtenerLimites(),
                vehiculo.obtenerLimites()
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
    }
}