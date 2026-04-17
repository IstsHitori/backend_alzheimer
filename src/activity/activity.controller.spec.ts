import { ActivityController } from './activity.controller';

describe('ActivityController', () => {
  it('delegates findAll to service', () => {
    const activityService = {
      findAll: jest.fn().mockResolvedValue([]),
    };
    const controller = new ActivityController(activityService as any);

    controller.findAll(5 as any, 10 as any);

    expect(activityService.findAll).toHaveBeenCalledWith(5, 10);
  });
});
