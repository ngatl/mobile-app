import { NgModule, Component } from '@angular/core';

// libs
import { TranslateModule } from '@ngx-translate/core';

// app
import { CORE_PROVIDERS, WindowService } from '../modules/core/services';
import { MockPlatformLoaderService, WindowMock, MOCK_BACKEND_PROVIDERS } from './services';

@Component({
    selector: 'app-test-cmp',
    template: '<div>Test</div>'
})
export class TestComponent { }

export const MOCK_PROVIDERS: any[] = [
    { provide: WindowService, useClass: WindowMock },
];

@NgModule({
    imports: [
        TranslateModule.forRoot({})
    ],
    declarations: [
        TestComponent
    ],
    providers: [
        ...CORE_PROVIDERS,
        ...MOCK_PROVIDERS
    ]
})
export class AppTestingModule { }

@NgModule({
    imports: [
        AppTestingModule,
    ],
    providers: [
        ...MOCK_BACKEND_PROVIDERS
    ]
})
export class AppHttpTestingModule { }

export * from './services';
export * from './utils';
