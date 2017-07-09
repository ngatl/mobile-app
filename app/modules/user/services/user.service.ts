import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';

// libs
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
// app
import { SystemUser } from '../../backend/models';
import { LoggerService } from '../../backend/services/custom/logger.service';
import { Cache, StorageKeys, TNSStorageService } from '../../core/services/tns-storage.service';
import { WindowService } from '../../core/services/window.service';
import { UserState } from '../states/user.state';

@Injectable()
export class UserService extends Cache {

    /**
     * subscribe to this to customize app behavior
     * whenever an unauthorized attempt to a route is made
     * For example, route app somewhere specific, show dialog, etc.
     */
    public unauthorizedRouteAttempt: Subject<string> = new Subject();
    // for quick access in other api calls
    private _currentUserId: string;

    constructor(
        private _store: Store<any>,
        private _log: LoggerService,
        private _httpService: Http,
        private _storageService: TNSStorageService,
        private _win: WindowService,
    ) {
        super(_storageService);
        this.isObjectCache = true;
        this.key = StorageKeys.USER;

        _store.select('user').subscribe((userState: UserState.IState) => {
            if ( userState.current ) {
                this.currentUserId = userState.current.id;
            } else {
                this.currentUserId = null;
            }
        });
    }

    public get currentUserId() {
        return this._currentUserId;
    }

    public set currentUserId(id: any) {
        this._currentUserId = id ? id.toString() : null;
    }

    public setUnauthorizedRoute(url: string) {
        this.setRedirectToAfterLoginUrl(url);
        this.unauthorizedRouteAttempt.next(url);
    }

    public setRedirectToAfterLoginUrl(url: string) {
        this._storageService.set(StorageKeys.REDIRECT_AFTER_LOGIN, { url });
    }

}
