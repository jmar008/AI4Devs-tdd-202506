import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { addCandidate } from '../application/services/candidateService';

// Mock de los modelos de dominio
jest.mock('../domain/models/Candidate');
jest.mock('../domain/models/Education');
jest.mock('../domain/models/WorkExperience');
jest.mock('../domain/models/Resume');
jest.mock('../application/validator');

import { Candidate } from '../domain/models/Candidate';
import { Education } from '../domain/models/Education';
import { WorkExperience } from '../domain/models/WorkExperience';
import { Resume } from '../domain/models/Resume';
import { validateCandidateData } from '../application/validator';

// Tipos para los mocks
const MockedCandidate = Candidate as jest.MockedClass<typeof Candidate>;
const MockedEducation = Education as jest.MockedClass<typeof Education>;
const MockedWorkExperience = WorkExperience as jest.MockedClass<typeof WorkExperience>;
const MockedResume = Resume as jest.MockedClass<typeof Resume>;
const mockedValidateCandidateData = validateCandidateData as jest.MockedFunction<typeof validateCandidateData>;

describe('CandidateService Tests - JMG', () => {
  let mockCandidateInstance: any;
  let mockEducationInstance: any;
  let mockWorkExperienceInstance: any;
  let mockResumeInstance: any;

  beforeEach(() => {
    // Configurar mocks antes de cada test
    jest.clearAllMocks();

    // Mock para la instancia de Candidate
    mockCandidateInstance = {
      id: 1,
      firstName: 'Juan',
      lastName: 'García',
      email: 'juan@email.com',
      education: [],
      workExperience: [],
      resumes: [],
      save: jest.fn()
    };

    // Mock para la instancia de Education
    mockEducationInstance = {
      candidateId: 1,
      save: jest.fn()
    };

    // Mock para la instancia de WorkExperience  
    mockWorkExperienceInstance = {
      candidateId: 1,
      save: jest.fn()
    };

    // Mock para la instancia de Resume
    mockResumeInstance = {
      candidateId: 1,
      save: jest.fn()
    };

    // Configurar los constructores mock
    MockedCandidate.mockImplementation(() => mockCandidateInstance);
    MockedEducation.mockImplementation(() => mockEducationInstance);
    MockedWorkExperience.mockImplementation(() => mockWorkExperienceInstance);
    MockedResume.mockImplementation(() => mockResumeInstance);

    // Mock del validador por defecto (no lanza errores)
    mockedValidateCandidateData.mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('addCandidate', () => {
    test('debería crear un candidato básico exitosamente', async () => {
      // Arrange
      const candidateData = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan@email.com'
      };

      const expectedSavedCandidate = { 
        id: 1, 
        ...candidateData 
      };

      mockCandidateInstance.save.mockResolvedValue(expectedSavedCandidate);

      // Act
      const result = await addCandidate(candidateData);

      // Assert
      expect(mockedValidateCandidateData).toHaveBeenCalledWith(candidateData);
      expect(MockedCandidate).toHaveBeenCalledWith(candidateData);
      expect(mockCandidateInstance.save).toHaveBeenCalled();
      expect(result).toEqual(expectedSavedCandidate);
    });

    test('debería crear candidato con educación exitosamente', async () => {
      // Arrange
      const candidateData = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan@email.com',
        educations: [
          {
            institution: 'Universidad Complutense',
            title: 'Ingeniería Informática',
            startDate: '2020-09-01'
          }
        ]
      };

      const expectedSavedCandidate = { 
        id: 1, 
        ...candidateData 
      };

      mockCandidateInstance.save.mockResolvedValue(expectedSavedCandidate);
      mockEducationInstance.save.mockResolvedValue(mockEducationInstance);

      // Act
      const result = await addCandidate(candidateData);

      // Assert
      expect(MockedEducation).toHaveBeenCalledWith(candidateData.educations[0]);
      expect(mockEducationInstance.candidateId).toBe(1);
      expect(mockEducationInstance.save).toHaveBeenCalled();
      expect(mockCandidateInstance.education).toContain(mockEducationInstance);
      expect(result).toEqual(expectedSavedCandidate);
    });

    test('debería crear candidato con múltiples educaciones', async () => {
      // Arrange
      const candidateData = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan@email.com',
        educations: [
          {
            institution: 'Universidad Complutense',
            title: 'Ingeniería Informática',
            startDate: '2020-09-01'
          },
          {
            institution: 'IES Tech',
            title: 'DAW',
            startDate: '2018-09-01'
          }
        ]
      };

      const expectedSavedCandidate = { 
        id: 1, 
        ...candidateData 
      };

      mockCandidateInstance.save.mockResolvedValue(expectedSavedCandidate);
      mockEducationInstance.save.mockResolvedValue(mockEducationInstance);

      // Act
      const result = await addCandidate(candidateData);

      // Assert
      expect(MockedEducation).toHaveBeenCalledTimes(2);
      expect(mockEducationInstance.save).toHaveBeenCalledTimes(2);
      expect(mockCandidateInstance.education).toHaveLength(2);
      expect(result).toEqual(expectedSavedCandidate);
    });

    test('debería crear candidato con experiencia laboral exitosamente', async () => {
      // Arrange
      const candidateData = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan@email.com',
        workExperiences: [
          {
            company: 'Tech Corp',
            position: 'Developer',
            startDate: '2022-01-01',
            description: 'Desarrollo web'
          }
        ]
      };

      const expectedSavedCandidate = { 
        id: 1, 
        ...candidateData 
      };

      mockCandidateInstance.save.mockResolvedValue(expectedSavedCandidate);
      mockWorkExperienceInstance.save.mockResolvedValue(mockWorkExperienceInstance);

      // Act
      const result = await addCandidate(candidateData);

      // Assert
      expect(MockedWorkExperience).toHaveBeenCalledWith(candidateData.workExperiences[0]);
      expect(mockWorkExperienceInstance.candidateId).toBe(1);
      expect(mockWorkExperienceInstance.save).toHaveBeenCalled();
      expect(mockCandidateInstance.workExperience).toContain(mockWorkExperienceInstance);
      expect(result).toEqual(expectedSavedCandidate);
    });

    test('debería crear candidato con CV exitosamente', async () => {
      // Arrange
      const candidateData = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan@email.com',
        cv: {
          filePath: '/uploads/cv.pdf',
          fileType: 'application/pdf'
        }
      };

      const expectedSavedCandidate = { 
        id: 1, 
        ...candidateData 
      };

      mockCandidateInstance.save.mockResolvedValue(expectedSavedCandidate);
      mockResumeInstance.save.mockResolvedValue(mockResumeInstance);

      // Act
      const result = await addCandidate(candidateData);

      // Assert
      expect(MockedResume).toHaveBeenCalledWith(candidateData.cv);
      expect(mockResumeInstance.candidateId).toBe(1);
      expect(mockResumeInstance.save).toHaveBeenCalled();
      expect(mockCandidateInstance.resumes).toContain(mockResumeInstance);
      expect(result).toEqual(expectedSavedCandidate);
    });

    test('debería crear candidato completo con todos los datos', async () => {
      // Arrange
      const candidateData = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan@email.com',
        phone: '612345678',
        address: 'Calle Mayor 123',
        educations: [
          {
            institution: 'Universidad Complutense',
            title: 'Ingeniería Informática',
            startDate: '2020-09-01'
          }
        ],
        workExperiences: [
          {
            company: 'Tech Corp',
            position: 'Developer',
            startDate: '2022-01-01'
          }
        ],
        cv: {
          filePath: '/uploads/cv.pdf',
          fileType: 'application/pdf'
        }
      };

      const expectedSavedCandidate = { 
        id: 1, 
        ...candidateData 
      };

      mockCandidateInstance.save.mockResolvedValue(expectedSavedCandidate);
      mockEducationInstance.save.mockResolvedValue(mockEducationInstance);
      mockWorkExperienceInstance.save.mockResolvedValue(mockWorkExperienceInstance);
      mockResumeInstance.save.mockResolvedValue(mockResumeInstance);

      // Act
      const result = await addCandidate(candidateData);

      // Assert
      expect(MockedEducation).toHaveBeenCalledTimes(1);
      expect(MockedWorkExperience).toHaveBeenCalledTimes(1);
      expect(MockedResume).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedSavedCandidate);
    });

    test('debería lanzar error si la validación falla', async () => {
      // Arrange
      const invalidCandidateData = {
        firstName: '',
        lastName: 'García',
        email: 'invalid-email'
      };

      mockedValidateCandidateData.mockImplementation(() => {
        throw new Error('Invalid name');
      });

      // Act & Assert
      await expect(addCandidate(invalidCandidateData)).rejects.toThrow('Invalid name');
      expect(MockedCandidate).not.toHaveBeenCalled();
    });

    test('debería lanzar error específico para email duplicado (P2002)', async () => {
      // Arrange
      const candidateData = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan@email.com'
      };

      const prismaError = {
        code: 'P2002',
        message: 'Unique constraint failed on the fields: (`email`)'
      };

      mockCandidateInstance.save.mockRejectedValue(prismaError);

      // Act & Assert
      await expect(addCandidate(candidateData)).rejects.toThrow('The email already exists in the database');
    });

    test('debería propagar otros errores de base de datos', async () => {
      // Arrange
      const candidateData = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan@email.com'
      };

      const genericError = new Error('Database connection failed');
      mockCandidateInstance.save.mockRejectedValue(genericError);

      // Act & Assert
      await expect(addCandidate(candidateData)).rejects.toThrow('Database connection failed');
    });

    test('no debería crear educación si array está vacío', async () => {
      // Arrange
      const candidateData = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan@email.com',
        educations: []
      };

      const expectedSavedCandidate = { 
        id: 1, 
        ...candidateData 
      };

      mockCandidateInstance.save.mockResolvedValue(expectedSavedCandidate);

      // Act
      const result = await addCandidate(candidateData);

      // Assert
      expect(MockedEducation).not.toHaveBeenCalled();
      expect(result).toEqual(expectedSavedCandidate);
    });

    test('no debería crear CV si está vacío', async () => {
      // Arrange
      const candidateData = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan@email.com',
        cv: {}
      };

      const expectedSavedCandidate = { 
        id: 1, 
        ...candidateData 
      };

      mockCandidateInstance.save.mockResolvedValue(expectedSavedCandidate);

      // Act
      const result = await addCandidate(candidateData);

      // Assert
      expect(MockedResume).not.toHaveBeenCalled();
      expect(result).toEqual(expectedSavedCandidate);
    });

    test('debería manejar error al guardar educación', async () => {
      // Arrange
      const candidateData = {
        firstName: 'Juan',
        lastName: 'García',
        email: 'juan@email.com',
        educations: [
          {
            institution: 'Universidad Complutense',
            title: 'Ingeniería Informática',
            startDate: '2020-09-01'
          }
        ]
      };

      const expectedSavedCandidate = { 
        id: 1, 
        ...candidateData 
      };

      mockCandidateInstance.save.mockResolvedValue(expectedSavedCandidate);
      mockEducationInstance.save.mockRejectedValue(new Error('Error saving education'));

      // Act & Assert
      await expect(addCandidate(candidateData)).rejects.toThrow('Error saving education');
    });
  });
});
