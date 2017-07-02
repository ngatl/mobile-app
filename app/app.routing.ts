import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/landing/home',
        pathMatch: 'full'
    },
    {
        path: 'landing',
        loadChildren: './modules/home/home.module#HomeModule'
    },
    // push/pop navigation pages
    {
        path: 'search',
        loadChildren: './modules/search/search.module#SearchModule'
    },
    {
        path: 'detail',
        loadChildren: './modules/detail/detail.module#DetailModule',
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }