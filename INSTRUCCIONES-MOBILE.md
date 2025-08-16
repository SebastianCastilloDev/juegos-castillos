# 📱 Instrucciones para Móviles

## 🎮 Cómo Jugar en Móvil

### **Controles Disponibles:**

1. **Botones Virtuales** (esquina inferior derecha):
   - ↑ Mover arriba
   - ↓ Mover abajo  
   - ← Mover izquierda
   - → Mover derecha

2. **Gestos de Deslizamiento**:
   - Desliza hacia arriba = mover arriba
   - Desliza hacia abajo = mover abajo
   - Desliza hacia izquierda = mover izquierda
   - Desliza hacia derecha = mover derecha

3. **Reiniciar**:
   - Toca el botón verde "REINICIAR" cuando pierdas

## 🔧 Configuración Móvil

En `src/config/ConfiguracionDelJuego.js` puedes ajustar:

```javascript
controles: {
    habilitarControlesTactiles: true,    // Activar controles móviles
    sensibilidadTactil: 1.2,            // Sensibilidad de gestos
    botonesVirtuales: {
        tamaño: 60,                      // Tamaño de botones
        opacidad: 0.6,                   // Transparencia
        colorFondo: 0x000000             // Color negro
    }
}
```

## 📲 Instalación como App

1. Abre el juego en tu navegador móvil
2. En Chrome: Menú → "Agregar a pantalla de inicio"
3. En Safari: Compartir → "Agregar a pantalla de inicio"
4. ¡Ya tienes el juego como una app!

## 🎯 Consejos para Móvil

- **Orientación**: Gira tu teléfono horizontalmente para mejor experiencia
- **Pantalla completa**: El juego se adapta automáticamente
- **Sin zoom**: Los controles están optimizados para evitar zoom accidental
- **Múltiples toques**: Puedes tocar varios botones a la vez

¡Diviértete esquivando autos, camiones y helicópteros! 🦆🚗🚁