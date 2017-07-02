export namespace LocaleState {
    export const Locale = Object.freeze({
        en: 'en',
        es: 'es',
        fr: 'fr,',
        it: 'it',
    });

    export type Locale = keyof typeof Locale;
}
