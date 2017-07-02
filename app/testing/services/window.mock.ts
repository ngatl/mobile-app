export class WindowMock {

    public static MEM_CACHE: any = {};

    public localStorage: any = {
        setItem: (key, value) => {
            WindowMock.MEM_CACHE[key] = value;
            console.log(key, value);
        },
        getItem: (key) => {
            return WindowMock.MEM_CACHE[key];
        },
        removeItem: (key) => {
            delete WindowMock.MEM_CACHE[key];
        },
        clear: () => {
            WindowMock.resetCache();
        }
    };

    public location: any = {};

    public navigator: any = {
        language: 'en-US',
        userAgent: 'testing'
    };

    // google tag manager stub for web
    public dataLayer: Array<any> = [];

    public alert(msg: string): void {
        return;
    }

    public confirm(msg: string): void {
        return;
    }

    public setTimeout(handler: (...args: any[]) => void, timeout?: number): number {
        return <any>setTimeout(handler, timeout);
    }
    public clearTimeout(timeoutId: number): void {
        clearTimeout(timeoutId);
    }
    public setInterval(handler: (...args: any[]) => void, ms?: number, ...args: any[]): number {
        return <any>setInterval(handler, ms);
    }
    public clearInterval(intervalId: number): void {
        clearInterval(intervalId);
    }

    // analytics
    public ga(command: string | Function, params?: any): void {
        console.log(command, params);
    }

    public static resetCache() {
        WindowMock.MEM_CACHE = {};
    }
}

export class WindowMockFrench extends WindowMock {
    constructor() {
        super();
        this.navigator.language = 'fr-US';
    }
}

export class WindowMockNoLanguage extends WindowMock {
    constructor() {
        super();
        this.navigator.language = undefined;
    }
}
