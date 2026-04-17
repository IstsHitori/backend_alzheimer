import { AnalysisController } from './analysis.controller';

describe('AnalysisController', () => {
  let controller: AnalysisController;
  let analysisService: {
    create: jest.Mock;
    findAll: jest.Mock;
    findOne: jest.Mock;
    findAnalysiesByPatient: jest.Mock;
    remove: jest.Mock;
  };

  beforeEach(() => {
    analysisService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      findAnalysiesByPatient: jest.fn(),
      remove: jest.fn(),
    };

    controller = new AnalysisController(analysisService as any);
  });

  it('delegates create with user id', () => {
    const dto = { patientId: 'p-1', imageAnalysis: [] } as any;
    const user = { id: 'u-1' } as any;

    controller.create(dto, user);

    expect(analysisService.create).toHaveBeenCalledWith(dto, 'u-1');
  });

  it('delegates findAll', () => {
    controller.findAll();
    expect(analysisService.findAll).toHaveBeenCalled();
  });

  it('delegates findOne', () => {
    controller.findOne(10);
    expect(analysisService.findOne).toHaveBeenCalledWith(10);
  });

  it('delegates findOneByPatientId', () => {
    controller.findOneByPatientId('p-1');
    expect(analysisService.findAnalysiesByPatient).toHaveBeenCalledWith('p-1');
  });

  it('delegates remove', () => {
    controller.remove(10);
    expect(analysisService.remove).toHaveBeenCalledWith(10);
  });
});
