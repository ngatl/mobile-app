export class MockPlatformLoaderService {

    public show(options?: any) {
        console.log('show', options);
    }

    public hide(options?: any) {
        console.log('hide', options);
    }
}
