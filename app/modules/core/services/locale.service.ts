import { Inject, Injectable, forwardRef } from '@angular/core';

// nativescript
import { device } from 'tns-core-modules/platform';

// libs
import { Store } from '@ngrx/store';

// app
import { IAppState } from '../../ngrx';
import { Cache, StorageKeys, TNSStorageService } from './tns-storage.service';
import { LocaleState } from '../states';

@Injectable()
export class LocaleService extends Cache {

    // since api calls are made frequently avoid roundtrips to persitence
    private _inMemoryLocale: LocaleState.Locale;
    private _languageToken: string;

    constructor(
        private _storageService: TNSStorageService,
        private _store: Store<IAppState>,
    ) {
        super(_storageService);
        this.isObjectCache = true;
        this.key = StorageKeys.LOCALE;

        this._languageToken = device.language;      
        if (this._languageToken) {
            this._languageToken = this._languageToken.split('-')[0];
        }
        if (!Object.keys(LocaleState.Locale).find((locale) => locale === this._languageToken)) {
            // fallback
            this._languageToken = 'en';
        }
    }

    public get locale(): LocaleState.Locale {
        this._inMemoryLocale = this.cache ? this.cache.locale : this._languageToken;
        return this._inMemoryLocale;
    }

    public set locale(locale: LocaleState.Locale) {
        // store in persistence
        this.cache = { locale };
        // always update in-memory locale for rapid access elsewhere
        this._inMemoryLocale = locale;
    }

    public get inMemoryLocale(): LocaleState.Locale {
        return this._inMemoryLocale;
    }
}
