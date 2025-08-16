class EscenaDelJuego extends Phaser.Scene {
    constructor() {
        super({ key: 'EscenaDelJuego' });
    }

    preload() {
        // Crear los dibujos para el juego
        this.crearDibujosDelJuego();
    }

    crearDibujosDelJuego() {
        // Crear el dibujo del pato más realista
        const dibujoDelPato = this.add.graphics();

        // Cuerpo del pato (óvalo amarillo)
        dibujoDelPato.fillStyle(0xFFD700); // Amarillo
        dibujoDelPato.fillEllipse(16, 20, 24, 18);

        // Cabeza del pato (círculo más pequeño)
        dibujoDelPato.fillStyle(0xFFA500); // Naranja más oscuro
        dibujoDelPato.fillCircle(16, 10, 8);

        // Pico del pato (triángulo naranja)
        dibujoDelPato.fillStyle(0xFF8C00); // Naranja oscuro
        dibujoDelPato.fillTriangle(16, 8, 12, 12, 20, 12);

        // Ojo del pato (punto negro)
        dibujoDelPato.fillStyle(0x000000); // Negro
        dibujoDelPato.fillCircle(18, 8, 2);

        // Patitas del pato (líneas naranjas)
        dibujoDelPato.lineStyle(2, 0xFF8C00);
        dibujoDelPato.lineBetween(12, 28, 10, 32);
        dibujoDelPato.lineBetween(20, 28, 22, 32);

        dibujoDelPato.generateTexture('pato', 32, 36);
        dibujoDelPato.destroy();

        // Crear el dibujo del auto más realista
        const dibujoDelAuto = this.add.graphics();

        // Cuerpo principal del auto (rectángulo redondeado)
        dibujoDelAuto.fillStyle(0xFF0000); // Rojo
        dibujoDelAuto.fillRoundedRect(2, 8, 56, 20, 4);

        // Techo del auto (rectángulo más pequeño)
        dibujoDelAuto.fillStyle(0xCC0000); // Rojo más oscuro
        dibujoDelAuto.fillRoundedRect(12, 4, 36, 12, 3);

        // Ventanas (rectángulos azul claro)
        dibujoDelAuto.fillStyle(0x87CEEB); // Azul cielo
        dibujoDelAuto.fillRoundedRect(14, 6, 14, 8, 2);
        dibujoDelAuto.fillRoundedRect(32, 6, 14, 8, 2);

        // Ruedas (círculos negros)
        dibujoDelAuto.fillStyle(0x000000); // Negro
        dibujoDelAuto.fillCircle(12, 28, 6);
        dibujoDelAuto.fillCircle(48, 28, 6);

        // Llantas (círculos grises)
        dibujoDelAuto.fillStyle(0x666666); // Gris
        dibujoDelAuto.fillCircle(12, 28, 4);
        dibujoDelAuto.fillCircle(48, 28, 4);

        // Faros (círculos amarillos)
        dibujoDelAuto.fillStyle(0xFFFF00); // Amarillo
        dibujoDelAuto.fillCircle(58, 12, 3);
        dibujoDelAuto.fillCircle(58, 20, 3);

        dibujoDelAuto.generateTexture('auto', 60, 35);
        dibujoDelAuto.destroy();

        // Crear el dibujo del camión más realista
        const dibujoDelCamion = this.add.graphics();

        // Cabina del camión (rectángulo azul)
        dibujoDelCamion.fillStyle(0x0000FF); // Azul
        dibujoDelCamion.fillRoundedRect(2, 8, 25, 22, 3);

        // Ventana de la cabina
        dibujoDelCamion.fillStyle(0x87CEEB); // Azul cielo
        dibujoDelCamion.fillRoundedRect(4, 10, 21, 12, 2);

        // Caja del camión (rectángulo más grande)
        dibujoDelCamion.fillStyle(0x4169E1); // Azul real
        dibujoDelCamion.fillRoundedRect(27, 5, 50, 25, 4);

        // Detalles de la caja (líneas)
        dibujoDelCamion.lineStyle(2, 0x000080); // Azul marino
        dibujoDelCamion.lineBetween(35, 8, 35, 27);
        dibujoDelCamion.lineBetween(50, 8, 50, 27);
        dibujoDelCamion.lineBetween(65, 8, 65, 27);

        // Ruedas del camión (más grandes)
        dibujoDelCamion.fillStyle(0x000000); // Negro
        dibujoDelCamion.fillCircle(15, 32, 7);
        dibujoDelCamion.fillCircle(40, 32, 7);
        dibujoDelCamion.fillCircle(65, 32, 7);

        // Llantas
        dibujoDelCamion.fillStyle(0x666666); // Gris
        dibujoDelCamion.fillCircle(15, 32, 5);
        dibujoDelCamion.fillCircle(40, 32, 5);
        dibujoDelCamion.fillCircle(65, 32, 5);

        // Faros del camión
        dibujoDelCamion.fillStyle(0xFFFF00); // Amarillo
        dibujoDelCamion.fillCircle(27, 12, 3);
        dibujoDelCamion.fillCircle(27, 20, 3);

        dibujoDelCamion.generateTexture('camion', 80, 40);
        dibujoDelCamion.destroy();
    }

    create() {
        // Tamaño de la pantalla del juego
        this.anchoDelJuego = 800;
        this.altoDelJuego = 600;

        // Crear el fondo gris de la carretera
        this.add.rectangle(400, 300, 800, 600, 0x404040);

        // Dibujar las líneas blancas de la carretera
        for (let posicion = 0; posicion < 800; posicion += 60) {
            this.add.rectangle(posicion, 300, 40, 4, 0xFFFFFF);
        }

        // Crear el pato del jugador
        this.miPato = this.add.sprite(400, 550, 'pato');
        this.miPato.setScale(1.2); // Hacer el pato un poquito más grande

        // Crear el grupo donde van todos los vehículos
        this.todosLosVehiculos = this.add.group();

        // Configurar las teclas para mover el pato
        this.flechasDelTeclado = this.input.keyboard.createCursorKeys();
        this.teclasWASD = this.input.keyboard.addKeys('W,S,A,D');

        // Variables importantes del juego
        this.misPuntos = 0;
        this.juegoTerminado = false;

        // Mostrar los puntos en pantalla
        this.textoDeLosPuntos = this.add.text(16, 16, 'Puntos: 0', {
            fontSize: '24px',
            fill: '#FFFFFF'
        });

        // Crear un temporizador que hace aparecer vehículos cada cierto tiempo
        this.temporizadorDeVehiculos = this.time.addEvent({
            delay: 800, // Cada 0.8 segundos (más rápido = más vehículos)
            callback: this.hacerAparecerVehiculo,
            callbackScope: this,
            loop: true // Repetir para siempre
        });

        // Mostrar las instrucciones
        this.add.text(400, 50, 'Usa las flechas o WASD para mover el pato', {
            fontSize: '18px',
            fill: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);
    }

    update() {
        // Si el juego terminó, no hacer nada más
        if (this.juegoTerminado) return;

        // Mover el pato según las teclas que presione el jugador
        this.moverElPato();

        // Mover todos los vehículos hacia la izquierda
        this.moverTodosLosVehiculos();

        // Revisar si el pato chocó con algún vehículo
        this.revisarSiHayChoques();
    }

    moverElPato() {
        const velocidadDelPato = 200;

        // Mover hacia la izquierda
        if (this.flechasDelTeclado.left.isDown || this.teclasWASD.A.isDown) {
            this.miPato.x -= velocidadDelPato * this.game.loop.delta / 1000;
        }
        // Mover hacia la derecha
        if (this.flechasDelTeclado.right.isDown || this.teclasWASD.D.isDown) {
            this.miPato.x += velocidadDelPato * this.game.loop.delta / 1000;
        }
        // Mover hacia arriba
        if (this.flechasDelTeclado.up.isDown || this.teclasWASD.W.isDown) {
            this.miPato.y -= velocidadDelPato * this.game.loop.delta / 1000;
        }
        // Mover hacia abajo
        if (this.flechasDelTeclado.down.isDown || this.teclasWASD.S.isDown) {
            this.miPato.y += velocidadDelPato * this.game.loop.delta / 1000;
        }

        // No dejar que el pato se salga de la pantalla
        this.miPato.x = Phaser.Math.Clamp(this.miPato.x, 16, 784);
        this.miPato.y = Phaser.Math.Clamp(this.miPato.y, 16, 584);
    }

    moverTodosLosVehiculos() {
        this.todosLosVehiculos.children.entries.forEach(vehiculo => {
            // Mover cada vehículo hacia la izquierda
            vehiculo.x -= vehiculo.velocidad;

            // Si el vehículo se salió de la pantalla, eliminarlo y dar puntos
            if (vehiculo.x < -100) {
                vehiculo.destroy();
                this.misPuntos += 10;
                this.textoDeLosPuntos.setText('Puntos: ' + this.misPuntos);
            }
        });
    }

    hacerAparecerVehiculo() {
        // Las diferentes filas donde pueden aparecer los vehículos
        const filasDeVehiculos = [150, 250, 350, 450];
        const filaElegida = Phaser.Utils.Array.GetRandom(filasDeVehiculos);

        // Decidir si va a ser un camión o un auto
        const esUnCamion = Math.random() < 0.3; // 30% de probabilidad de camión
        const tipoDeVehiculo = esUnCamion ? 'camion' : 'auto';

        // Crear el vehículo en el lado derecho de la pantalla
        const nuevoVehiculo = this.add.sprite(850, filaElegida, tipoDeVehiculo);
        nuevoVehiculo.velocidad = Phaser.Math.Between(30, 80); // Velocidad mucho más lenta

        // Agregar el vehículo al grupo
        this.todosLosVehiculos.add(nuevoVehiculo);
    }

    revisarSiHayChoques() {
        this.todosLosVehiculos.children.entries.forEach(vehiculo => {
            // Revisar si el pato está tocando este vehículo
            if (Phaser.Geom.Intersects.RectangleToRectangle(
                this.miPato.getBounds(),
                vehiculo.getBounds()
            )) {
                this.terminarElJuego();
            }
        });
    }

    terminarElJuego() {
        this.juegoTerminado = true;
        this.temporizadorDeVehiculos.destroy();

        // Hacer que el pato se vea rojo (como si estuviera lastimado)
        this.miPato.setTint(0xFF0000);

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

        // Permitir reiniciar el juego con la tecla R
        this.input.keyboard.once('keydown-R', () => {
            this.scene.restart();
        });
    }
}

// Configuración del juego
const configuracionDelJuego = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
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