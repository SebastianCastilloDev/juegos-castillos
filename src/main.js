import Phaser from 'phaser';
import { EscenaDelJuego } from './escenas/EscenaDelJuego.js';
import { ConfiguracionDelJuego } from './config/ConfiguracionDelJuego.js';

// Configuración del juego usando el archivo de configuración
const configuracionDelJuego = {
    type: Phaser.AUTO,
    width: ConfiguracionDelJuego.pantalla.ancho,
    height: ConfiguracionDelJuego.pantalla.alto,
    parent: 'juego-contenedor',
    backgroundColor: ConfiguracionDelJuego.pantalla.colorDeFondo,
    scene: EscenaDelJuego,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: ConfiguracionDelJuego.desarrollo.mostrarColisiones
        }
    }
};

// Empezar el juego
const miJuego = new Phaser.Game(configuracionDelJuego);

export default miJuego;