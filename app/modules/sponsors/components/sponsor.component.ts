import { Component, AfterViewInit, OnInit } from '@angular/core';

// libs
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

// app
import { LoggerService } from '../../backend/services/custom/logger.service';
import { SponsorActions } from '../actions';

@Component({
  moduleId: module.id,
  selector: 'sponsor',
  templateUrl: 'sponsor.component.html'
})
export class SponsorComponent implements AfterViewInit, OnInit {
  
  public sponsorState$: Observable<any>;

  constructor(
    private store: Store<any>,
    private log: LoggerService
  ) { }
  
  ngOnInit() {
    this.sponsorState$ = this.store.select(s => s.sponsors);
  }



  ngAfterViewInit() {

  }
}