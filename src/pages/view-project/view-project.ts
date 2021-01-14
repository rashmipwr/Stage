import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-view-project',
  templateUrl: 'view-project.html',
})
export class ViewProjectPage {
  viewdetail: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.viewdetail = navParams.data.detail;
  }

  ionViewDidLoad() {
  }
  goInbox(item){
    this.navCtrl.push('InboxPage',{detail:item});
  }
  back() {
    this.navCtrl.pop();
  }
}
