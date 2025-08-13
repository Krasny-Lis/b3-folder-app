export type User = 'admin' | 'user1' | 'user2';

export interface FileNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  owner?: User;
  children?: FileNode[];
}
