import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { User } from "../../providers";
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-equipment-detail',
  templateUrl: 'equipment-detail.html',
})
export class EquipmentDetailPage {

  @ViewChild('ddamount') ddamount;
  equipDetail: any = {};
  userData: any;
  realamount: any;
  checkedIdx = 1;
  constructor(public navCtrl: NavController,
    public util: UtilProvider,
    public navParams: NavParams,
    public user: User,
    public storage: Storage, ) {
    this.equipDetail = navParams.data.equip;
    this.realamount = this.equipDetail.rate_per_day;
    this.storage.get('userData').then(userData => {
      this.userData = JSON.parse(userData);
    })
  }

  ionViewDidLoad() {
  }

  book() {
    if (this.checkedIdx == -1) {
      this.util.presentToast('Please Select Equipment Rate');
    }
    else {
      this.util.presentLoader();
      let data = {
        'equipment_id': this.equipDetail.id,
        'amount': this.realamount
      }
      this.user.BookEquipment(data, this.userData.Authorization).subscribe(res => {
        let response: any = res;
        if (response.status) {
          //  this.navCtrl.push('TicketPage',{type:'equipment'});
          this.util.dismissLoader();
          this.navCtrl.push('TicketPage', { detail: res });
          this.util.presentAlert('', response.message);
        }
        setTimeout(() => {
          this.util.dismissLoader();
        }, 500);
      }, error => {
        console.error(error);
        this.util.dismissLoader();
      });
    }
  }
  godata(item) {
    // console.log(item);
    this.realamount = item;
  }
  back() {
    this.navCtrl.pop();
  }
}
