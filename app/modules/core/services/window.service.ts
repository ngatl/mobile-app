import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

// nativescript
import * as dialogs from 'tns-core-modules/ui/dialogs';
import { device } from 'tns-core-modules/platform';
import * as timer from 'tns-core-modules/timer';

const isString = (arg: any): arg is string => typeof arg === 'string';

@Injectable()
export class WindowService {
    private _dialogOpened = false;

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
        return new Promise((resolve) => {
            if (!this._dialogOpened) {
                this._dialogOpened = true;
                console.log('alert msg.constructor.name:', msg.constructor.name);
                console.log('typeof msg:', typeof msg);
                if (msg instanceof Response) {
                    try {
                        msg = msg.json();
                        msg = (<any>msg).message;
                    } catch (err) {
                        msg = msg.text();
                    }
                }
                const options: dialogs.AlertOptions = {
                    message: <string>msg,
                    okButtonText: 'Ok',
                };
                dialogs.alert(options).then((ok) => {
                    this._dialogOpened = false;
                    resolve();
                });
            }
        });
    }
    public confirm(msg: string | dialogs.ConfirmOptions): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this._dialogOpened) {
                this._dialogOpened = true;
                let options: dialogs.ConfirmOptions = {
                    okButtonText: 'Ok',
                    cancelButtonText: 'Cancel'
                };
                if (typeof msg === 'string') {
                    options.message = msg;
                } else {
                    options = msg;
                }
                dialogs.confirm(options).then((ok) => {
                    this._dialogOpened = false;
                    if (ok) {
                        resolve();
                    } else {
                        reject();
                    }
                });
            }
        }); 
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
