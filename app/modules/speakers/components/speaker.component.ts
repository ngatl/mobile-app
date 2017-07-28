import { Component, AfterViewInit, OnInit } from '@angular/core';

// libs
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

// app
import { LoggerService } from '../../backend/services/custom/logger.service';
import { SpeakerActions } from '../actions';

@Component({
  moduleId: module.id,
  selector: 'speaker',
  templateUrl: 'speaker.component.html'
})
export class SpeakerComponent implements AfterViewInit, OnInit {
  
  public speakerState$: Observable<any>;

  constructor(
    private store: Store<any>,
    private log: LoggerService
  ) { }
  
  ngOnInit() {
    this.speakerState$ = this.store.select(s => s.speakers);
  }



  ngAfterViewInit() {

  }
}