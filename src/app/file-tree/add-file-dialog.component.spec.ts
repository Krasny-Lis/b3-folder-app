import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddFileDialogComponent } from './add-file-dialog.component';

describe('AddFileDialogComponent', () => {
  let dialog: MatDialog;
  let overlay: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, NoopAnimationsModule, AddFileDialogComponent],
    }).compileComponents();

    dialog = TestBed.inject(MatDialog);
    overlay = TestBed.inject(OverlayContainer);
    overlayContainerElement = overlay.getContainerElement();
  });

  afterEach(() => {
    overlay.ngOnDestroy();
  });

  it('should close on cancel', fakeAsync(() => {
    const dialogRef = dialog.open(AddFileDialogComponent);
    let result: unknown;
    dialogRef.afterClosed().subscribe((r) => (result = r));

    tick();

    const cancelButton = overlayContainerElement.querySelector(
      '[data-test="afd-cancel-button"]'
    ) as HTMLButtonElement;
    cancelButton.click();
    tick();

    expect(result).toBeUndefined();
  }));

  it('should close after save', fakeAsync(() => {
    const dialogRef = dialog.open(AddFileDialogComponent);
    let result: unknown;
    dialogRef.afterClosed().subscribe((r) => (result = r));

    tick();

    const input = overlayContainerElement.querySelector(
      'input'
    ) as HTMLInputElement;
    input.value = 'newfile.txt';
    input.dispatchEvent(new Event('input'));
    tick();

    const saveButton = overlayContainerElement.querySelector(
      '[data-test="afd-save-button"]'
    ) as HTMLButtonElement;
    saveButton.click();
    tick();

    expect(result).toBe('newfile.txt');
  }));
});
