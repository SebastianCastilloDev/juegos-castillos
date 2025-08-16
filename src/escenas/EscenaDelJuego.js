import Phaser from 'phaser';
import { CreadorDeSprites } from '../sprites/CreadorDeSprites.js';
import { Pato } from '../objetos/Pato.js';
import { ManejadorDeVehiculos } from '../managers/ManejadorDeVehiculos.js';
import { ManejadorDeHelicopteros } from '../managers/ManejadorDeHelicopteros.js';
import { ManejadorDeControlesMobiles } from '../managers/ManejadorDeControlesMobiles.js';
import { ConfiguracionDelJuego } from '../config/ConfiguracionDelJuego.js';

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
        CreadorDeSprites.crearHelicoptero(this);
        CreadorDeSprites.crearBala(this);
    }

    create() {
        // Crear el fondo y la carretera
        this.crearFondo();

        // Crear el pato del jugador
        this.miPato = new Pato(
            this,
            ConfiguracionDelJuego.pato.posicionInicialX,
            ConfiguracionDelJuego.pato.posicionInicialY
        );

        // Crear el manejador de vehículos
        this.manejadorDeVehiculos = new ManejadorDeVehiculos(this);

        // Crear el manejador de helicópteros
        this.manejadorDeHelicopteros = new ManejadorDeHelicopteros(this);

        // Configurar controles
        this.configurarControles();

        // Configurar controles móviles
        this.controlesMobiles = new ManejadorDeControlesMobiles(this);

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
        const config = ConfiguracionDelJuego;

        // Mostrar los puntos en pantalla
        this.textoDeLosPuntos = this.add.text(
            config.puntuacion.posicionTextoPuntosX,
            config.puntuacion.posicionTextoPuntosY,
            config.textos.mensajes.puntos + '0',
            {
                fontSize: config.textos.tamañoPuntos,
                fill: config.textos.colorPuntos
            }
        );

        // Mostrar las instrucciones apropiadas según el dispositivo
        const esMobile = this.controlesMobiles.esDispositivoMovil();
        const mensajeInstrucciones = esMobile ?
            config.textos.mensajes.instruccionesMobile :
            config.textos.mensajes.instrucciones;

        this.add.text(
            config.pantalla.ancho / 2,
            50,
            mensajeInstrucciones,
            {
                fontSize: config.textos.tamañoInstrucciones,
                fill: config.textos.colorInstrucciones,
                align: 'center'
            }
        ).setOrigin(0.5);
    }

    update() {
        if (this.juegoTerminado) return;

        // Mover el pato (incluyendo controles móviles)
        this.miPato.mover(this.flechasDelTeclado, this.teclasWASD, this.controlesMobiles);

        // Actualizar vehículos y obtener puntos
        const puntosGanados = this.manejadorDeVehiculos.actualizarTodos();
        if (puntosGanados > 0) {
            this.misPuntos += puntosGanados;
            this.textoDeLosPuntos.setText(ConfiguracionDelJuego.textos.mensajes.puntos + this.misPuntos);
        }

        // Actualizar helicópteros
        this.manejadorDeHelicopteros.actualizarTodos();

        // Verificar colisiones con vehículos
        if (this.manejadorDeVehiculos.verificarColisionCon(this.miPato)) {
            this.terminarElJuego();
        }

        // Verificar colisiones con helicópteros y balas
        if (this.manejadorDeHelicopteros.verificarColisionConPato(this.miPato)) {
            this.terminarElJuego();
        }
    }

    terminarElJuego() {
        const config = ConfiguracionDelJuego;

        this.juegoTerminado = true;
        this.manejadorDeVehiculos.detenerCreacion();
        this.manejadorDeHelicopteros.detenerCreacion();

        // Hacer que el pato se vea rojo
        this.miPato.ponerColorRojo();

        // Mostrar mensaje de juego terminado
        this.add.text(
            config.pantalla.ancho / 2,
            config.pantalla.alto / 2,
            config.textos.mensajes.gameOver,
            {
                fontSize: config.textos.tamañoGameOver,
                fill: config.textos.colorGameOver,
                align: 'center'
            }
        ).setOrigin(0.5);

        // Mostrar mensaje de reinicio apropiado según el dispositivo
        const esMobile = this.controlesMobiles.esDispositivoMovil();
        const mensajeReinicio = esMobile ?
            config.textos.mensajes.reiniciarMobile :
            config.textos.mensajes.reiniciar;

        this.add.text(
            config.pantalla.ancho / 2,
            config.pantalla.alto / 2 + 50,
            mensajeReinicio,
            {
                fontSize: config.textos.tamañoReinicio,
                fill: config.textos.colorReinicio,
                align: 'center'
            }
        ).setOrigin(0.5);

        // Mostrar botón de reinicio móvil si es necesario
        if (esMobile) {
            this.controlesMobiles.mostrarBotonReinicio();
        }

        // Permitir reiniciar con la tecla configurada (solo en desktop)
        if (!esMobile) {
            this.input.keyboard.once('keydown-' + config.controles.teclaDeReinicio, () => {
                this.scene.restart();
            });
        }
    }
}