import { createReducer, on } from '@ngrx/store';
import { setUser } from './user.actions';
import { User } from '../models/file-node.model';

export const initialUser: User = 'user1';

export const userReducer = createReducer<User>(
  initialUser,
  on(setUser, (_, { user }) => user)
);
