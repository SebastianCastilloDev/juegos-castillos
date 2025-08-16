import { ConfiguracionDelJuego } from '../config/ConfiguracionDelJuego.js';

export class ManejadorDeControlesMobiles {
    constructor(escena) {
        this.escena = escena;
        this.botones = {};
        this.esMobile = this.detectarDispositivo();

        if (this.esMobile && ConfiguracionDelJuego.controles.habilitarControlesTactiles) {
            this.crearControlesTactiles();
            this.configurarGestos();
        }
    }

    detectarDispositivo() {
        // Detectar si es un dispositivo móvil
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
            ('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0);
    }

    crearControlesTactiles() {
        const config = ConfiguracionDelJuego.controles.botonesVirtuales;
        const pantalla = ConfiguracionDelJuego.pantalla;

        // Crear botones direccionales
        this.crearBotonDireccion('arriba', pantalla.ancho - config.tamaño - config.margen, config.margen, '↑');
        this.crearBotonDireccion('izquierda', pantalla.ancho - config.tamaño * 2 - config.margen * 2, config.tamaño + config.margen * 2, '←');
        this.crearBotonDireccion('derecha', pantalla.ancho - config.margen, config.tamaño + config.margen * 2, '→');
        this.crearBotonDireccion('abajo', pantalla.ancho - config.tamaño - config.margen, config.tamaño * 2 + config.margen * 3, '↓');

        // Crear botón de reinicio (inicialmente oculto)
        this.crearBotonReinicio();
    }

    crearBotonDireccion(direccion, x, y, simbolo) {
        const config = ConfiguracionDelJuego.controles.botonesVirtuales;

        // Crear fondo del botón
        const fondo = this.escena.add.circle(x, y, config.tamaño / 2, config.colorFondo);
        fondo.setAlpha(config.opacidad);
        fondo.setScrollFactor(0); // Mantener fijo en pantalla

        // Crear texto del botón
        const texto = this.escena.add.text(x, y, simbolo, {
            fontSize: '24px',
            fill: '#FFFFFF',
            align: 'center'
        });
        texto.setOrigin(0.5);
        texto.setScrollFactor(0);

        // Hacer el botón interactivo
        fondo.setInteractive();

        // Guardar referencia del botón
        this.botones[direccion] = {
            fondo: fondo,
            texto: texto,
            presionado: false
        };

        // Configurar eventos táctiles
        fondo.on('pointerdown', () => {
            this.botones[direccion].presionado = true;
            fondo.setAlpha(1); // Hacer más visible cuando se presiona
        });

        fondo.on('pointerup', () => {
            this.botones[direccion].presionado = false;
            fondo.setAlpha(config.opacidad);
        });

        fondo.on('pointerout', () => {
            this.botones[direccion].presionado = false;
            fondo.setAlpha(config.opacidad);
        });
    }

    crearBotonReinicio() {
        const config = ConfiguracionDelJuego.controles.botonesVirtuales;
        const pantalla = ConfiguracionDelJuego.pantalla;

        // Crear botón de reinicio en el centro
        const fondo = this.escena.add.circle(
            pantalla.ancho / 2,
            pantalla.alto / 2 + 100,
            config.tamaño,
            0x00FF00
        );
        fondo.setAlpha(0.8);
        fondo.setScrollFactor(0);
        fondo.setVisible(false); // Oculto inicialmente

        const texto = this.escena.add.text(
            pantalla.ancho / 2,
            pantalla.alto / 2 + 100,
            'REINICIAR',
            {
                fontSize: '16px',
                fill: '#FFFFFF',
                align: 'center'
            }
        );
        texto.setOrigin(0.5);
        texto.setScrollFactor(0);
        texto.setVisible(false);

        fondo.setInteractive();
        fondo.on('pointerdown', () => {
            this.escena.scene.restart();
        });

        this.botones.reiniciar = {
            fondo: fondo,
            texto: texto
        };
    }

    configurarGestos() {
        // Configurar gestos de deslizamiento
        this.escena.input.on('pointerdown', (pointer) => {
            this.inicioToque = { x: pointer.x, y: pointer.y };
        });

        this.escena.input.on('pointerup', (pointer) => {
            if (this.inicioToque) {
                const deltaX = pointer.x - this.inicioToque.x;
                const deltaY = pointer.y - this.inicioToque.y;
                const distancia = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                // Solo procesar si el deslizamiento fue lo suficientemente largo
                if (distancia > 30) {
                    this.procesarGesto(deltaX, deltaY);
                }

                this.inicioToque = null;
            }
        });
    }

    procesarGesto(deltaX, deltaY) {
        const sensibilidad = ConfiguracionDelJuego.controles.sensibilidadTactil;

        // Determinar la dirección principal del gesto
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Movimiento horizontal
            if (deltaX > 0) {
                this.simularMovimiento('derecha', sensibilidad);
            } else {
                this.simularMovimiento('izquierda', sensibilidad);
            }
        } else {
            // Movimiento vertical
            if (deltaY > 0) {
                this.simularMovimiento('abajo', sensibilidad);
            } else {
                this.simularMovimiento('arriba', sensibilidad);
            }
        }
    }

    simularMovimiento(direccion, intensidad) {
        // Simular movimiento por un corto período
        this.movimientoSimulado = {
            direccion: direccion,
            tiempo: this.escena.time.now + (200 * intensidad)
        };
    }

    obtenerEstadoDeControles() {
        const estado = {
            arriba: false,
            abajo: false,
            izquierda: false,
            derecha: false
        };

        if (!this.esMobile) {
            return estado; // Retornar estado vacío si no es móvil
        }

        // Verificar botones presionados
        for (const direccion in this.botones) {
            if (this.botones[direccion].presionado) {
                estado[direccion] = true;
            }
        }

        // Verificar movimiento simulado por gestos
        if (this.movimientoSimulado && this.escena.time.now < this.movimientoSimulado.tiempo) {
            estado[this.movimientoSimulado.direccion] = true;
        } else {
            this.movimientoSimulado = null;
        }

        return estado;
    }

    mostrarBotonReinicio() {
        if (this.esMobile && this.botones.reiniciar) {
            this.botones.reiniciar.fondo.setVisible(true);
            this.botones.reiniciar.texto.setVisible(true);
        }
    }

    ocultarBotonReinicio() {
        if (this.esMobile && this.botones.reiniciar) {
            this.botones.reiniciar.fondo.setVisible(false);
            this.botones.reiniciar.texto.setVisible(false);
        }
    }

    esMobile() {
        return this.esMobile;
    }

    destruir() {
        // Limpiar todos los botones
        for (const boton in this.botones) {
            if (this.botones[boton].fondo) {
                this.botones[boton].fondo.destroy();
            }
            if (this.botones[boton].texto) {
                this.botones[boton].texto.destroy();
            }
        }
    }
}