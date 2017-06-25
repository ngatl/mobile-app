import { Component, ViewChild, ViewContainerRef, ElementRef, AfterViewInit, ChangeDetectorRef, Inject, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

// libs
import { Store } from '@ngrx/store';

// nativescript
import { Page } from 'tns-core-modules/ui/page';
import { RadSideDrawerComponent } from 'nativescript-telerik-ui/sidedrawer/angular';
import { PushTransition, DrawerTransitionBase, SlideInOnTopTransition } from 'nativescript-telerik-ui/sidedrawer';

// app
import { DrawerService } from '../../core/services/drawer.service';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.component.html'
})
export class HomeComponent implements AfterViewInit, OnInit {

  @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;

  private _sideDrawerTransition: DrawerTransitionBase;

  constructor(
    @Inject(Page) private page: Page,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private store: Store<any>,
    public drawerService: DrawerService
  ) {
    // this.page.on('loaded', this.onLoaded, this);
    this._sideDrawerTransition = new SlideInOnTopTransition();
  }

  public get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  // public onLoaded(args) {
  // }

  public logout() {
    this.drawerService.toggle(false);

  }

  ngOnInit() {
    // this.log.debug(`HomeComponent ngOnInit`);

    // react to user state
    // this.store.select((s: IAppState) => s.auth).subscribe((state: IAuthState) => {
    //   this.user = state.user;
    // });

    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.drawerService.toggle(false);
      }
    });
  }

  ngAfterViewInit() {
    // this.log.debug(`HomeComponent ngAfterViewInit`);
    this.drawerService.drawer = this.drawerComponent.sideDrawer;
    this.cdRef.detectChanges();
  }
}

