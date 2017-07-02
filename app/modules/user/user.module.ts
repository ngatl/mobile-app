import { NgModule } from '@angular/core';
import { USER_PROVIDERS } from './services';

@NgModule({
    providers: [ ...USER_PROVIDERS ],
})
export class UserModule {
}
