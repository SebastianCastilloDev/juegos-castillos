// 🎮 CONFIGURACIÓN PRINCIPAL DEL JUEGO
// Desde aquí puedes controlar todo el comportamiento del juego

export const ConfiguracionDelJuego = {

    // 📺 CONFIGURACIÓN DE LA PANTALLA
    pantalla: {
        ancho: 800,
        alto: 600,
        colorDeFondo: '#2c3e50'
    },

    // 🦆 CONFIGURACIÓN DEL PATO
    pato: {
        velocidad: 400,              // Qué tan rápido se mueve el pato
        posicionInicialX: 400,       // Donde aparece el pato (horizontal)
        posicionInicialY: 550,       // Donde aparece el pato (vertical)
        escala: 1.2,                 // Qué tan grande se ve el pato
        margenDePantalla: 16         // Distancia mínima del borde
    },

    // 🚗 CONFIGURACIÓN DE VEHÍCULOS
    vehiculos: {
        // Frecuencia de aparición
        tiempoEntreVehiculos: 250,   // Milisegundos entre cada vehículo (menos = más vehículos)

        // Velocidades
        velocidadMinima: 10,         // Velocidad más lenta de vehículos
        velocidadMaxima: 20,         // Velocidad más rápida de vehículos

        // Probabilidades
        probabilidadDeCamion: 0.3,   // 30% camiones, 70% autos (0.0 = solo autos, 1.0 = solo camiones)

        // Posiciones donde aparecen los vehículos (filas de la carretera)
        filasDeCarretera: [150, 250, 350, 450],

        // Donde aparecen en X (fuera de pantalla)
        posicionDeAparicion: 850,

        // Cuando se consideran fuera de pantalla para eliminarlos
        limiteFueraDePantalla: -100
    },

    // 🏆 CONFIGURACIÓN DE PUNTUACIÓN
    puntuacion: {
        puntosPorVehiculoEsquivado: 10,  // Puntos que ganas cuando un vehículo sale de pantalla
        mostrarPuntosEnPantalla: true,   // Si mostrar o no los puntos
        posicionTextoPuntosX: 16,        // Donde mostrar el texto de puntos
        posicionTextoPuntosY: 16
    },

    // 🎨 CONFIGURACIÓN VISUAL
    visual: {
        // Carretera
        colorDeCarretera: 0x404040,      // Color gris de la carretera
        colorDeLineas: 0xFFFFFF,         // Color blanco de las líneas
        anchoDeLinea: 40,                // Qué tan anchas son las líneas
        altoDeLinea: 4,                  // Qué tan altas son las líneas
        separacionEntreLineas: 60,       // Distancia entre líneas

        // Colores de sprites
        colores: {
            // Pato
            cuerpoPato: 0xFFD700,        // Amarillo
            cabezaPato: 0xFFA500,        // Naranja
            picoPato: 0xFF8C00,          // Naranja oscuro
            ojoPato: 0x000000,           // Negro
            patasPato: 0xFF8C00,         // Naranja oscuro

            // Auto
            cuerpoAuto: 0xFF0000,        // Rojo
            techoAuto: 0xCC0000,         // Rojo oscuro
            ventanasAuto: 0x87CEEB,      // Azul cielo
            ruedasAuto: 0x000000,        // Negro
            llantasAuto: 0x666666,       // Gris
            farosAuto: 0xFFFF00,         // Amarillo

            // Camión
            cabinaCamion: 0x0000FF,      // Azul
            ventanaCamion: 0x87CEEB,     // Azul cielo
            cajaCamion: 0x4169E1,        // Azul real
            detallesCamion: 0x000080,    // Azul marino
            ruedasCamion: 0x000000,      // Negro
            llantasCamion: 0x666666,     // Gris
            farosCamion: 0xFFFF00        // Amarillo
        }
    },

    // 🎮 CONFIGURACIÓN DE CONTROLES
    controles: {
        usarFlechas: true,               // Permitir usar flechas del teclado
        usarWASD: true,                  // Permitir usar WASD
        teclaDeReinicio: 'R'             // Tecla para reiniciar el juego
    },

    // 💀 CONFIGURACIÓN DE GAME OVER
    gameOver: {
        colorDelPatoAlPerder: 0xFF0000,  // Color rojo cuando el pato pierde
        mostrarMensaje: true,            // Si mostrar mensaje de game over
        tamañoDelTexto: 48,              // Tamaño del texto "JUEGO TERMINADO"
        colorDelTexto: '#FF0000',        // Color del texto de game over
        mostrarInstruccionesDeReinicio: true
    },

    // 📝 CONFIGURACIÓN DE TEXTOS
    textos: {
        fuente: 'Arial',
        tamañoPuntos: '24px',
        colorPuntos: '#FFFFFF',
        tamañoInstrucciones: '18px',
        colorInstrucciones: '#FFFFFF',
        tamañoGameOver: '48px',
        colorGameOver: '#FF0000',
        tamañoReinicio: '24px',
        colorReinicio: '#FFFFFF',

        // Mensajes del juego
        mensajes: {
            puntos: 'Puntos: ',
            instrucciones: 'Usa las flechas o WASD para mover el pato',
            gameOver: '¡JUEGO TERMINADO!',
            reiniciar: 'Presiona R para jugar otra vez'
        }
    },

    // 🔧 CONFIGURACIÓN DE DESARROLLO
    desarrollo: {
        mostrarFPS: false,               // Mostrar frames por segundo
        mostrarColisiones: false,        // Mostrar cajas de colisión
        modoDebug: false                 // Activar modo debug
    },

    // 🎵 CONFIGURACIÓN DE AUDIO (para futuras mejoras)
    audio: {
        activarSonidos: true,
        volumenGeneral: 0.5,
        sonidos: {
            salto: true,
            colision: true,
            puntos: true
        }
    },

    // 🏁 CONFIGURACIÓN DE DIFICULTAD
    dificultad: {
        // Niveles de dificultad predefinidos
        facil: {
            tiempoEntreVehiculos: 1200,
            velocidadMinima: 20,
            velocidadMaxima: 60,
            probabilidadDeCamion: 0.2
        },
        normal: {
            tiempoEntreVehiculos: 800,
            velocidadMinima: 30,
            velocidadMaxima: 80,
            probabilidadDeCamion: 0.3
        },
        dificil: {
            tiempoEntreVehiculos: 500,
            velocidadMinima: 50,
            velocidadMaxima: 120,
            probabilidadDeCamion: 0.4
        },

        // Dificultad actual (cambia esto para cambiar la dificultad)
        nivelActual: 'normal'  // 'facil', 'normal', o 'dificil'
    }
};

// 🔄 FUNCIÓN PARA APLICAR DIFICULTAD
export function aplicarDificultad(nivel) {
    const config = ConfiguracionDelJuego.dificultad[nivel];
    if (config) {
        ConfiguracionDelJuego.vehiculos.tiempoEntreVehiculos = config.tiempoEntreVehiculos;
        ConfiguracionDelJuego.vehiculos.velocidadMinima = config.velocidadMinima;
        ConfiguracionDelJuego.vehiculos.velocidadMaxima = config.velocidadMaxima;
        ConfiguracionDelJuego.vehiculos.probabilidadDeCamion = config.probabilidadDeCamion;
        ConfiguracionDelJuego.dificultad.nivelActual = nivel;
    }
}

// 🎯 FUNCIÓN PARA OBTENER CONFIGURACIÓN ACTUAL
export function obtenerConfiguracion() {
    return ConfiguracionDelJuego;
}