import { filesReducer, initialFiles } from './file.reducer';
import { addFile, deleteFile, resetFiles } from './file.actions';
import { FileNode } from '../models/file-node.model';

function createTestAddFileAction(id: string = 'test', name = 'test.txt') {
  return addFile({ parentId: 'root', id, name, owner: 'user1' });
}

const nestedState: FileNode[] = [
  {
    id: 'root',
    name: 'ROOT',
    type: 'folder',
    children: [
      {
        id: 'level1',
        name: 'Level 1',
        type: 'folder',
        children: [
          {
            id: 'level2',
            name: 'Level 2',
            type: 'folder',
            children: [
              { id: 'level3', name: 'Level 3', type: 'folder', children: [] },
            ],
          },
        ],
      },
    ],
  },
];

describe('FilesReducer', () => {
  it('should add file to root', () => {
    const state = filesReducer(initialFiles, createTestAddFileAction());
    const root = state[0];
    expect(root.children?.some((c) => c.id === 'test')).toBeTrue();
  });

  it('should delete file', () => {
    const added = filesReducer(initialFiles, createTestAddFileAction());
    const removed = filesReducer(added, deleteFile({ id: 'test' }));
    const root = removed[0];
    expect(root.children?.some((c) => c.id === 'test')).toBeFalse();
  });
  it('should add file in lower folder', () => {
    const added = filesReducer(
      nestedState,
      addFile({
        parentId: 'level3',
        id: 'testFile',
        name: 'test_fle.txt',
        owner: 'user1',
      })
    );
    const level3 = added[0].children
      ?.find((c) => c.id === 'level1')
      ?.children?.find((c) => c.id === 'level2')
      ?.children?.find((c) => c.id === 'level3');
    expect(level3?.children?.some((c) => c.id === 'testFile')).toBeTrue();
  });

  it('should delete file from lower folder', () => {
    const withFile = filesReducer(
      nestedState,
      addFile({
        parentId: 'level3',
        id: 'testFile',
        name: 'test_file.txt',
        owner: 'user1',
      })
    );
    const removed = filesReducer(withFile, deleteFile({ id: 'testFile' }));
    const level3 = removed[0].children
      ?.find((c) => c.id === 'level1')
      ?.children?.find((c) => c.id === 'level2')
      ?.children?.find((c) => c.id === 'level3');
    expect(level3?.children?.some((c) => c.id === 'testFile')).toBeFalse();
  });

  it('should not add file if file with the same name already exists in the folder', () => {
    const first = filesReducer(
      initialFiles,
      createTestAddFileAction('first', 'duplicate.txt')
    );
    const second = filesReducer(
      first,
      createTestAddFileAction('second', 'duplicate.txt')
    );
    const root = second[0];
    const count =
      root.children?.filter((c) => c.name === 'duplicate.txt').length || 0;
    expect(count).toBe(1);
  });

  it('should reset files to initial state', () => {
    const modified = filesReducer(
      initialFiles,
      createTestAddFileAction('temp', 'temp.txt')
    );
    const reset = filesReducer(modified, resetFiles());
    expect(reset).toEqual(initialFiles);
  });
});
