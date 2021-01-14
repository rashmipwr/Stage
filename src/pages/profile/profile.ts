import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import { User } from "../../providers";
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  segmentProfile: any = 'profile';
  isReviewSelected: boolean = false;
  userData:any = {};
  showArrow: any;
  testlen: any;
  showMore:false;
  showlimit:100;
  show: string;
  reviewData: any;
  constructor(public navCtrl: NavController,
              public storage:Storage,
              public user: User,
              public util: UtilProvider,
              public viewCtrl:ViewController,
              public navParams: NavParams) {
                this.showArrow = navParams.data.detail;
                this.getMyProfileData();
                this.show ='yes';
                this.showlimit =100;
  }

  ionViewDidLoad() {
    this.storedatainlocal();
    this.getMyProfileData();
  }
  ionViewWillEnter() {
    this.getMyProfileData();
  }
  selectSegment(data) {
    this.isReviewSelected = data;
  }

  editProfile() {
    this.navCtrl.push('EditProfilePage');
  }

  getMyProfileData() {
    this.storage.get('userData').then(userData=>{
      this.userData = JSON.parse(userData);
      this.testlen =this.userData.about.length;

    })
  }
  showMorego(){
    this.show ='no';
    this.showlimit =this.testlen;
  }
  showLessgo(){
    this.show ='yes';
    this.showlimit =100;
  }
  back() {
    this.viewCtrl.dismiss();
  }
  trimString(string, length) {
    return string.length > length ? 
           string.substring(0, length) + '...' :
           string;
}
storedatainlocal() {
  this.storage.get('userData').then(userData => {
    this.userData = JSON.parse(userData);
    let data = {
      "user_id": this.userData.id
    }
    this.user.getProfileData(data, this.userData.Authorization).subscribe(res => {
      let resp: any = res;
      this.reviewData = resp.data.review_data;
      // console.log(resp);
      if (resp.status) {
        this.storage.set('userData', JSON.stringify(resp.data.profile_data));
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
