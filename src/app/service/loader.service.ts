import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderState } from '../../common/loader';

@Injectable({
  providedIn: 'root'
})

/**
* Service to show spinner when any HTTP request is being made.
*/
export class LoaderService {
  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();

  constructor() { }

  show() {
    this.loaderSubject.next(<LoaderState>{ show: true });
  }

  hide() {
    this.loaderSubject.next(<LoaderState>{ show: false });
  }

}
