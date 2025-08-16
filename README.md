# 🦆 Pato Cruzando

Un divertido juego estilo Frogger donde controlas un pato que debe cruzar una carretera llena de autos y camiones.

## 🎮 Cómo Jugar

- Usa las **flechas del teclado** o **WASD** para mover el pato
- Esquiva los autos rojos y camiones azules
- Gana 10 puntos cada vez que un vehículo sale de la pantalla
- Si tocas un vehículo, ¡pierdes!
- Presiona **R** para reiniciar después de perder

## 🚀 Instalación y Ejecución

### Instalar dependencias
```bash
npm install
```

### Ejecutar en modo desarrollo
```bash
npm run dev
```

### Construir para producción
```bash
npm run build
```

### Vista previa de la construcción
```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
pato-cruzando/
├── src/
│   ├── main.js                 # Punto de entrada principal
│   ├── escenas/
│   │   └── EscenaDelJuego.js   # Escena principal del juego
│   ├── objetos/
│   │   ├── Pato.js             # Clase del pato jugador
│   │   └── Vehiculo.js         # Clase de vehículos
│   ├── managers/
│   │   └── ManejadorDeVehiculos.js # Maneja la creación y movimiento de vehículos
│   └── sprites/
│       └── CreadorDeSprites.js # Crea los gráficos del juego
├── index.html                  # Página principal
├── package.json               # Configuración de npm
└── vite.config.js            # Configuración de Vite
```

## 🛠️ Tecnologías Utilizadas

- **Phaser 3** - Motor de juegos 2D
- **Vite** - Herramienta de construcción rápida
- **JavaScript ES6+** - Módulos y clases modernas
- **HTML5 Canvas** - Renderizado de gráficos

## 🎨 Características

- Gráficos dibujados proceduralmente (sin imágenes externas)
- Arquitectura modular y organizada
- Controles responsivos
- Sistema de puntuación
- Detección de colisiones precisa
- Velocidades variables de vehículos

¡Diviértete jugando! 🦆🚗