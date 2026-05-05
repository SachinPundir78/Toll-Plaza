import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';

import { App } from './app';
import { TollLog } from './models/toll-log.model';
import { TollLogService } from './services/toll-log.service';

function tollLogServiceStub(): TollLogService {
  return {
    getLogs: () =>
      new Observable<TollLog[]>((subscriber) => {
        setTimeout(() => {
          subscriber.next([]);
          subscriber.complete();
        }, 0);
      }),
    createLog: () => new Observable(),
    updateLog: () => new Observable(),
    deleteLog: () => new Observable(),
  } as unknown as TollLogService;
}

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: TollLogService, useFactory: tollLogServiceStub }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render dashboard title', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Toll Plaza Dashboard');
  });
});
