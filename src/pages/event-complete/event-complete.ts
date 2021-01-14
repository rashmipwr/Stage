import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-event-complete',
  templateUrl: 'event-complete.html',
})
export class EventCompletePage {

  eventDetails:any={};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.eventDetails = navParams.data.event;
  }

  ionViewDidLoad() {

  }

  back() {
    this.navCtrl.pop();
  }
}
