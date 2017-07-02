import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// libs
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

// app
import { LoggerService } from '../../backend/services/custom/logger.service';
import { SearchState } from '../../search/states';
import { SearchActions } from '../../search/actions';

@Component({
  moduleId: module.id,
  selector: 'search-detail',
  templateUrl: 'search-detail.component.html'
})
export class SearchDetailComponent implements AfterViewInit, OnInit {

  public detail: any;
  private _id: any;
  private _subs: Array<Subscription>;
  
  constructor(
    private _store: Store<any>,
    private _log: LoggerService,
    private _route: ActivatedRoute
  ) {
    this._subs = [];
  }  

  public showOptions() {
    this._log.info('show options!');
  }

  ngOnInit() {
    this._subs.push(this._store.select(s => s.search).subscribe((state: SearchState.IState) => {
      this.detail = state.selected;
    }));
    this._subs.push(this._route.params.subscribe(params => {
      this._id = params['id'];
      this._log.info('load detail for:', this._id);
      this._store.dispatch(new SearchActions.SelectAction(this._id));
    }));
    
  } 
  
  ngAfterViewInit() {

  }  


  ngOnDestroy() {
    for (let sub of this._subs) {
      sub.unsubscribe();
    }
  }
}