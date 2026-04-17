import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;
  let userService: {
    create: jest.Mock;
    findAll: jest.Mock;
    findOne: jest.Mock;
    update: jest.Mock;
    remove: jest.Mock;
  };
  let cloudinaryService: {
    uploadFiles: jest.Mock;
  };

  beforeEach(() => {
    userService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    cloudinaryService = {
      uploadFiles: jest.fn(),
    };

    controller = new UserController(userService as any, cloudinaryService as any);
  });

  it('delegates create', () => {
    const dto = { userName: 'ana' } as any;
    controller.create(dto);
    expect(userService.create).toHaveBeenCalledWith(dto);
  });

  it('delegates findAll', () => {
    const user = { id: 'user-1' } as any;
    controller.findAll(user);
    expect(userService.findAll).toHaveBeenCalledWith(user);
  });

  it('delegates findOne', () => {
    controller.findOne('id-1');
    expect(userService.findOne).toHaveBeenCalledWith('id-1');
  });

  it('delegates update', () => {
    const dto = { name: 'Ana' } as any;
    controller.update('id-1', dto);
    expect(userService.update).toHaveBeenCalledWith('id-1', dto);
  });

  it('delegates remove', () => {
    controller.remove('id-1');
    expect(userService.remove).toHaveBeenCalledWith('id-1');
  });

  it('delegates uploadImage', () => {
    const files = [{ buffer: Buffer.from('a') }] as any;
    controller.uploadImage(files);
    expect(cloudinaryService.uploadFiles).toHaveBeenCalledWith(files);
  });
});
