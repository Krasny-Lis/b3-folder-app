import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { FileTreeComponent } from './file-tree.component';
import { filesReducer } from '../state/file.reducer';
import { userReducer } from '../state/user.reducer';
import { addFile } from '../state/file.actions';
import * as idUtils from '../utils/id';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileNode } from '../models/file-node.model';

describe('FileTreeComponent', () => {
  beforeEach(async () => {
    spyOn(idUtils, 'generateId').and.returnValue('test-id');
    await TestBed.configureTestingModule({
      imports: [
        FileTreeComponent,
        StoreModule.forRoot({ files: filesReducer, user: userReducer }),
      ],
    }).compileComponents();
  });

  it('should display children count for folders', () => {
    const fixture = TestBed.createComponent(FileTreeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const rootFolder = compiled.querySelector('.row.folder .name');
    expect(rootFolder?.textContent).toContain('PROJEKTY (2)');
  });

  it('should preserve tree expansion state after data change', fakeAsync(() => {
    const fixture = TestBed.createComponent(FileTreeComponent);
    const store = TestBed.inject(Store);
    fixture.detectChanges();

    const folderRow = fixture.nativeElement.querySelector(
      '.row.folder'
    ) as HTMLElement;
    folderRow.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Klient ABC');

    store.dispatch(
      addFile({
        parentId: 'abc',
        id: 'new',
        name: 'file.txt',
        owner: 'admin',
      })
    );
    tick();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Klient ABC');
  }));

  it('should show dialog if file isnt uniq', () => {
    const fixture = TestBed.createComponent(FileTreeComponent);
    const component = fixture.componentInstance;
    const dialog = TestBed.inject(MatDialog);
    const snackBar = TestBed.inject(MatSnackBar);

    const folder: FileNode = {
      id: '1',
      name: 'folder',
      type: 'folder',
      owner: 'admin',
      children: [{ id: '2', name: 'file.txt', type: 'file', owner: 'admin' }],
    };

    spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of('file.txt'),
    } as any);

    spyOn(snackBar, 'open');

    component.onAddFile(folder);

    expect(snackBar.open).toHaveBeenCalledWith(
      'File with this name already exists in the folder.',
      'Close',
      { duration: 3000 }
    );
  });
});
