# 🎮 Guía de Configuración del Juego

Este archivo te explica cómo cambiar la configuración del juego para hacerlo más fácil, más difícil, o simplemente diferente.

## 📁 Archivo de Configuración

Toda la configuración está en: `src/config/ConfiguracionDelJuego.js`

## 🎯 Ejemplos de Cambios Comunes

### Hacer el juego MÁS FÁCIL
```javascript
// En ConfiguracionDelJuego.js, cambia estos valores:

vehiculos: {
    tiempoEntreVehiculos: 1500,    // Más tiempo = menos vehículos
    velocidadMinima: 20,           // Más lento
    velocidadMaxima: 50,           // Más lento
    probabilidadDeCamion: 0.1,     // Menos camiones (10%)
}

pato: {
    velocidad: 250,                // Pato más rápido
}
```

### Hacer el juego MÁS DIFÍCIL
```javascript
vehiculos: {
    tiempoEntreVehiculos: 400,     // Menos tiempo = más vehículos
    velocidadMinima: 60,           // Más rápido
    velocidadMaxima: 150,          // Más rápido
    probabilidadDeCamion: 0.5,     // Más camiones (50%)
}

pato: {
    velocidad: 150,                // Pato más lento
}
```

### Cambiar Colores del Juego
```javascript
visual: {
    colores: {
        cuerpoPato: 0x00FF00,      // Pato verde
        cuerpoAuto: 0x0000FF,      // Autos azules
        cabinaCamion: 0xFF00FF,    // Camiones morados
    }
}
```

### Cambiar el Tamaño de la Pantalla
```javascript
pantalla: {
    ancho: 1000,                   // Pantalla más ancha
    alto: 700,                     // Pantalla más alta
}
```

### Más Puntos por Esquivar
```javascript
puntuacion: {
    puntosPorVehiculoEsquivado: 25,  // 25 puntos en vez de 10
}
```

### Cambiar los Controles
```javascript
controles: {
    usarFlechas: false,            // Desactivar flechas
    usarWASD: true,                // Solo WASD
    teclaDeReinicio: 'SPACE'       // Espacio para reiniciar
}
```

## 🏁 Niveles de Dificultad Predefinidos

El juego ya tiene 3 niveles listos. Para cambiar de nivel:

```javascript
// Cambiar esta línea en ConfiguracionDelJuego.js:
dificultad: {
    nivelActual: 'facil'     // Opciones: 'facil', 'normal', 'dificil'
}
```

### Características de cada nivel:

**FÁCIL:**
- Vehículos cada 1.2 segundos
- Velocidad: 20-60
- 20% camiones

**NORMAL:**
- Vehículos cada 0.8 segundos
- Velocidad: 30-80
- 30% camiones

**DIFÍCIL:**
- Vehículos cada 0.5 segundos
- Velocidad: 50-120
- 40% camiones

## 🎨 Personalización Avanzada

### Cambiar las Filas de Vehículos
```javascript
vehiculos: {
    filasDeCarretera: [100, 200, 300, 400, 500],  // 5 filas en vez de 4
}
```

### Cambiar Mensajes del Juego
```javascript
textos: {
    mensajes: {
        puntos: 'Score: ',
        instrucciones: 'Move with arrow keys!',
        gameOver: 'GAME OVER!',
        reiniciar: 'Press R to restart'
    }
}
```

### Activar Modo Debug
```javascript
desarrollo: {
    mostrarFPS: true,              // Ver frames por segundo
    mostrarColisiones: true,       // Ver cajas de colisión
    modoDebug: true               // Activar debug general
}
```

## 💡 Consejos

1. **Guarda una copia** de la configuración original antes de hacer cambios
2. **Cambia de a poco** - prueba un cambio a la vez
3. **Reinicia el juego** después de cada cambio para ver el efecto
4. **Experimenta** - ¡no hay forma de romper nada permanentemente!

## 🔄 Restaurar Configuración Original

Si algo sale mal, simplemente copia los valores originales de vuelta al archivo de configuración.

¡Diviértete personalizando tu juego! 🦆🎮