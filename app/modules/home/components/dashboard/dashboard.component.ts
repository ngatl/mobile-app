import { Component, AfterViewInit, OnInit, NgZone, ViewChild, ElementRef, ViewContainerRef, OnDestroy } from '@angular/core';

// libs
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

// nativescript

// app
import { UserActions } from '../../../user/actions';

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit, OnInit, OnDestroy {

  public user: any;

  constructor(
    private _store: Store<any>,
  ) {

  }

  public login() {
    this._store.dispatch(new UserActions.LoginAction(this.user));
  }

  public create() {
    this._store.dispatch(new UserActions.CreateAction(this.user));
  }

  ngOnInit() {
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {

  }
}