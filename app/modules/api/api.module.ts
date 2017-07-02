import { NgModule } from '@angular/core';

// app
import { API_PROVIDERS } from './services';

@NgModule({
  providers: [
    ...API_PROVIDERS
  ]
})
export class ApiModule { }