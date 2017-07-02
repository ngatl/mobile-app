import { Injectable } from '@angular/core';

// nativescript
import * as TNSApplicationSettings from 'tns-core-modules/application-settings';

// app
import { WindowService } from './window.service';

const PREFIX = 'ngatl';
const SEPERATOR = '.';
const PREFIX_KEY = `${PREFIX}${SEPERATOR}`;

// all the keys ever persisted across web and mobile
export interface IStorageKeys {
    LOCALE: string;
    REDIRECT_AFTER_LOGIN: string;
    TOKEN: string;
    USER: string;
    // TODO: add more (refactor rest of codebase to use these)
}

export const StorageKeys: IStorageKeys = {
    LOCALE:               `${PREFIX_KEY}locale`,
    REDIRECT_AFTER_LOGIN: `${PREFIX_KEY}redirect-to-after-login`,
    TOKEN:                `${PREFIX_KEY}user-token`,
    USER:                 `${PREFIX_KEY}current-user`,
};

@Injectable()
export class TNSStorageService {
    public storageType: any; // AoT

    constructor(public win: WindowService) {
        // not used however AoT needs same args
     }

    public set(key: string, data: any): void {
        if ( data === undefined ) {
            data = null;
        } else {
            data = JSON.stringify(data);
        }
        TNSApplicationSettings.setString(key, data);
    }

    public get(key: string): any {
        const item = TNSApplicationSettings.getString(key);
        if ( !item || item === 'null' ) {
            return null;
        }

        try {
            return JSON.parse(item);
        } catch ( e ) {
            console.log(e);

            return null;
        }
    }

    public remove(key: string): void {
        TNSApplicationSettings.remove(key);
    }

    public clearAll(): void {
        TNSApplicationSettings.clear();
    }

    public isAvailable(): boolean {
        return true;// mirrored here since shared web implementation might use this
    }
}

export interface ICache {
    key: string;

    cache(value: any): void;

    cache(): any;

    findById(id: any,
             altProp?: string): any;

    clear(): void;
}

/**
 * Base class
 * Standardizes caching
 */
export class Cache implements ICache {
    // defaults to storing collections
    // override by setting the following:
    public isObjectCache = false;
    // optional function to fire before adding to cache
    public preAddFn: Function;
    // sub-classes should define their key
    private _key: string = null;
    // can optionally define a collection of keys they have access to
    private _keys: Array<string>;

    constructor(public storage: TNSStorageService) { }

    public get key() {
        return this._key;
    }

    public set key(value: string) {
        this._key = value;
    }

    public get keys() {
        return this._keys;
    }

    public set keys(value: Array<string>) {
        this._keys = value;
    }
    /**
     * Grab value from browser/device storage
     **/
    public get cache(): any {
        if ( this._valid() ) {
            return this.storage.get(this.key);
        }
        return undefined;
    }

    /**
     * Grab specific key (if managing multiple) value from browser/device storage
     **/
    public cacheForKey(key: string): any {
        if (this._valid()) {
            if (this.keys && this.keys.find(k => k === key)) {
                return this.storage.get(key);
            } else {
                console.error(`Cache: '${key}' is not part of supported keys.`);
            }
        }
        return undefined;
    }

    /**
     * Store value in browser/device storage.
     * If using default collection, you can pass Array to re-cache entire collection.
     * Or you can pass object with id to find and update inside collection.
     * If object is not found by id, it is pushed onto the collection.
     * You can optionally pass value = {id: any, clearCache: true} to remove particular
     * object from the collection by it's id.
     * @param {any} value - The value to cache or update (if using default collection)
     **/
    public set cache(value: any) {
        if (this.key) {
            this._cacheValue(value);
        } else {
            this._logError();
        }
    }

    /**
     * Store value for specific key (if multiple)
     */
    public cacheKey(key: string, value: any) {
        this._cacheValue(value, key);
    }

    /**
     * Find object in cache collection.
     * @param {any} id - id searching for a match with.
     * @param {string} key - Optionally specify specific key (if using multiple)
     * @param {string} altProp Optionally fallback to match a differnet property
     * @returns {any} - The matching object or `undefined`.
     */
    public findById(id: any, key?: string, altProp?: string): any {
        const c = key ? this.cacheForKey(key) : this.cache;
        if (this._valid() && c) {
            return c.find(i => {
                let match = i.id === id;
                if (!match && altProp) {
                    // optionally fallback to match a differnet property
                    match = i[altProp] === id;
                }
                return match;
            });
        }
        return undefined;
    }

    /**
     * Clear cache completely: remove from storage
     */
    public clear(): void {
        let keys = this.keys || [this.key];
        for (let key of keys) {
            this.storage.remove(key);
        }
    }

    private _cacheValue(value: any, key?: string) {
        let c: any;
        let specificKey = typeof key === 'string' ? key : undefined;
        if (this._valid()) {
            if (this.isObjectCache || Array.isArray(value)) {
                // re-store object everytime
                // ...or re-store incoming collections evertime (like resetting)
                c = value;
            } else {
                // incoming object, cache is default collection
                // get existing to deal with updating by id
                if (specificKey) {
                    c = this.cacheForKey(specificKey);
                } else {
                    c = this.cache;
                }
                if (c && Array.isArray(c)) {
                    // find in array to update
                    let removeIndex = -1;
                    let updated = false;
                    for (let i = 0; i < c.length; i++) {
                        if (typeof c[i] !== 'object') {
                            console.error(`Cache: invalid value (not an object) in collection.`);
                            console.error(c[i]);
                            return;
                        }
                        if ((<any>c[i]).id === value.id) {
                            if (value.clearCache) {
                                // remove from collection
                                removeIndex = i;
                            } else {
                                // update value
                                c[i] = value;
                                updated = true;
                            }
                            break;
                        }
                    }
                    if (removeIndex > -1) {
                        c.splice(removeIndex, 1);
                    } else if (!updated) {
                        if (this.preAddFn) {
                            this.preAddFn(c);
                        }
                        // add new value to collection
                        c.push(value);
                    }
                } else {
                    // default store values wrapped as collections
                    c = [value];
                }
            }
            this.storage.set(specificKey || this.key, c);
        }
    }

    private _valid(): boolean {
        if (typeof this.key === 'string' || this.keys) {
            return true;
        }
        this._logError(true);
        return false;
    }

    private _logError(both?: boolean) {
        console.error(`Cache: key ${both ? 'or keys ' : ''}must be set.`);
    }
}
