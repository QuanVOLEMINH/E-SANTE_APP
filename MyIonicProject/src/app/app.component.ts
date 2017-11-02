import { Component, ViewChild } from '@angular/core';
import { Health } from '@ionic-native/health';
//import { Keyboard } from '@ionic-native/keyboard';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GoogleFitDataProvider } from "../providers/googlefit-data/googlefit-data";
import { Events } from 'ionic-angular';
import { AppAvailability } from '@ionic-native/app-availability';

@Component({
  templateUrl: 'app.html',
  providers: [Health, GoogleFitDataProvider, AppAvailability]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make login page the root (or first) page
  rootPage = LoginPage;

  pages: Array<{ title: string, component: any }>;
  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    //private keyboard: Keyboard,
    public googlefitData: GoogleFitDataProvider,
    public events: Events,
    public appAvailability: AppAvailability,
  ) {
    this.initializeApp();
    // set our app's pages
    this.pages = [
      { title: 'Accueil', component: HelloIonicPage },
      { title: 'Questionnaires', component: ItemDetailsPage },
      { title: 'Login', component: LoginPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      /*
      let app = 'com.google.android.apps.fitness';
      this.appAvailability.check(app)
        .then(
        () => {
          this.googlefitAccess();
        },
        () => {
          setTimeout(
            () => {
              if (confirm('Pour utiliser cette application plus efficacement, acceptez-vous d\'installer le GoogleFit?')) {
                this.googlefitData.installationRequirements();
              }
            },
            3000);
        }
        );*/
    });
  }

  googlefitAccess() {
    let temp = this.googlefitData.getData().then(function (res) {
      return res;
    });
    console.log('temp in app ts is ok ');
    //console.log(temp);
    temp.then(
      res => {
        if (res == 'cordova_not_available') {
          throw 'error not found googlefit';
        } else {
          this.events.subscribe('myEvent', function () {
            return res;
          });
        }
      }
    ).catch(e => console.log(e));
  }

  /*
  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
  */
}
