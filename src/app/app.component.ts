import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { setUser } from './state/user.actions';
import { FileTreeComponent } from './file-tree/file-tree.component';
import { User } from './models/file-node.model';
import { resetFiles } from './state/file.actions';

@Component({
  selector: 'app-root',
  imports: [FileTreeComponent, NgFor, FormsModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  users: User[] = ['admin', 'user1', 'user2'];
  selectedUser!: User;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    const savedUser = localStorage.getItem('user') as User | null;
    if (savedUser) {
      this.store.dispatch(setUser({ user: savedUser }));
      this.selectedUser = savedUser;
    } else {
      const user = this.users[Math.floor(Math.random() * this.users.length)];
      this.store.dispatch(setUser({ user }));
      localStorage.setItem('user', user);
      this.selectedUser = user;
    }
  }

  onReset(): void {
    this.store.dispatch(resetFiles());
  }

  onUserChange(user: User): void {
    this.store.dispatch(setUser({ user }));
    localStorage.setItem('user', user);
  }

  trackByUser(index: number, user: User): string {
    return user;
  }
}
