import { Component, OnInit } from '@angular/core';

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
  selector: 'search-action-bar',
  templateUrl: 'search-action-bar.component.html'
})
export class SearchActionBarComponent implements OnInit {
  public searchInput: string;
  public backIcon: string;
  public moreIcon: string;

  constructor(
    private store: Store<any>,
    private router: RouterExtensions,
    private log: LoggerService
  ) { }

  public back() {
    this.router.back();
  }

  public more() {
    this.log.info('more!');
  }

  public onClear() {
    this.searchInput = '';
    this.store.dispatch(new SearchActions.ClearAction());
  }

  public onSubmit() {
    this.store.dispatch(new SearchActions.SearchAction(this.searchInput));
  }
  
  ngOnInit() {
    this.backIcon = backIcon();
    this.moreIcon = moreIcon();
  }
}