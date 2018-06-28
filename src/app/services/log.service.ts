import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { Log } from '../models/Log';

@Injectable({providedIn: 'root'})
export class LogService {
  logs: Log[];

  private logSource = new BehaviorSubject<Log>({id: null, text: null, date: null});
  selectedLog = this.logSource.asObservable();

  constructor() {
    this.logs = [
      {id: '1', text: 'Generated Components', date: new Date ('06/03/2018 12:12:22')},
      {id: '2', text: 'Added Something', date: new Date ('06/04/2018 8:12:22')},
      {id: '3', text: 'Something Components', date: new Date ('06/22/2018 6:12:22')}
    ];
   }

   getLogs(): Observable<Log[]> {
     return of (this.logs);
   }

   setFormLog(log: Log) {
      this.logSource.next(log);
   }
}
