import { User } from './user.entity';

describe('User entity hooks', () => {
  it('normalizes email on insert', () => {
    const user = new User();
    user.email = '  TEST@MAIL.COM  ';

    user.checkFieldsBeforeInsert();

    expect(user.email).toBe('test@mail.com');
  });

  it('normalizes email on update', () => {
    const user = new User();
    user.email = '  Another@MAIL.COM  ';

    user.checkFieldsBeforeUpdate();

    expect(user.email).toBe('another@mail.com');
  });
});
