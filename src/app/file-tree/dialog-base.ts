import { MatDialogRef } from '@angular/material/dialog';

export abstract class DialogBase<T, R = any> {
  protected constructor(protected dialogRef: MatDialogRef<T, R>) {}

  close(result?: R): void {
    this.dialogRef.close(result);
  }
}
