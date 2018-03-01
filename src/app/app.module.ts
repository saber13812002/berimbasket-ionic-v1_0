import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http'; 
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Platform } from 'ionic-angular';

import { Geolocation  } from '@ionic-native/geolocation'; 
import { ElementRef } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { NbaPage } from '../pages/nba/nba';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { PlayerDetailPage } from '../pages/player-detail/player-detail';
import { PlaygroundDetailPage } from '../pages/playground-detail/playground-detail';
import { MapPage } from '../pages/map/map';


 
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';

@NgModule({
  declarations: [ 
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    NbaPage,
    PlayerDetailPage,
    PlaygroundDetailPage,
    MapPage,
    //HttpClientModule,
    //JsonpModule // if used
  ],
  imports: [
      HttpModule,
    BrowserModule,
      HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, 
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    NbaPage,
    PlayerDetailPage,
    PlaygroundDetailPage,
    MapPage,
    //HttpClientModule,
    //JsonpModule // if used
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
      Geolocation 
  ]
})
export class AppModule {}
