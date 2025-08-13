import { TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { FileTreeComponent } from './file-tree.component';
import { filesReducer } from '../state/file.reducer';
import { userReducer } from '../state/user.reducer';
import { addFile } from '../state/file.actions';

describe('FileTreeComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FileTreeComponent,
        StoreModule.forRoot({ files: filesReducer, user: userReducer }),
      ],
    }).compileComponents();
  }));

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
        parentId: 'dir_0',
        id: 'new',
        name: 'file.txt',
        owner: 'admin',
      })
    );
    tick();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Klient ABC');
  }));
});
