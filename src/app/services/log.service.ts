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

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    this.logs = [];
   }

   getLogs(): Observable<Log[]> {
     // check if local storage has stuff in it
     if (localStorage.getItem('logs') === null) {
      this.logs = [];
     } else {
       // takes logs from local storage
       this.logs = JSON.parse(localStorage.getItem('logs'));
     }
     return of (this.logs.sort((a, b) => {
       return b.date = a.date;
     }));
   }

   setFormLog(log: Log) {
      this.logSource.next(log);
   }

   addLog(log: Log) {
    this.logs.unshift(log);

    // add to local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
   }

   // deletes log and adds the updated log
   updateLog(log: Log) {
     this.logs.forEach((cur, index) => {
       if (log.id === cur.id) {
         this.logs.splice(index, 1);
       }
     });
     this.logs.unshift(log);

     // update locat storage
     localStorage.setItem('logs', JSON.stringify(this.logs));
   }

   // just deletes log
   deleteLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });

    // delete from local porage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState(log: Log) {
    this.stateSource.next(true);
  }
}
