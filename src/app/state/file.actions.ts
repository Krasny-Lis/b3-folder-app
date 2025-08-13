import { createAction, props } from '@ngrx/store';
import { User } from '../models/file-node.model';

export const addFile = createAction(
  '[Files] Add File',
  props<{ parentId: string; id: string; name: string; owner: User }>()
);

export const deleteFile = createAction(
  '[Files] Delete File',
  props<{ id: string }>()
);

export const resetFiles = createAction('[Files] Reset Files');
