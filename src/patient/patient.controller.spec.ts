import { PatientController } from './patient.controller';

describe('PatientController', () => {
  let controller: PatientController;
  let patientService: {
    create: jest.Mock;
    findAll: jest.Mock;
    findOne: jest.Mock;
    update: jest.Mock;
    updateCognitiveEvaluation: jest.Mock;
    remove: jest.Mock;
  };

  beforeEach(() => {
    patientService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      updateCognitiveEvaluation: jest.fn(),
      remove: jest.fn(),
    };

    controller = new PatientController(patientService as any);
  });

  it('delegates create with user id', () => {
    const dto = { identification: '123' } as any;
    controller.create(dto, { id: 'u-1' } as any);

    expect(patientService.create).toHaveBeenCalledWith(dto, 'u-1');
  });

  it('delegates findAll', () => {
    controller.findAll();
    expect(patientService.findAll).toHaveBeenCalled();
  });

  it('delegates findOne', () => {
    controller.findOne('p-1');
    expect(patientService.findOne).toHaveBeenCalledWith('p-1');
  });

  it('delegates update', () => {
    const dto = { fullName: 'Ana' } as any;
    controller.update('p-1', dto, { id: 'u-1' } as any);

    expect(patientService.update).toHaveBeenCalledWith('p-1', dto, 'u-1');
  });

  it('delegates update cognitive evaluation', () => {
    const dto = { mmse: 15, moca: 16 } as any;
    controller.updateCoginitiveEvaluation('p-1', dto);

    expect(patientService.updateCognitiveEvaluation).toHaveBeenCalledWith(
      'p-1',
      dto,
    );
  });

  it('delegates remove', () => {
    controller.remove('p-1');
    expect(patientService.remove).toHaveBeenCalledWith('p-1');
  });
});
