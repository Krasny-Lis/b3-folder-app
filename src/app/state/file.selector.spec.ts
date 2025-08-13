import { selectVisibleFiles } from './file.selectors';
import { initialFiles } from './file.reducer';
import { AppState } from './app.state';

describe('SelectVisibleFiles', () => {
  it('should return all files for admin', () => {
    const state: AppState = { files: initialFiles, user: 'admin' };
    const result = selectVisibleFiles(state);
    expect(result).toEqual(initialFiles);
  });

  it('should return only owned or admin files for user', () => {
    const state: AppState = { files: initialFiles, user: 'user1' };
    const result = selectVisibleFiles(state);

    const root = result[0];
    const xyz = root.children?.find((n) => n.id === 'dir_1');
    const ids = xyz?.children?.map((c) => c.id) || [];
    expect(ids).toContain('file_1');
    expect(ids).toContain('file_3');
    expect(ids).not.toContain('file_5');

    const common = xyz?.children?.find((n) => n.id === 'dir_2');
    const commonIds = common?.children?.map((c) => c.id) || [];
    expect(commonIds).toContain('file_0');
  });
});
