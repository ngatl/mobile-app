import { Injectable } from '@angular/core';
import { Route, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanLoad } from '@angular/router';

// libs
import { Store } from '@ngrx/store';

// app
import { UserState } from '../states';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private _store: Store<any>,
        private _userService: UserService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this._store.select(s => s.user)
                .take(1)
                .subscribe((state: UserState.IState) => {
                    if (state.current) {
                        // user is authenticated
                        resolve(true);
                    } else {

                        if (routerState) {
                            // pass along url that was being attempted
                            this._userService.setUnauthorizedRoute(routerState.url);
                        }

                        resolve(false);
                    }
                });
        })
    }

    canLoad(route: Route): Promise<boolean> {
        // reuse same logic to activate
        return this.canActivate(null, null);
    }
}
