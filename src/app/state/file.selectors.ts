import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';
import { FileNode, User } from '../models/file-node.model';
import { selectUser } from './user.selectors';

export const selectFiles = (state: AppState) => state.files;

export const selectVisibleFiles = createSelector(
  selectFiles,
  selectUser,
  (files, user) => filterNodes(files, user)
);

function filterNodes(nodes: FileNode[], user: User): FileNode[] {
  return nodes
    .map((node) => {
      if (node.type === 'file') {
        if (user === 'admin') {
          return { ...node };
        }
        return node.owner === 'admin' || node.owner === user
          ? { ...node }
          : null;
      }
      const children = node.children ? filterNodes(node.children, user) : [];
      return { ...node, children };
    })
    .filter((n): n is FileNode => n !== null);
}
