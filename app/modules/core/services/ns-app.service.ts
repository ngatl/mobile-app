/**
 * NativeScript app services
 */
import { Inject, Injectable, ViewContainerRef, NgZone } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

// nativescript
import { RouterExtensions } from 'nativescript-angular/router';
import * as TNSApplication from 'tns-core-modules/application';
import * as TNSUtils from 'tns-core-modules/utils/utils';
import { DeviceOrientation } from 'tns-core-modules/ui/enums';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import { isIOS, device } from 'tns-core-modules/platform';
import { ModalDialogService } from 'nativescript-angular/directives/dialogs';

// libs
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

// app
import { NSWebViewComponent } from '../../shared/components/ns-webview/ns-webview.component';
import { ProgressIndicatorActions } from '../actions';
import { ProgressService } from './progress.service';
import { WindowService } from './window.service';

export interface IOpenWebViewOptions {
    vcRef: ViewContainerRef;
    context?: any;
}

@Injectable()
export class NSAppService {

    private _appVersion: string;

    // Auth helpers
    private _isPasswordLogin: boolean;
    private _unauthorizedRouteAttempt: string;
    private _authGuardSub: Subscription;
    private _routerEventSub: Subscription;

    // orientation helper
    private _orientation: string;
    private _orientation$: Subject<any> = new Subject();
    private _deviceType: 'Phone' | 'Tablet';

    constructor(
        private _store: Store<any>,
        private _fonticon: TNSFontIconService, // DO NOT REMOVE
        private _router: RouterExtensions,
        private _ngRouter: Router,
        private _ngZone: NgZone,
        private _win: WindowService,
        private _progressService: ProgressService,
        private _modal: ModalDialogService,
    ) {
        // TNSFontIconService - injected to construct it once for entire app

        // initialize core services
        this._initAppVersion();
        this._initOrientationHandler();
        this._initAppEvents();
    }

    public set isPasswordLogin(value: boolean) {
        this._isPasswordLogin = value;
    }

    public get isPasswordLogin() {
        return this._isPasswordLogin;
    }

    public get orientation() {
        return this._orientation;
    }

    public set orientation(value) {
        this._orientation = value;
        this.orientation$.next(value);
    }

    public get orientation$() {
        return this._orientation$;
    }

    public get deviceType() {
        return this._deviceType;
    }

    public get appVersion() {
        return this._appVersion;
    }

    /**
     * Navigate back with an optional delay before firing
     * @param delay number
     */
    public navigateBack(delay?: number, backToPrevious?: boolean) {
        const navBack = () => {
            if (backToPrevious) {
                this._router.backToPreviousPage();
            } else {
                this._router.back();
            }
        };

        if (delay) {
            this._win.setTimeout(() => {
                navBack();
            }, delay);
        } else {
            navBack();
        }
    }

    /**
     * Open a webview modal passing along url and optionally a title as the context
     * @param options IOpenWebViewOptions
     */
    public openWebView(options: IOpenWebViewOptions) {
        this._store.dispatch(new ProgressIndicatorActions.ShowAction({
            page: {
                enabled: true,
                message: 'Loading...'
            }
        }));
        this._modal.showModal(NSWebViewComponent, {
            viewContainerRef: options.vcRef,
            context: options.context
        })
    }

    /**
     * Show or hide progress indicator
     * @param enable boolean
     */
    public toggleSpinner(enable?: boolean, details?: { message?: string; progress?: number }) {
        // wrapped inside NgZone since {N} 3rd party integrations may leave the zone
        this._ngZone.run(() => {
            this._progressService.toggleSpinner(enable, details);
        });
    }

    private _initAppVersion() {
        let versionName: string;
        let buildNumber: string;
        if ( TNSApplication.android ) {
            const pi = TNSApplication.android.context.getPackageManager()
                .getPackageInfo(TNSApplication.android.context.getPackageName(), 0);
            versionName = pi.versionName;
            buildNumber = pi.versionCode.toString();
        } else if ( TNSApplication.ios ) {
            versionName = NSBundle.mainBundle.objectForInfoDictionaryKey('CFBundleShortVersionString');
            buildNumber = NSBundle.mainBundle.objectForInfoDictionaryKey('CFBundleVersion');
        }
        this._appVersion = `v${versionName} (${buildNumber})`;
    }

    private _initAppEvents() {
        // For the future - may want to use these
        TNSApplication.on(TNSApplication.resumeEvent, () => {
            console.log(`TNSApplication.resumeEvent`);
        });
        TNSApplication.on(TNSApplication.suspendEvent, () => {
            console.log(`TNSApplication.suspendEvent`);
        });
    }

    private _initOrientationHandler() {
        console.log('initializing orientation handling.');
        this._deviceType = device.deviceType;

        // set initial orientation
        this.orientation = getOrientation();

        // handle orientation changes
        TNSApplication.on(TNSApplication.orientationChangedEvent, (e) => {
            console.log(`Old: ${this.orientation}; New: ${e.newValue}`);
            this._ngZone.run(() => {
                this.orientation = getOrientation();
                // this.cdRef.detectChanges();
            });
        });
    }
}

const getOrientation = function () {
    if (isIOS) {
        const deviceOrientation = TNSUtils.ios.getter(UIDevice, UIDevice.currentDevice).orientation;
        return (deviceOrientation === UIDeviceOrientation.LandscapeLeft ||
            deviceOrientation === UIDeviceOrientation.LandscapeRight) ? DeviceOrientation.landscape : DeviceOrientation.portrait;
    } else {
        var orientation = getContext().getResources().getConfiguration().orientation;
        switch (orientation) {
            case 1: /* ORIENTATION_PORTRAIT (0x00000001) */
                return DeviceOrientation.portrait;
            case 2: /* ORIENTATION_LANDSCAPE (0x00000002) */
                return DeviceOrientation.landscape;
            default: /* ORIENTATION_UNDEFINED (0x00000000) */
                return DeviceOrientation.portrait;
        }
    }

}

const getContext = function() {
	var ctx = java.lang.Class.forName('android.app.AppGlobals').getMethod('getInitialApplication', null).invoke(null, null);
	if (ctx) { return ctx; }

	return java.lang.Class.forName('android.app.ActivityThread').getMethod('currentApplication', null).invoke(null, null);
}
