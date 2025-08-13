import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';

describe('ConfirmDeleteDialogComponent', () => {
  let dialog: MatDialog;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        NoopAnimationsModule,
        ConfirmDeleteDialogComponent,
      ],
    }).compileComponents();

    dialog = TestBed.inject(MatDialog);
    overlayContainer = TestBed.inject(OverlayContainer);
    overlayContainerElement = overlayContainer.getContainerElement();
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should close with false when cancel is clicked', (done) => {
    const dialogRef = dialog.open(ConfirmDeleteDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      expect(result).toBeFalse();
      done();
    });

    const cancelButton = overlayContainerElement.querySelector(
      'button'
    ) as HTMLButtonElement;
    cancelButton.click();
  });

  it('should close with true when delete is clicked', (done) => {
    const dialogRef = dialog.open(ConfirmDeleteDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });

    const buttons = overlayContainerElement.querySelectorAll('button');
    const deleteButton = buttons[1] as HTMLButtonElement;
    deleteButton.click();
  });
});
