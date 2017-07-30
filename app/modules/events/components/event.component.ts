import { Component, AfterViewInit, OnInit } from '@angular/core';

// libs
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

// app
import { LoggerService } from '../../backend/services/custom/logger.service';
import { EventActions } from '../actions';

@Component({
  moduleId: module.id,
  selector: 'event',
  templateUrl: 'event.component.html'
})
export class EventComponent implements AfterViewInit, OnInit {
  
  public eventState$: Observable<any>;

  constructor(
    private store: Store<any>,
    private log: LoggerService
  ) { }
  
  ngOnInit() {
    this.eventState$ = this.store.select(s => s.events);
  }



  ngAfterViewInit() {

  }
}