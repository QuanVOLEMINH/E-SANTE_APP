import { Component, ViewChild } from '@angular/core';
import { Health, HealthData } from '@ionic-native/health';
import { Keyboard } from '@ionic-native/keyboard';
import { Platform, MenuController, Nav } from 'ionic-angular';
//import { GoogleFit } from "org.velardo.cordova-plugin-googlefit/www/GoogleFit.js";
//import { GoogleFit } from "cordova-plugin-googlefit/www/googlefit.js";
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ItemDetailsPage} from "../pages/item-details/item-details";
import {GoogleFitDataProvider} from "../providers/googlefit-data/googlefit-data";
import {Http, Headers, RequestOptions} from '@angular/http';


@Component({
  templateUrl: 'app.html',
  providers: [Keyboard, Health, GoogleFitDataProvider]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = HelloIonicPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private keyboard: Keyboard,
    public googlefitData: GoogleFitDataProvider,
    public http: Http
  ) {
    this.initializeApp();
    this.googlefitAccess();
    // set our app's pages
    this.pages = [
      { title: 'Accueil', component: HelloIonicPage },
      { title: 'Questionnaires', component: ItemDetailsPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //add keyboard class
      this.keyboard.onKeyboardShow().subscribe(() => {
        document.body.classList.add('keyboard-is-open');
        //this.keyboard.disableScroll(false);
      });
      this.keyboard.onKeyboardHide().subscribe(() => {
        document.body.classList.remove('keyboard-is-open');
      });
    });
  }

  googlefitAccess(){
    var temp;
    temp = this.googlefitData.getData().then(function(res){
      console.log("Data in app ts is: ");
      for (var i = 0; i < res.length; i++){
        console.log(res[i]['value']);
      }
      console.log("End");
      return res;
    });
    console.log('start exp');
    //this.googlefitData.sendDataToServer(temp);
    console.log(temp);
    console.log('end exp');
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
