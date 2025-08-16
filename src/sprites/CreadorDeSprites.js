export class CreadorDeSprites {

    static crearPato(escena) {
        // Crear el dibujo del pato más realista
        const dibujoDelPato = escena.add.graphics();

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
    }

    static crearAuto(escena) {
        // Crear el dibujo del auto más realista
        const dibujoDelAuto = escena.add.graphics();

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
    }

    static crearCamion(escena) {
        // Crear el dibujo del camión más realista
        const dibujoDelCamion = escena.add.graphics();

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
}