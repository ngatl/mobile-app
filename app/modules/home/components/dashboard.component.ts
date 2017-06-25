import { Component, AfterViewInit, OnInit, NgZone, ViewChild, ElementRef, ViewContainerRef, OnDestroy } from '@angular/core';

// libs
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

// Draawer Service
import { DrawerService } from '../../core/services/drawer.service';

// nativescript

// app

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit, OnInit, OnDestroy {

  constructor(
    private store: Store<any>,
	private drawer: DrawerService
  ) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {

  }
}