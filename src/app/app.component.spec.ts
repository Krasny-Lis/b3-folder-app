import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { filesReducer } from './state/file.reducer';
import { userReducer } from './state/user.reducer';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        StoreModule.forRoot({ files: filesReducer, user: userReducer }),
      ],
    }).compileComponents();
    localStorage.clear();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render header', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'File Structure'
    );
  });

  it('should use trackByUser when rendering users', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    const spy = spyOn(component, 'trackByUser').and.callThrough();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});
