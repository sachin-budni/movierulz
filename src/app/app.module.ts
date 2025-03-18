import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { HomeModule } from './home/home.module';

@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        HomeModule,
        AppRoutingModule,
        BrowserAnimationsModule], providers: [
        provideHttpClient(withInterceptorsFromDi(), withFetch()),
        provideClientHydration(withEventReplay())
    ] })
export class AppModule { }
