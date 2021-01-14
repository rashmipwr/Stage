import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from 'ionic-angular';
import {Config} from "ionic-angular/index";
import {Storage} from "@ionic/storage";

@Component({
  template: `
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = '';
  constructor(private translate: TranslateService, platform: Platform,
              private statusBar: StatusBar,
              private config: Config,
              private storage: Storage,
              private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.storage.get('userData').then(userData=>{
        if (userData){
          this.rootPage='MenuPage';
        }else {
          this.rootPage = 'EntryPage';
        }
      });
    });
    this.initTranslate();
  }

  initTranslate() {
    this.translate.setDefaultLang('en');
    this.translate.use('en'); // Set your language here

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

}
