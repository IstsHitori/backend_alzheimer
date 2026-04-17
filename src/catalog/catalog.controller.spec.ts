import { CatalogController } from './catalog.controller';

describe('CatalogController', () => {
  let controller: CatalogController;
  let catalogService: {
    findAllEps: jest.Mock;
    findAllCum: jest.Mock;
    findCumBySearch: jest.Mock;
    findAllCIE10: jest.Mock;
    findCIE10BySearch: jest.Mock;
  };

  beforeEach(() => {
    catalogService = {
      findAllEps: jest.fn(),
      findAllCum: jest.fn(),
      findCumBySearch: jest.fn(),
      findAllCIE10: jest.fn(),
      findCIE10BySearch: jest.fn(),
    };

    controller = new CatalogController(catalogService as any);
  });

  it('delegates findAllEps', () => {
    controller.findAllEps();
    expect(catalogService.findAllEps).toHaveBeenCalled();
  });

  it('delegates findAllCum with params', () => {
    controller.findAllCum(10 as any, 20 as any);
    expect(catalogService.findAllCum).toHaveBeenCalledWith(10, 20);
  });

  it('delegates findCum search', () => {
    controller.findCum('acet');
    expect(catalogService.findCumBySearch).toHaveBeenCalledWith('acet');
  });

  it('delegates findAllCIE10', () => {
    controller.findAllCIE10();
    expect(catalogService.findAllCIE10).toHaveBeenCalled();
  });

  it('delegates findCIE10 search', () => {
    controller.findCIE10('g30');
    expect(catalogService.findCIE10BySearch).toHaveBeenCalledWith('g30');
  });
});
