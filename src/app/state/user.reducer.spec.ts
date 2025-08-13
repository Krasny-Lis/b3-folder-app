import { userReducer, initialUser } from './user.reducer';
import { setUser } from './user.actions';

describe('UserReducer', () => {
  it('should return the default state', () => {
    const state = userReducer(undefined, { type: '@@init' } as any);
    expect(state).toBe(initialUser);
  });

  it('should set new user', () => {
    const username = 'user2';
    const state = userReducer(initialUser, setUser({ user: username }));
    expect(state).toBe(username);
  });
});
