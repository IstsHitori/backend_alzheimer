import { ReportsController } from './reports.controller';

describe('ReportsController', () => {
  let controller: ReportsController;
  let reportsService: {
    create: jest.Mock;
    findAll: jest.Mock;
  };

  beforeEach(() => {
    reportsService = {
      create: jest.fn(),
      findAll: jest.fn(),
    };

    controller = new ReportsController(reportsService as any);
  });

  it('delegates create', () => {
    const dto = { name: 'R1', type: 'Reporte mensual' } as any;
    const user = { id: 'user-1' } as any;

    controller.create(dto, user);

    expect(reportsService.create).toHaveBeenCalledWith(dto, user);
  });

  it('delegates findAll', () => {
    controller.findAll();
    expect(reportsService.findAll).toHaveBeenCalled();
  });
});
