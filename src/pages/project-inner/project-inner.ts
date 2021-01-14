import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util';
import { Storage } from "@ionic/storage";
import { User } from "../../providers";

@IonicPage()
@Component({
  selector: 'page-project-inner',
  templateUrl: 'project-inner.html',
})
export class ProjectInnerPage {
  isCompleted: boolean = true;
  status: any = '';
  rating: any;
  review: any;
  userData: any;
  feqlist: any;
  reviewList: any;
  showCancle: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage,
    public util: UtilProvider,
    public user: User, ) {
    this.status = navParams.data.status;
    this.showCancle = localStorage.getItem("showCancle");
    this.status.status == 'In Progress' ? this.isCompleted = false : this.isCompleted = true;
    this.storage.get('userData').then(userData => {
      this.userData = JSON.parse(userData);
    })
  }
  logRatingChange() {
    if (this.rating == undefined || this.rating == '') {
      this.util.presentToast('Please Select Rating');
    } else if (this.review == undefined || this.review == '') {
      this.util.presentToast('Please Enter Review');
    }
    else {
      this.util.presentLoader();
      let data = {
        "project_id": this.status.id,
        "rating": this.rating,
        "comment": this.review
      }
      this.user.addReview(data, this.userData.Authorization).subscribe(res => {
        let response: any = res;
          this.util.dismissLoader();
          // this.navCtrl.push('TicketPage', { detail: res });
          this.util.presentAlert('', response.message);
          this.getallData();
        
      }, error => {
        console.error(error);
        this.util.dismissLoader();
      });
    }
  }
  ionViewDidLoad() {
    this.getallData();
  }

  back() {
    this.navCtrl.pop();
  }
  getallData(){
    this.storage.get('userData').then(userData => {
      let user: any = JSON.parse(userData);
      this.util.presentLoader();
      this.user.faqlist(user.Authorization).subscribe(res => {
        let resp: any = res;
        this.feqlist = resp.data;
        if (resp.status) {
          this.util.dismissLoader();
        }
      }, error => {
        console.error(error);
      });
      let data = {
        "project_id": this.status.id
      }
       this.user.getReview(data,user.Authorization).subscribe(res => {
        let resp: any = res;
        this.reviewList = resp.data;
        if (resp.status) {
          this.util.dismissLoader();
        }
      }, error => {
        console.error(error);
      });
    })
  }
  cancleProject(){
    this.storage.get('userData').then(userData => {
      let user: any = JSON.parse(userData);
      this.util.presentLoader();
      let data = {
        "project_id": this.status.id
      }
       this.user.cancleProject(data,user.Authorization).subscribe(res => {
        let resp: any = res;
        console.log(res);
        this.util.presentAlert('',resp.message);
        if (resp.status) {
          this.util.dismissLoader();          
           this.navCtrl.setRoot('MenuPage');
        }
      }, error => {
        console.error(error);
      });
    })
  }
}
