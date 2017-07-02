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

    public socialConnect(firebaseToken: string) {
        return Observable.of({});//this._apiUsers.linkAuthFirebase(JSON.stringify({ firebaseToken }));
    }

    public createUser(user: any) {
        return Observable.of(new SystemUser(user));//this._apiUsers.createUsers(user);
    }

    public emailConnect(username: string,
        password: string) {
        const token = JSON.stringify({
            email: username,
            password: password,
        });
        return Observable.of({});//this._httpService.post(`${this._pnpApiBasePathToken}tokens`, token);
    }

    public getCurrentUser(): Observable<SystemUser> {
        let storedUser = this.cache;
        // if (storedUser && isTokenExpired(this._storageService)) {
        //     this.clear();
        //     storedUser = null; // resetting
        // } else if (!isTokenExpired(this._storageService) && !storedUser) {
        //     return this.loadUser();
        // }

        return Observable.of(storedUser ? new SystemUser(storedUser) : null);
    }

    public isAuthenticated(): boolean {
        return false;//!isTokenExpired(this._storageService);
    }

    public setUnauthorizedRoute(url: string) {
        this.setRedirectToAfterLoginUrl(url);
        this.unauthorizedRouteAttempt.next(url);
    }

    public setRedirectToAfterLoginUrl(url: string) {
        this._storageService.set(StorageKeys.REDIRECT_AFTER_LOGIN, { url });
    }

    public getRedirectToAfterLoginUrl(): string {
        const storedRedirect = this._storageService.get(StorageKeys.REDIRECT_AFTER_LOGIN);
        return storedRedirect ? storedRedirect.url : null;
    }

    public emailIsAvailable(email: string): Observable<any> {
        return this._httpService.get(`api/3.0/users?username=${email.replace(/\+/g, '%2B')}`)
            .map((response: any) => {
                if (response && response._body) {
                    const data = response.json();
                    if (data) {
                        if (data instanceof Array) {
                            return data;
                        } else if (data.id && data.username) {
                            return [data];
                        }
                    }
                }
                return new Error('Invalid response data');
            });
    }

    public forgotPasswordRequest(email: string) {
        return Observable.of(0);//this._apiUsers.updatePassword(JSON.stringify({ email }));
    }

    public updateUser(user: any) {
        return Observable.of(new SystemUser(user));//this._apiUsers.updateUser(user.id.toString(), user);
    }

    public deleteUser(id: string) {
        return Observable.of(0);//this._apiUsers.deleteUser(id);
    }

    /**
     * Load user object and cache it (aka persist in browser/mobile device)
     * @param token authenticated token
     */
    public loadUser(token?: string): Observable<SystemUser> {
        // token = token || this._getStoredToken();
        // if (token) {
        //     const decodedToken = jwtHelper.decodeToken(token);
        //     if (decodedToken) {
        //         const id: string = decodedToken.id;
        //         if (id) {
        //             return this._apiUsers.getUser(id)
        //                 .map((user: User) => {
        //                     /**
        //                      * NOTE: Get user doesn't return the authenticationToken,
        //                      * so we need to add it manually.
        //                      */
        //                     user.authenticationToken = token;
        //                     return user;
        //                 });
        //         }
        //     }
        // }
        // no token, no user
        return Observable.of(null);
    }

    public persistUser(user: SystemUser) {
        // persist user
        this.cache = user;
    }

    public set token(value: string) {
        // persist token
        if (value) {
            this._storageService.set(StorageKeys.TOKEN, { token: value });
        }
    }

    public get token(): string {
        const value = this._storageService.get(StorageKeys.TOKEN);
        if (value && value.token) {
            return value.token;
        }
        return null;
    }

    public removeToken() {
        this._storageService.remove(StorageKeys.TOKEN);
    }

    public alertErrorMessage(err: any) {
        err = typeof err === 'string' ? err : err.json();
        this._log.log(err);
        // TODO: fallback message needs to com from localized strings
        this._win.alert(err.message ? err.message : 'An error occurred, please try again.');
    }

    private _getStoredToken(): string {
        const storedUser = this.cache;
        if (storedUser) {
            return storedUser.authenticationToken;
        }
        return '';
    }
}
