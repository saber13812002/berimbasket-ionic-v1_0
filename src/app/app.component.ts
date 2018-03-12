import { Component } from '@angular/core';
import { Config, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';


import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  textDir: string = "ltr";

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    private translate: TranslateService, 
    private config: Config
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
    //this.initTranslate();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      //this is to determine the text direction depending on the selected language
      this.translate.onLangChange.subscribe((event: LangChangeEvent) =>
      {
        this.textDir = event.lang == 'ar'? 'rtl' : 'ltr';
      });


    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    //translate.setDefaultLang('en');
    this.translate.use('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }


}
