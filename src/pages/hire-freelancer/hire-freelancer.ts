import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import { User } from "../../providers";
import { UtilProvider } from "../../providers/util/util";
import { App } from "ionic-angular/index";

@IonicPage()
@Component({
  selector: 'page-hire-freelancer',
  templateUrl: 'hire-freelancer.html',
})
export class HireFreelancerPage {
  isReviewSelected: boolean = false;
  hireDetail: any;
  userData: any;
  reviewData: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage:Storage,
    public user: User,
    public app :App,
    public util: UtilProvider,) {
    this.hireDetail = navParams.data.detail;
    console.log(this.hireDetail);
  }

  ionViewDidLoad() {
    this.storedatainlocal();
  }

  back() {
    this.navCtrl.pop();
  }

  selectSegment(data) {
    this.isReviewSelected = data;
  }

  viewDetail() {
    this.navCtrl.push('FreelancerDetailPage');
  }

storedatainlocal() {
  this.util.presentLoader();
  this.storage.get('userData').then(userData => {
    this.userData = JSON.parse(userData);
    let data = {
      "user_id": this.hireDetail.user_id
    }
    this.user.getProfileData(data, this.userData.Authorization).subscribe(res => {
      let resp: any = res;
      this.reviewData = resp.data.review_data;
      setTimeout(() => {
        this.util.dismissLoader();
      }, 500);
    }, error => {
      console.error(error);
      this.util.dismissLoader();
    });
  });
}
hire(){

  // this.app.getRootNav().setRoot('InboxPage');
  this.util.presentLoader();
  this.storage.get('userData').then(userData => {
    this.userData = JSON.parse(userData);
    let data = {
      "user_id": this.hireDetail.user_id
    }
    this.user.userHire(data, this.userData.Authorization).subscribe(res => {
      let resp: any = res;
      this.util.presentAlert('', resp.message);
      if (resp.status){
          this.navCtrl.setRoot('InboxPage');
      }
      setTimeout(() => {
        this.util.dismissLoader();
      }, 500);
    }, error => {
      console.error(error);
      this.util.dismissLoader();
    });
  });
}
}
