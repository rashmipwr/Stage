import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-dj-list',
  templateUrl: 'dj-list.html',
})
export class DjListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  openHirePage() {
    this.navCtrl.push('HireFreelancerPage');
  }
}
