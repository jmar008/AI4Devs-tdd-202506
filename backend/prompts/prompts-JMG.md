# Prompts JMG - Sesión de Testing con Jest y ts-jest

## Fecha: 28 de julio de 2025

### Prompt Inicial del Usuario:
```
Hola buenas noches se que eres un experto senior en testing, además eres experto en
ejecutar tests unitarios desde consola usando el comando npm test.
Puedes utilizar la siguiente documentacion

@https://jestjs.io/docs/getting-started

Recuerda que el código está escrito en Typescript. Y quiero que utilices  ts-jest:

@https://github.com/kulshekhar/ts-jest

Además quiero que realices los test de ejemplo del backend y lo guardes en backend/src/test/test-JMG.test.ts

todas las iteracciones que realice con el chat quiero que lo guardes en backend/prompts/prompts-JMG.md
analiza bien todo lo que te he pedido si dudas busca en internet o preguntame
```

### Análisis de Requerimientos:
1. **Configuración de Jest con ts-jest**: El usuario quiere configurar un entorno de testing para TypeScript
2. **Documentación consultada**: 
   - Jest Getting Started: https://jestjs.io/docs/getting-started
   - ts-jest repository: https://github.com/kulshekhar/ts-jest
3. **Archivos a crear**:
   - Tests unitarios en: `backend/src/test/test-JMG.test.ts`
   - Documentación de prompts en: `backend/prompts/prompts-JMG.md`

### Acciones Realizadas:

#### 1. Investigación y Documentación
- ✅ Consulté la documentación oficial de Jest
- ✅ Revisé la documentación de ts-jest
- ✅ Analicé la estructura del proyecto existente

#### 2. Análisis del Proyecto
- ✅ Revisé el `package.json` del backend y confirmé que ya tiene:
  - `jest: ^29.7.0`
  - `ts-jest: ^29.2.5` 
  - `@types/jest: ^29.5.13`
  - Script `"test": "jest"` ya configurado
- ✅ Analicé la estructura del código TypeScript existente
- ✅ Identifiqué los archivos principales para testear:
  - `src/application/validator.ts` - Validaciones de datos
  - `src/application/services/candidateService.ts` - Lógica de negocio
  - `src/domain/models/Candidate.ts` - Modelo de datos

#### 3. Configuración de Jest
- ✅ Creé `jest.config.js` con configuración optimizada para ts-jest:
  ```javascript
  module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    testMatch: [
      '**/__tests__/**/*.ts',
      '**/?(*.)+(spec|test).ts'
    ],
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    collectCoverageFrom: [
      'src/**/*.ts',
      '!src/**/*.d.ts',
      '!src/index.ts'
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    verbose: true,
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true
  };
  ```

#### 4. Creación de Tests Unitarios
- ✅ Creé el directorio `backend/src/test/`
- ✅ Creé `test-JMG.test.ts` con tests comprehensivos para:

**Tests del Validator (validateCandidateData):**
- Validación de candidatos válidos completos
- Validación de firstName (vacío, undefined, con números, caracteres especiales, muy corto, muy largo)
- Validación de lastName (vacío, undefined)
- Validación de email (vacío, formato incorrecto, sin @, sin dominio)
- Validación de phone (formato incorrecto, muy corto, muy largo, números válidos 6/7/9)
- Validación de address (muy larga)
- Validación de campos opcionales (phone, address)
- Validación de nombres con acentos y ñ

**Tests con Educaciones:**
- Candidatos con educación válida
- Validación de institution (vacía)
- Validación de title (vacío)
- Validación de startDate (formato incorrecto)
- Validación de endDate (formato incorrecto)
- Múltiples educaciones

**Tests con Experiencias Laborales:**
- Candidatos con experiencia válida
- Validación de company (vacía)
- Validación de position (vacía)
- Validación de startDate (formato incorrecto)
- Validación de description (muy larga)
- Experiencias sin endDate (trabajo actual)
- Múltiples experiencias

**Tests con CV:**
- CV válido
- CV sin filePath
- CV sin fileType
- Candidatos sin CV

**Tests de Modo Edición:**
- Validación cuando id está presente (modo edición)
- Campos incompletos en modo edición

**Tests de Casos Edge:**
- Nombres con longitud exacta de 100 caracteres
- Direcciones con longitud exacta de 100 caracteres
- Fechas con formato exacto YYYY-MM-DD
- Fechas con formato incorrecto
- Campos opcionales como undefined
- Arrays vacíos

#### 5. Estructura de Tests Implementada
```typescript
describe('Validator Tests - JMG', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('validateCandidateData', () => {
    // Tests básicos de validación
  });

  describe('validateCandidateData con educaciones', () => {
    // Tests específicos para educaciones
  });

  describe('validateCandidateData con experiencias laborales', () => {
    // Tests específicos para experiencias
  });

  describe('validateCandidateData con CV', () => {
    // Tests específicos para CV
  });

  describe('validateCandidateData con id existente (edición)', () => {
    // Tests para modo edición
  });

  describe('Casos Edge y Límites', () => {
    // Tests de casos límite
  });
});
```

### Aspectos Técnicos Implementados:

#### Configuración Jest:
- **Preset**: `ts-jest` para soporte completo de TypeScript
- **Test Environment**: `node` (apropiado para backend)
- **Test Matching**: Busca archivos `*.test.ts` y `*.spec.ts`
- **Coverage**: Configurado para generar reportes de cobertura
- **Mocks**: Configuración automática de limpieza de mocks

#### Mejores Prácticas de Testing:
- ✅ Tests descriptivos en español para mejor comprensión
- ✅ Organización por funcionalidad en describe blocks
- ✅ Setup y teardown apropiados con beforeEach/afterEach
- ✅ Casos de test positivos y negativos
- ✅ Tests de casos edge y límites
- ✅ Validación de mensajes de error específicos
- ✅ Tests para campos opcionales y requeridos

### Próximos Pasos Sugeridos:

1. **Ejecutar los tests**: `npm test` desde el directorio backend
2. **Ver coverage**: Los reportes se generarán en `backend/coverage/`
3. **Añadir más tests**: Para candidateService.ts y modelos de dominio
4. **Integración continua**: Configurar tests en pipeline CI/CD

### Comandos para Ejecutar:

```bash
# Desde el directorio backend
cd backend

# Ejecutar todos los tests
npm test

# Ejecutar tests específicos
npm test -- test-JMG.test.ts

# Ejecutar con coverage
npm test -- --coverage

# Ejecutar en modo watch
npm test -- --watch

# Ejecutar tests verbose
npm test -- --verbose
```

### Notas Técnicas:
- El proyecto ya tenía jest y ts-jest instalados en las versiones correctas
- La configuración está optimizada para TypeScript con source maps
- Los tests cubren todas las validaciones implementadas en el validator
- Se han incluido tests para casos edge importantes para robustez

---

*Documentación creada automáticamente por el asistente IA durante la sesión de configuración de testing.*
