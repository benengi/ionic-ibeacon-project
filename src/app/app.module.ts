import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { IBeacon } from '@ionic-native/ibeacon';
import { NextPage } from '../pages/next/next';
import { BeaconProvider } from '../services/beacon-provider';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { YellowPage } from '../pages/yellow/yellow';
import { PinkPage } from '../pages/pink/pink';
import { WhitePage } from '../pages/white/white';
import { ShelfDetailsPage } from '../pages/shelf-details/shelf-details';
import { HTTP } from '@ionic-native/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NextPage,
    YellowPage,
    PinkPage,
    WhitePage,
    ShelfDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NextPage,
    YellowPage,
    PinkPage,
    WhitePage,
    ShelfDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    IBeacon,
    BeaconProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalNotifications,
    HTTP
  ]
})
export class AppModule {}
