import Phaser from 'phaser';
import { EscenaDelJuego } from './escenas/EscenaDelJuego.js';

// Configuración del juego
const configuracionDelJuego = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'juego-contenedor',
    backgroundColor: '#2c3e50',
    scene: EscenaDelJuego,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

// Empezar el juego
const miJuego = new Phaser.Game(configuracionDelJuego);

export default miJuego;