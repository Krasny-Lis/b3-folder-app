import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogBase } from './dialog-base';

@Component({
  selector: 'app-confirm-delete-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h1 mat-dialog-title>Usuń plik</h1>
    <div mat-dialog-content>Czy na pewno chcesz usunąć ten plik?</div>
    <div mat-dialog-actions>
      <button mat-button (click)="close(false)" data-test="cdd-cancel-button">
        Anuluj
      </button>
      <button
        mat-button
        color="warn"
        (click)="close(true)"
        data-test="cdd-delete-button"
      >
        Usuń
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDeleteDialogComponent extends DialogBase<
  ConfirmDeleteDialogComponent,
  boolean
> {
  constructor(dialogRef: MatDialogRef<ConfirmDeleteDialogComponent, boolean>) {
    super(dialogRef);
  }
}
