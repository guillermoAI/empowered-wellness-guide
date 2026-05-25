## Cambios solicitados

### 1. Rebranding: NOMBRE STUDIO → VIKYFIT
- Reemplazar todas las apariciones de "NOMBRE STUDIO" por "VIKYFIT" en:
  - `src/components/site-chrome.tsx` (Navbar, Footer)
  - `src/routes/index.tsx` (MockupCard, subtítulo)
  - `src/routes/tu-plan.tsx` (header, footer del PDF)

### 2. Sección "Mis chicas" — 7 casos reales
Actualizar `src/routes/index.tsx` para incluir los 7 casos de éxito de Viky con esta estructura por persona:

| # | Nombre | Edad | Profesión | Hijos | Historia | Resultado | Identidad |
|---|--------|------|-----------|-------|----------|-----------|-----------|
| 1 | Natalia | 38 | Gerente comercial | 1 | Viaja semanalmente, eventos fuera, entrenaba pero estaba sin entrenar | Desinflamación y bajada de volumen y peso en 3 meses | La que viajaba y pensaba que no podía |
| 2 | Cristina | 54 | Recepcionista/Administrativa | 2 | Sedentaria, no entrenaba, complejo brazos, quería operarse | -12 kg en 5 meses, eliminó barriga, recuperó energía | La que se había dejado y pensaba que era tarde |
| 3 | Montse | 45 | Arquitecta | 1 | Entrenaba sin estructura, sin resultados | -4 kg en 3 meses, más firme y definida | La que entrenaba sin resultados y se sentía estancada |
| 4 | Elena | 47 | Contable | 1 (perimenopausia) | Cuerpo cambiando, más flácida, más barriga | -5,5 kg en 3 meses, firme, vientre/brazos/glúteos tonificados | La que no se reconocía en el espejo |
| 5 | Susana | 51 | Enfermera | 3 | Premenopausia, +5 kg de golpe, clases dirigidas sin resultado | 4 kg en 2 meses, cintura 85→79, peso 65→61 kg | La que no conseguía volver a su peso |
| 6 | Raquel | 48 | Mercadona | 2 | Trabajo demandante, cansancio, sin margen para cuidarse | -4 cm cintura en 3 meses, transformó su cuerpo | La que dejó de obsesionarse con la báscula |
| 7 | Silvia | 53 | Limpiadora | 1 | No hacía ejercicio, solo cuidaba alimentación, sin resultados | -3 kg en 2 meses, más firme, más energía, ropa le sienta bien | La que pensaba que solo comer bien era suficiente |

**Diseño de la sección**: Una sola foto por persona (placeholder por ahora, el usuario subirá las fotos reales luego). Layout tipo tarjeta horizontal (foto a la izquierda, datos a la derecha) en desktop, apilado en móvil. Se mantiene el estilo rosa minimalista actual.

### 3. Ajuste del placeholder de foto
Como el usuario dice que pondrá una foto por persona (ya combinada antes/después), se adapta el diseño para mostrar un solo placeholder de imagen por caso, en lugar de la cuadrícula antes/después anterior.

## Ficheros a modificar
- `src/components/site-chrome.tsx`
- `src/routes/index.tsx`
- `src/routes/tu-plan.tsx`