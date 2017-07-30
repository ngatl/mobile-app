import { Component, AfterViewInit, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// nativescript
import { ModalDialogService } from 'nativescript-angular/directives/dialogs';
// libs
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

// app
import { LoggerService } from '../../../backend/services/custom/logger.service';
import { EventState } from '../../../events/states';
import { EventActions } from '../../../events/actions';
import { NSWebViewComponent } from '../../../shared/components/ns-webview/ns-webview.component';

@Component({
  moduleId: module.id,
  selector: 'event-detail',
  templateUrl: 'event-detail.component.html'
})
export class EventDetailComponent implements AfterViewInit, OnInit {

  public detail: any;
  private _id: any;
  private _subs: Array<Subscription>;
  
  constructor(
    private _store: Store<any>,
    private _log: LoggerService,
    private _route: ActivatedRoute,
    private _vcRef: ViewContainerRef,
    private _modal: ModalDialogService,
  ) {
    this._subs = [];
  }  

  ngOnInit() {
    this._subs.push(this._store.select(s => s.events).subscribe((state: EventState.IState) => {
      for (let key in this.detail) {
        this.detail = state.selected;
        console.log(key, this.detail[key]);
      }
    }));
    this._subs.push(this._route.params.subscribe(params => {
      this._id = params['id'];
      this._log.info('load detail for:', this._id);
      this._store.dispatch(new EventActions.SelectAction(this._id));
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