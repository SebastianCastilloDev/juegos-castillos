import Phaser from 'phaser';
import { CreadorDeSprites } from '../sprites/CreadorDeSprites.js';
import { Pato } from '../objetos/Pato.js';
import { ManejadorDeVehiculos } from '../managers/ManejadorDeVehiculos.js';

export class EscenaDelJuego extends Phaser.Scene {
    constructor() {
        super({ key: 'EscenaDelJuego' });
    }

    preload() {
        // Crear todos los sprites del juego
        this.crearTodosLosSprites();
    }

    crearTodosLosSprites() {
        CreadorDeSprites.crearPato(this);
        CreadorDeSprites.crearAuto(this);
        CreadorDeSprites.crearCamion(this);
    }

    create() {
        // Crear el fondo y la carretera
        this.crearFondo();

        // Crear el pato del jugador
        this.miPato = new Pato(this, 400, 550);

        // Crear el manejador de vehículos
        this.manejadorDeVehiculos = new ManejadorDeVehiculos(this);

        // Configurar controles
        this.configurarControles();

        // Variables del juego
        this.misPuntos = 0;
        this.juegoTerminado = false;

        // Crear interfaz de usuario
        this.crearInterfaz();
    }

    crearFondo() {
        // Crear el fondo gris de la carretera
        this.add.rectangle(400, 300, 800, 600, 0x404040);

        // Dibujar las líneas blancas de la carretera
        for (let posicion = 0; posicion < 800; posicion += 60) {
            this.add.rectangle(posicion, 300, 40, 4, 0xFFFFFF);
        }
    }

    configurarControles() {
        this.flechasDelTeclado = this.input.keyboard.createCursorKeys();
        this.teclasWASD = this.input.keyboard.addKeys('W,S,A,D');
    }

    crearInterfaz() {
        // Mostrar los puntos en pantalla
        this.textoDeLosPuntos = this.add.text(16, 16, 'Puntos: 0', {
            fontSize: '24px',
            fill: '#FFFFFF'
        });

        // Mostrar las instrucciones
        this.add.text(400, 50, 'Usa las flechas o WASD para mover el pato', {
            fontSize: '18px',
            fill: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);
    }

    update() {
        if (this.juegoTerminado) return;

        // Mover el pato
        this.miPato.mover(this.flechasDelTeclado, this.teclasWASD);

        // Actualizar vehículos y obtener puntos
        const puntosGanados = this.manejadorDeVehiculos.actualizarTodos();
        if (puntosGanados > 0) {
            this.misPuntos += puntosGanados;
            this.textoDeLosPuntos.setText('Puntos: ' + this.misPuntos);
        }

        // Verificar colisiones
        if (this.manejadorDeVehiculos.verificarColisionCon(this.miPato)) {
            this.terminarElJuego();
        }
    }

    terminarElJuego() {
        this.juegoTerminado = true;
        this.manejadorDeVehiculos.detenerCreacion();

        // Hacer que el pato se vea rojo
        this.miPato.ponerColorRojo();

        // Mostrar mensaje de juego terminado
        this.add.text(400, 300, '¡JUEGO TERMINADO!', {
            fontSize: '48px',
            fill: '#FF0000',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(400, 350, 'Presiona R para jugar otra vez', {
            fontSize: '24px',
            fill: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);

        // Permitir reiniciar con R
        this.input.keyboard.once('keydown-R', () => {
            this.scene.restart();
        });
    }
}