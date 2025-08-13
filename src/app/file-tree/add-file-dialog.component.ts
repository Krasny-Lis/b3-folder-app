import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DialogBase } from './dialog-base';

@Component({
  selector: 'app-add-file-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  template: `
    <h1 mat-dialog-title>Utwórz</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <mat-label>Nazwa pliku</mat-label>
        <input matInput [(ngModel)]="name" placeholder="plik.ext" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="close()">Anuluj</button>
      <button mat-button (click)="save()">Potwierdź</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFileDialogComponent extends DialogBase<
  AddFileDialogComponent,
  string
> {
  name = '';
  constructor(dialogRef: MatDialogRef<AddFileDialogComponent, string>) {
    super(dialogRef);
  }
  save(): void {
    this.close(this.name);
  }
}
