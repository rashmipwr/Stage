import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util';
import { Storage } from "@ionic/storage";
import { User } from "../../providers";


@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  eventData: any;
  checkedIdx = 2;
  totalVal: any;
  eventdiscount_value: any;
  distotalVal: any;
  userData: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public util: UtilProvider,
    public user: User, ) {
    this.eventData = navParams.data.event;
    this.totalVal = this.eventData.gold_ticket_price;
    this.distotalVal = this.eventData.discount_value;
    this.eventdiscount_value = this.totalVal - this.distotalVal;
    this.storage.get('userData').then(userData => {
      this.userData = JSON.parse(userData);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
  }

  back() {
    this.navCtrl.pop();
  }

  book() {
    // console.log(this.checkedIdx);
    if (this.checkedIdx == 0) {
      this.totalVal = this.eventData.general_ticket_price;
    }
    if (this.checkedIdx == 1) {
      this.totalVal = this.eventData.business_ticket_price;
    }
    if (this.checkedIdx == 2) {
      this.totalVal = this.eventData.gold_ticket_price;
    }
    if (this.checkedIdx == 3) {
      this.totalVal = this.eventData.silver_ticket_price;
    }
    if (this.checkedIdx == -1) {
      this.util.presentToast('Please Select Ticket');
    }
    else {
      this.util.presentLoader();
      let data = {
        "event_id": this.eventData.id,
        "event_type": "0",
        "amount": this.totalVal,
        "discount_code": this.eventData.discount_code,
        "discount_value": this.eventData.discount_value
      }
      this.user.bookEvent(data, this.userData.Authorization).subscribe(res => {
        let response: any = res;
        // console.error(res);
        if (response.status) {
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
    // this.navCtrl.push('TicketPage',{type:'event'});
  }
  getdata(item) {
    console.log(item);
    this.totalVal = item;
    this.eventdiscount_value = item - this.distotalVal;
  }
}
