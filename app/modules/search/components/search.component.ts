import { Component, AfterViewInit, OnInit } from '@angular/core';

// libs
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

// nativescript
import { RouterExtensions } from 'nativescript-angular/router';

// app
import { moreIcon, backIcon } from '../../helpers';
import { LoggerService } from '../../backend/services/custom/logger.service';
import { SearchActions } from '../actions';

@Component({
  moduleId: module.id,
  selector: 'search',
  templateUrl: 'search.component.html'
})
export class SearchComponent implements AfterViewInit, OnInit {
  
  public searchState$: Observable<any>;
  public searchInput: string;
  
  constructor(
    private store: Store<any>,
    private router: RouterExtensions,
    private log: LoggerService
  ) { }

  public onClear() {
    this.searchInput = '';
    this.store.dispatch(new SearchActions.ClearAction());
  }

  public onSubmit() {
    this.store.dispatch(new SearchActions.SearchAction(this.searchInput));
  }
  
  ngOnInit() {
    this.searchState$ = this.store.select(s => s.search);
  }

  ngAfterViewInit() {

  }
}