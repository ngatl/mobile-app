// angular
import { Component, Input, Output, EventEmitter } from '@angular/core';

// nativescript
import { RouterExtensions } from 'nativescript-angular/router'; 

// app
import { moreIcon, backIcon } from '../../../../helpers';

@Component({
  moduleId: module.id,
  selector: 'action-bar-back',
  templateUrl: 'action-bar-back.component.html'
})
export class ActionBarBackComponent {

  @Input() title: string;
  @Input() backIcon: string;
  @Input() showMoreIcon: boolean;
  @Output() rightButtonTap: EventEmitter<any> = new EventEmitter();

  public moreIcon: string;

  constructor(
    private router: RouterExtensions
  ) { }

  ngOnInit() {
    if (!this.backIcon) {
      this.backIcon = backIcon();
    }
    this.moreIcon = moreIcon();
  }

  public back() {
    this.router.back();
  }
}
