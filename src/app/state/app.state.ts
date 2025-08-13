import { FileNode, User } from '../models/file-node.model';

export interface AppState {
  files: FileNode[];
  user: User;
}
