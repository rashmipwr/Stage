import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { User } from "../../providers";
import { UtilProvider } from '../../providers/util/util';

@IonicPage()
@Component({
  selector: 'page-space-detail',
  templateUrl: 'space-detail.html',
})
export class SpaceDetailPage {

  spaceData: any = {};
  userData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public util:UtilProvider,
    public user: User,
    public storage: Storage, ) {
    this.spaceData = navParams.data.space;
    this.storage.get('userData').then(userData => {
      this.userData = JSON.parse(userData);
    })
  }

  ionViewDidLoad() {
  }

  back() {
    this.navCtrl.pop();
  }

  book() {
    this.util.presentLoader();
    let data = {
      'sapce_id': this.spaceData.id,
      'amount': this.spaceData.price
    }
    this.user.bookSpace(data, this.userData.Authorization).subscribe(res => {
      let response: any = res;
      if (response.status){
        this.navCtrl.push('TicketPage', { detail: res });
        this.util.presentAlert('',response.message);
      }
      setTimeout(()=>{
        this.util.dismissLoader();
      },500);
    },error => {
      console.error(error);
      this.util.dismissLoader();
    });
    // this.navCtrl.push('TicketPage',{type:'space'});
  }
}
