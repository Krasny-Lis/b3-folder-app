import { createReducer, on } from '@ngrx/store';
import { FileNode } from '../models/file-node.model';
import { addFile, deleteFile, resetFiles } from './file.actions';

export const initialFiles: FileNode[] = [
  {
    id: 'root',
    name: 'PROJEKTY',
    type: 'folder',
    children: [
      { id: 'dir_0', name: 'Klient ABC', type: 'folder', children: [] },
      {
        id: 'dir_1',
        name: 'Klient XYZ',
        type: 'folder',
        children: [
          {
            id: 'dir_2',
            name: '__COMMON',
            type: 'folder',
            children: [
              { id: 'file_0', name: 'logo.pdf', type: 'file', owner: 'admin' },
            ],
          },
          {
            id: 'file_1',
            name: 'XYZ_P001_202202 wizytowka',
            type: 'file',
            owner: 'user1',
          },
          {
            id: 'file_2',
            name: 'XYZ_P001_202205 plakat',
            type: 'file',
            owner: 'user2',
          },
          { id: 'dir_3', name: 'Links', type: 'folder', children: [] },
          { id: 'dir_4', name: 'Materials', type: 'folder', children: [] },
          { id: 'dir_5', name: 'Old', type: 'folder', children: [] },
          { id: 'dir_6', name: 'Out', type: 'folder', children: [] },
          {
            id: 'file_3',
            name: 'XYZ_P001_202205 plakat - v3.ai',
            type: 'file',
            owner: 'user1',
          },
        ],
      },
    ],
  },
];

function addFileToTree(
  nodes: FileNode[],
  parentId: string,
  file: FileNode
): FileNode[] {
  return nodes.map((node) => {
    if (node.id === parentId && node.type === 'folder') {
      const children = node.children ? [...node.children] : [];
      if (children.some((c) => c.name === file.name)) {
        return node;
      }
      return { ...node, children: [...children, file] };
    }
    if (node.children) {
      return {
        ...node,
        children: addFileToTree(node.children, parentId, file),
      };
    }
    return node;
  });
}

function deleteFileFromTree(nodes: FileNode[], id: string): FileNode[] {
  return nodes
    .filter((n) => n.id !== id)
    .map((n) =>
      n.children ? { ...n, children: deleteFileFromTree(n.children, id) } : n
    );
}

export const filesReducer = createReducer(
  initialFiles,
  on(addFile, (state, { parentId, id, name, owner }) => {
    const file: FileNode = { id, name, type: 'file', owner };
    return addFileToTree(state, parentId, file);
  }),
  on(deleteFile, (state, { id }) => deleteFileFromTree(state, id)),
  on(resetFiles, () => initialFiles)
);
