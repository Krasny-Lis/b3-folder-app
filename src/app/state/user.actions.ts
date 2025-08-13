import { createAction, props } from '@ngrx/store';
import { User } from '../models/file-node.model';

export const setUser = createAction('[User] Set', props<{ user: User }>());
