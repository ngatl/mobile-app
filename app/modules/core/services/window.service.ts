import { Injectable } from '@angular/core';

// nativescript
import * as dialogs from 'tns-core-modules/ui/dialogs';
import { device } from 'tns-core-modules/platform';
import * as timer from 'tns-core-modules/timer';

const isString = (arg: any): arg is string => typeof arg === 'string';

@Injectable()
export class WindowService {
    public get navigator(): any {
        return {
            language: device.language,
            userAgent: 'nativescript',
        };
    }
    public get location(): any {
        return {
            host: 'nativescript'
        };
    }
    public dataLayer: any = {};
    public btoa() {
        return ''; // stub
    }
    public scrollTo(x?: number, y?: number) { }
    public alert(msg: string | dialogs.AlertOptions): Promise<any> {
        if (!isString(msg)) {
            const options: dialogs.AlertOptions = {
                message: <string>msg,
                okButtonText: 'Ok',
            };
            return dialogs.alert(options);
        } else {
            return (() => { throw new Error('String is not valid {N} alert parameter'); })();
        }
    }
    public confirm(msg: string | dialogs.ConfirmOptions): Promise<any> {
        if (!isString(msg)) {
            const options: dialogs.ConfirmOptions = {
                message: <string>msg,
                okButtonText: 'Ok',
                cancelButtonText: 'Cancel'
            };
            return dialogs.confirm(options);
        } else {
            return (() => { throw new Error('String is not valid {N} confirm parameter'); })();
        }
    }
    public open(...args: Array<any>) {
        // might have this open a WebView modal
        return null;
    }
    public setTimeout(handler: (...args: any[]) => void, timeout?: number): number {
        return timer.setTimeout(handler, timeout);
    }
    public clearTimeout(timeoutId: number): void {
        timer.clearTimeout(timeoutId);
    }
    public setInterval(handler: (...args: any[]) => void, ms?: number, ...args: any[]): number {
        return timer.setInterval(handler, ms);
    }
    public clearInterval(intervalId: number): void {
        timer.clearInterval(intervalId);
    }
    // stub for AoT
    public ga(command: string | Function, params?: any): void { }
}
