import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// nativescript
import { RouterExtensions } from 'nativescript-angular/router'; 

// app
import { DrawerService } from '../../../core/services/drawer.service';

@Component({
  moduleId: module.id,
  selector: 'action-bar',
  templateUrl: 'action-bar.component.html'
})
export class ActionBarComponent {
  @Input() title: string;

  constructor(
    private router: RouterExtensions,
    private drawer: DrawerService
  ) { }

  public toggleDrawer() {
    this.drawer.toggle();
  }

  public openSearch() {

  }
}