import { filesReducer, initialFiles } from './file.reducer';
import { addFile, deleteFile, resetFiles } from './file.actions';

function createTestAddFileAction(id: string = 'test', name = 'test.txt') {
  return addFile({ parentId: 'root', id, name, owner: 'user1' });
}

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
