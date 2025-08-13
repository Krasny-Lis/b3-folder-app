import {
  Component,
  inject,
  DestroyRef,
  Renderer2,
  RendererFactory2,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatTreeNestedDataSource, MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ComponentType } from '@angular/cdk/portal';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { FileNode, User } from '../models/file-node.model';
import { AppState } from '../state/app.state';
import { addFile, deleteFile } from '../state/file.actions';
import { selectVisibleFiles } from '../state/file.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { selectUser } from '../state/user.selectors';
import { AddFileDialogComponent } from './add-file-dialog.component';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';
import { IdGeneratorService } from '../utils/id-gen.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-file-tree',
  standalone: true,
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
  ],
  templateUrl: './file-tree.component.html',
  styleUrl: './file-tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileTreeComponent {
  childrenAccessor: (node: FileNode) => FileNode[] = (node) =>
    node.children ?? [];
  dataSource = new MatTreeNestedDataSource<FileNode>();
  private readonly rendererFactory = inject(RendererFactory2);
  private readonly document = inject(DOCUMENT);
  private readonly renderer: Renderer2 = this.rendererFactory.createRenderer(
    null,
    null
  );

  files$: Observable<FileNode[]>;
  user$: Observable<User>;

  private expandedNodeIds = new Set<string>();
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private idGenerator: IdGeneratorService
  ) {
    this.files$ = this.store.select(selectVisibleFiles);
    this.user$ = this.store.select(selectUser);

    this.files$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((files) => {
      this.dataSource.data = files;
    });
  }

  hasChild = (_: number, node: FileNode) => node.type === 'folder';

  getChildrenCount(node: FileNode): number {
    return node.children ? node.children.length : 0;
  }

  private openDialog<T, R>(
    component: ComponentType<T>,
    handler: (result: R) => void
  ) {
    this.dialog
      .open<T, any, R>(component)
      .afterClosed()
      .subscribe((result) => handler(result as R));
  }

  onAddFile(folder: FileNode): void {
    this.openDialog(AddFileDialogComponent, (name: string) => {
      if (name) {
        const exists = folder.children?.some((child) => child.name === name);
        if (exists) {
          this.snackBar.open(
            'File with this name already exists in the folder.',
            'Close',
            {
              duration: 3000,
            }
          );
          return;
        }
        this.user$.pipe(take(1)).subscribe((user) => {
          this.store.dispatch(
            addFile({
              parentId: folder.id,
              id: this.idGenerator.generateId(),
              name,
              owner: user,
            })
          );
        });
      }
    });
  }

  isExpanded(node: FileNode): boolean {
    return this.expandedNodeIds.has(node.id);
  }

  toggleNode(node: FileNode): void {
    if (this.isExpanded(node)) {
      this.expandedNodeIds.delete(node.id);
    } else {
      this.expandedNodeIds.add(node.id);
    }
  }

  canModify(file: FileNode, user: User): boolean {
    return file.owner === user || user === 'admin';
  }

  onDelete(file: FileNode): void {
    this.openDialog(ConfirmDeleteDialogComponent, (result: boolean) => {
      if (result) {
        this.store.dispatch(deleteFile({ id: file.id }));
      }
    });
  }

  downloadText(content: string, fileName: string): void {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const anchor = this.renderer.createElement('a') as HTMLAnchorElement;
    this.renderer.setAttribute(anchor, 'href', url);
    this.renderer.setAttribute(anchor, 'download', fileName);
    this.renderer.appendChild(this.document.body, anchor);
    anchor.click();
    this.renderer.removeChild(this.document.body, anchor);
    URL.revokeObjectURL(url);
  }

  onDownload(file: FileNode): void {
    const content = `Przykładowy plik: ${file.name} (owner: ${file.owner})`;
    this.downloadText(content, file.name);
  }
}
