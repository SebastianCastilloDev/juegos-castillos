export class Pato {
    constructor(escena, x, y) {
        this.escena = escena;
        this.sprite = escena.add.sprite(x, y, 'pato');
        this.sprite.setScale(1.2);
        this.velocidad = 200;
    }

    mover(flechas, wasd) {
        // Mover hacia la izquierda
        if (flechas.left.isDown || wasd.A.isDown) {
            this.sprite.x -= this.velocidad * this.escena.game.loop.delta / 1000;
        }
        // Mover hacia la derecha
        if (flechas.right.isDown || wasd.D.isDown) {
            this.sprite.x += this.velocidad * this.escena.game.loop.delta / 1000;
        }
        // Mover hacia arriba
        if (flechas.up.isDown || wasd.W.isDown) {
            this.sprite.y -= this.velocidad * this.escena.game.loop.delta / 1000;
        }
        // Mover hacia abajo
        if (flechas.down.isDown || wasd.S.isDown) {
            this.sprite.y += this.velocidad * this.escena.game.loop.delta / 1000;
        }

        // No dejar que el pato se salga de la pantalla
        this.sprite.x = Phaser.Math.Clamp(this.sprite.x, 16, 784);
        this.sprite.y = Phaser.Math.Clamp(this.sprite.y, 16, 584);
    }

    obtenerLimites() {
        return this.sprite.getBounds();
    }

    ponerColorRojo() {
        this.sprite.setTint(0xFF0000);
    }
}