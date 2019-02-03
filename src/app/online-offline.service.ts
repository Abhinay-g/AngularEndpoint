import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
declare const window: any;
@Injectable({
  providedIn: 'root'
})
export class OnlineOfflineService {
  test = 0;
  private readonly internalConnectionChanged = new Subject<any>();
  get connectionChanged() {
    return this.internalConnectionChanged.asObservable();
  }

  get isOnline() {
    return !!window.navigator.onLine;
  }

  constructor() {
    window.addEventListener('online', () => this.setConnectionStatus());
    window.addEventListener('offline', () => this.setConnectionStatus());
  }

  setConnectionStatus() {
    this.test += 1;
    this.internalConnectionChanged.next(window.navigator.onLine);
  }
}
