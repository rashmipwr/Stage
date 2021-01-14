import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../providers";
import {UtilProvider} from "../../providers/util/util";
import {Storage} from "@ionic/storage";


@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  oldPass: any = '';
  newPass: any = '';
  confirmPass: any = '';
  socailLogin : any = '0';
  isSocialLogin : boolean = false;
  constructor(public navCtrl: NavController,
              public util: UtilProvider,
              public user: User,
              public storage: Storage,
              public navParams: NavParams) {
    storage.get('isSocialLogin').then(data=>{
      if (data){
        this.isSocialLogin = data;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  change() {
    if (this.validate()){
      this.util.presentLoader('');
      let data = {
        old_password:this.oldPass,
        new_password:this.newPass,
        social_login:this.socailLogin
      }

      this.storage.get('token').then(token=>{
        this.user.changePassword(data,token).subscribe(res=>{
          let resp : any = res;
          this.util.presentAlert('',resp.message);
          setTimeout(()=>{
            this.util.dismissLoader();
          },500);
        },error => {
          console.log(error);
          this.util.dismissLoader();
        })
      })
    }
  }
  validate() {
    if (!this.isSocialLogin){
      if (this.oldPass == ''){
        this.util.presentToast('Please insert your old password');
        return false;
      }
    }

    if (this.newPass == ''){
      this.util.presentToast('Please insert your new password');
      return false;
    }

    if (this.confirmPass == ''){
      this.util.presentToast('Please insert your confirm password');
      return false;
    }

    if (this.newPass !== this.confirmPass){
      this.util.presentToast('New Password and Confirm Password are not matched');
      return false;
    }
    return true;
  }

  openNotif() {
    this.navCtrl.push('NotificationPage');
  }
}
