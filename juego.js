class EscenaDelJuego extends Phaser.Scene {
    constructor() {
        super({ key: 'EscenaDelJuego' });
    }

    preload() {
        // Crear los dibujos para el juego
        this.crearDibujosDelJuego();
    }

    crearDibujosDelJuego() {
        // Crear el dibujo del pato (círculo amarillo)
        const dibujoDelPato = this.add.graphics();
        dibujoDelPato.fillStyle(0xFFD700); // Color amarillo
        dibujoDelPato.fillCircle(16, 16, 15);
        dibujoDelPato.generateTexture('pato', 32, 32);
        dibujoDelPato.destroy();

        // Crear el dibujo del auto (rectángulo rojo)
        const dibujoDelAuto = this.add.graphics();
        dibujoDelAuto.fillStyle(0xFF0000); // Color rojo
        dibujoDelAuto.fillRect(0, 0, 60, 30);
        dibujoDelAuto.generateTexture('auto', 60, 30);
        dibujoDelAuto.destroy();

        // Crear el dibujo del camión (rectángulo azul más grande)
        const dibujoDelCamion = this.add.graphics();
        dibujoDelCamion.fillStyle(0x0000FF); // Color azul
        dibujoDelCamion.fillRect(0, 0, 80, 35);
        dibujoDelCamion.generateTexture('camion', 80, 35);
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
            delay: 1500, // Cada 1.5 segundos
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
        nuevoVehiculo.velocidad = Phaser.Math.Between(100, 200); // Velocidad aleatoria

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