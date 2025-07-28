import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { validateCandidateData } from '../application/validator';

describe('Validator Tests - JMG', () => {
  beforeEach(() => {
    // Limpiar todos los mocks antes de cada test
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Restaurar mocks después de cada test
    jest.restoreAllMocks();
  });

  describe('validateCandidateData', () => {
    test('debería validar correctamente un candidato válido completo', () => {
      const validCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@email.com',
        phone: '612345678',
        address: 'Calle Mayor 123, Madrid'
      };

      expect(() => validateCandidateData(validCandidate)).not.toThrow();
    });

    test('debería lanzar error si firstName es inválido - vacío', () => {
      const invalidCandidate = {
        firstName: '',
        lastName: 'García',
        email: 'juan.garcia@email.com'
      };

      expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid name');
    });

    test('debería lanzar error si firstName es inválido - undefined', () => {
      const invalidCandidate = {
        lastName: 'García',
        email: 'juan.garcia@email.com'
      };

      expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid name');
    });

    test('debería lanzar error si firstName contiene números', () => {
      const invalidCandidate = {
        firstName: 'Juan123',
        lastName: 'García',
        email: 'juan.garcia@email.com'
      };

      expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid name');
    });

    test('debería lanzar error si firstName contiene caracteres especiales', () => {
      const invalidCandidate = {
        firstName: 'Juan@#$',
        lastName: 'García',
        email: 'juan.garcia@email.com'
      };

      expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid name');
    });

    test('debería lanzar error si firstName es muy corto', () => {
      const invalidCandidate = {
        firstName: 'J',
        lastName: 'García',
        email: 'juan.garcia@email.com'
      };

      expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid name');
    });

    test('debería lanzar error si firstName es muy largo (más de 100 caracteres)', () => {
      const invalidCandidate = {
        firstName: 'a'.repeat(101),
        lastName: 'García',
        email: 'juan.garcia@email.com'
      };

      expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid name');
    });

    test('debería lanzar error si lastName es inválido - vacío', () => {
      const invalidCandidate = {
        firstName: 'Juan',
        lastName: '',
        email: 'juan.garcia@email.com'
      };

      expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid name');
    });

    test('debería lanzar error si lastName es inválido - undefined', () => {
      const invalidCandidate = {
        firstName: 'Juan',
        email: 'juan.garcia@email.com'
      };

      expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid name');
    });

    test('debería lanzar error si email es inválido - vacío', () => {
      const invalidCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: ''
      };

      expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid email');
    });

    test('debería lanzar error si email es inválido - formato incorrecto', () => {
      const invalidCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'email_invalido'
      };

      expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid email');
    });

    test('debería lanzar error si email no tiene @', () => {
      const invalidCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia.email.com'
      };

      expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid email');
    });

    test('debería lanzar error si email no tiene dominio', () => {
      const invalidCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@'
      };

      expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid email');
    });

    test('debería lanzar error si phone es inválido - no empieza por 6, 7 o 9', () => {
      const invalidCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@email.com',
        phone: '123456789'
      };

      expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid phone');
    });

    test('debería lanzar error si phone es inválido - muy corto', () => {
      const invalidCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@email.com',
        phone: '612345'
      };

      expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid phone');
    });

    test('debería lanzar error si phone es inválido - muy largo', () => {
      const invalidCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@email.com',
        phone: '6123456789'
      };

      expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid phone');
    });

    test('debería aceptar phone válido que empiece por 6', () => {
      const validCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@email.com',
        phone: '612345678'
      };

      expect(() => validateCandidateData(validCandidate)).not.toThrow();
    });

    test('debería aceptar phone válido que empiece por 7', () => {
      const validCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@email.com',
        phone: '712345678'
      };

      expect(() => validateCandidateData(validCandidate)).not.toThrow();
    });

    test('debería aceptar phone válido que empiece por 9', () => {
      const validCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@email.com',
        phone: '912345678'
      };

      expect(() => validateCandidateData(validCandidate)).not.toThrow();
    });

    test('debería aceptar candidato sin phone (campo opcional)', () => {
      const validCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@email.com'
      };

      expect(() => validateCandidateData(validCandidate)).not.toThrow();
    });

    test('debería aceptar candidato sin address (campo opcional)', () => {
      const validCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@email.com',
        phone: '612345678'
      };

      expect(() => validateCandidateData(validCandidate)).not.toThrow();
    });

    test('debería aceptar nombres con acentos y ñ', () => {
      const validCandidate = {
        firstName: 'José María',
        lastName: 'Peña',
        email: 'jose.pena@email.com'
      };

      expect(() => validateCandidateData(validCandidate)).not.toThrow();
    });

    test('debería lanzar error si address es muy larga (más de 100 caracteres)', () => {
      const invalidCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@email.com',
        address: 'a'.repeat(101)
      };

      expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid address');
    });

    test('debería aceptar address válida', () => {
      const validCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@email.com',
        address: 'Calle Mayor 123, Madrid'
      };

      expect(() => validateCandidateData(validCandidate)).not.toThrow();
    });
  });

  describe('validateCandidateData con educaciones', () => {
    test('debería validar correctamente candidato con educación válida', () => {
      const validCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@email.com',
        educations: [{
          institution: 'Universidad Complutense',
          title: 'Ingeniería Informática',
          startDate: '2020-09-01'
        }]
      };

      expect(() => validateCandidateData(validCandidate)).not.toThrow();
    });

    test('debería lanzar error si educación tiene institución inválida', () => {
      const invalidCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@email.com',
        educations: [{
          institution: '',
          title: 'Ingeniería Informática',
          startDate: '2020-09-01'
        }]
      };

      expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid institution');
    });

    test('debería lanzar error si educación tiene título inválido', () => {
      const invalidCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@email.com',
        educations: [{
          institution: 'Universidad Complutense',
          title: '',
          startDate: '2020-09-01'
        }]
      };

      expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid title');
    });

    test('debería lanzar error si educación tiene startDate inválido', () => {
      const invalidCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@email.com',
        educations: [{
          institution: 'Universidad Complutense',
          title: 'Ingeniería Informática',
          startDate: 'fecha-invalida'
        }]
      };

      expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid date');
    });

    test('debería lanzar error si educación tiene endDate inválido', () => {
      const invalidCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@email.com',
        educations: [{
          institution: 'Universidad Complutense',
          title: 'Ingeniería Informática',
          startDate: '2020-09-01',
          endDate: 'fecha-invalida'
        }]
      };

      expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid end date');
    });

    test('debería aceptar educación con endDate válido', () => {
      const validCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@email.com',
        educations: [{
          institution: 'Universidad Complutense',
          title: 'Ingeniería Informática',
          startDate: '2020-09-01',
          endDate: '2024-06-30'
        }]
      };

      expect(() => validateCandidateData(validCandidate)).not.toThrow();
    });

    test('debería validar múltiples educaciones', () => {
      const validCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@email.com',
        educations: [
          {
            institution: 'Universidad Complutense',
            title: 'Ingeniería Informática',
            startDate: '2020-09-01',
            endDate: '2024-06-30'
          },
          {
            institution: 'IES Tech',
            title: 'Desarrollo de Aplicaciones Web',
            startDate: '2018-09-01',
            endDate: '2020-06-30'
          }
        ]
      };

      expect(() => validateCandidateData(validCandidate)).not.toThrow();
    });
  });

  describe('validateCandidateData con experiencias laborales', () => {
    test('debería validar correctamente candidato con experiencia laboral válida', () => {
      const validCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@email.com',
        workExperiences: [{
          company: 'Empresa Tech SL',
          position: 'Desarrollador Frontend',
          startDate: '2022-01-15',
          description: 'Desarrollo de aplicaciones web con React'
        }]
      };

      expect(() => validateCandidateData(validCandidate)).not.toThrow();
    });

    test('debería lanzar error si experiencia tiene company inválida', () => {
      const invalidCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@email.com',
        workExperiences: [{
          company: '',
          position: 'Desarrollador Frontend',
          startDate: '2022-01-15'
        }]
      };

      expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid company');
    });

    test('debería lanzar error si experiencia tiene position inválida', () => {
      const invalidCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@email.com',
        workExperiences: [{
          company: 'Empresa Tech SL',
          position: '',
          startDate: '2022-01-15'
        }]
      };

      expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid position');
    });

    test('debería lanzar error si experiencia tiene startDate inválido', () => {
      const invalidCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@email.com',
        workExperiences: [{
          company: 'Empresa Tech SL',
          position: 'Desarrollador Frontend',
          startDate: 'fecha-invalida'
        }]
      };

      expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid date');
    });

    test('debería lanzar error si experiencia tiene description muy larga', () => {
      const invalidCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@email.com',
        workExperiences: [{
          company: 'Empresa Tech SL',
          position: 'Desarrollador Frontend',
          startDate: '2022-01-15',
          description: 'a'.repeat(201) // Más de 200 caracteres
        }]
      };

      expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid description');
    });

    test('debería aceptar experiencia sin endDate (trabajo actual)', () => {
      const validCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@email.com',
        workExperiences: [{
          company: 'Empresa Tech SL',
          position: 'Desarrollador Frontend',
          startDate: '2022-01-15',
          description: 'Trabajo actual'
        }]
      };

      expect(() => validateCandidateData(validCandidate)).not.toThrow();
    });

    test('debería validar múltiples experiencias laborales', () => {
      const validCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@email.com',
        workExperiences: [
          {
            company: 'Empresa Tech SL',
            position: 'Desarrollador Frontend',
            startDate: '2022-01-15',
            endDate: '2023-12-31',
            description: 'Desarrollo con React'
          },
          {
            company: 'StartupXYZ',
            position: 'Junior Developer',
            startDate: '2021-06-01',
            endDate: '2021-12-31'
          }
        ]
      };

      expect(() => validateCandidateData(validCandidate)).not.toThrow();
    });
  });

  describe('validateCandidateData con CV', () => {
    test('debería validar correctamente candidato con CV válido', () => {
      const validCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@email.com',
        cv: {
          filePath: '/uploads/cv_juan_garcia.pdf',
          fileType: 'application/pdf'
        }
      };

      expect(() => validateCandidateData(validCandidate)).not.toThrow();
    });

    test('debería lanzar error si CV no tiene filePath', () => {
      const invalidCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@email.com',
        cv: {
          fileType: 'application/pdf'
        }
      };

      expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid CV data');
    });

    test('debería lanzar error si CV no tiene fileType', () => {
      const invalidCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@email.com',
        cv: {
          filePath: '/uploads/cv_juan_garcia.pdf'
        }
      };

      expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid CV data');
    });

    test('debería aceptar candidato sin CV', () => {
      const validCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan.garcia@email.com'
      };

      expect(() => validateCandidateData(validCandidate)).not.toThrow();
    });
  });

  describe('validateCandidateData con id existente (edición)', () => {
    test('debería no validar campos cuando id está presente (modo edición)', () => {
      const candidateWithId = {
        id: 1
        // Otros campos pueden estar vacíos en modo edición
      };

      expect(() => validateCandidateData(candidateWithId)).not.toThrow();
    });

    test('debería no validar campos incompletos cuando id está presente', () => {
      const candidateWithId = {
        id: 1,
        firstName: '', // Inválido normalmente, pero válido en modo edición
        email: 'invalid-email' // Inválido normalmente, pero válido en modo edición
      };

      expect(() => validateCandidateData(candidateWithId)).not.toThrow();
    });
  });

  describe('Casos Edge y Límites', () => {
    test('debería manejar nombres con longitud exacta de 100 caracteres', () => {
      const exactLengthName = 'a'.repeat(100);
      const validCandidate = {
        firstName: exactLengthName,
        lastName: 'García',
        email: 'test@email.com'
      };

      expect(() => validateCandidateData(validCandidate)).not.toThrow();
    });

    test('debería manejar direcciones con longitud exacta de 100 caracteres', () => {
      const exactLengthAddress = 'a'.repeat(100);
      const validCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'test@email.com',
        address: exactLengthAddress
      };

      expect(() => validateCandidateData(validCandidate)).not.toThrow();
    });

    test('debería validar fechas con formato exacto YYYY-MM-DD', () => {
      const validCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'test@email.com',
        educations: [{
          institution: 'Universidad',
          title: 'Carrera',
          startDate: '2023-12-31'
        }]
      };

      expect(() => validateCandidateData(validCandidate)).not.toThrow();
    });

    test('debería rechazar fechas con formato incorrecto', () => {
      const invalidCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'test@email.com',
        educations: [{
          institution: 'Universidad',
          title: 'Carrera',
          startDate: '31/12/2023' // Formato DD/MM/YYYY incorrecto
        }]
      };

      expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid date');
    });

    test('debería manejar todos los campos opcionales como undefined', () => {
      const minimalCandidate = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan@email.com'
        // phone, address, educations, workExperiences, cv son undefined
      };

      expect(() => validateCandidateData(minimalCandidate)).not.toThrow();
    });

    test('debería manejar arrays vacíos para educations y workExperiences', () => {
      const candidateWithEmptyArrays = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan@email.com',
        educations: [],
        workExperiences: []
      };

      expect(() => validateCandidateData(candidateWithEmptyArrays)).not.toThrow();
    });
  });
});
