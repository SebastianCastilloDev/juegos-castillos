import { Vehiculo } from '../objetos/Vehiculo.js';

export class ManejadorDeVehiculos {
    constructor(escena) {
        this.escena = escena;
        this.vehiculos = [];
        this.filasDeVehiculos = [150, 250, 350, 450];

        // Crear temporizador para hacer aparecer vehículos
        this.temporizador = escena.time.addEvent({
            delay: 800, // Cada 0.8 segundos
            callback: this.crearVehiculo,
            callbackScope: this,
            loop: true
        });
    }

    crearVehiculo() {
        const filaElegida = Phaser.Utils.Array.GetRandom(this.filasDeVehiculos);
        const esUnCamion = Math.random() < 0.3; // 30% de probabilidad de camión
        const tipoDeVehiculo = esUnCamion ? 'camion' : 'auto';

        const nuevoVehiculo = new Vehiculo(this.escena, 850, filaElegida, tipoDeVehiculo);
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
                return 10; // Puntos por esquivar un vehículo
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