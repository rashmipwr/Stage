import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilProvider } from "../../providers/util/util";
import { ActionSheetController, App, ViewController } from "ionic-angular/index";
import { Storage } from "@ionic/storage";
import { User } from "../../providers";

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  dobMax: String = new Date().toISOString();
  profileImg: any = '';
  profileImgToShow: any = '';
  userData: any = {};
  firstName: any = '';
  lastName: any = '';
  email: any = '';
  password: any = '';
  city: any = 'city';
  country: any = 'country';
  state: any = 'state';
  address1: any = '';
  address2: any = '';
  gender: any = 'Male';
  dob: any = '';
  occupation: any = '';
  about: any = '';
  countryList: any = [];
  stateList: any = [];
  cityList: any = [];

  constructor(public navCtrl: NavController,
    public util: UtilProvider,
    public viewCtrl: ViewController,
    public app: App,
    public user: User,
    public storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.storedatainlocal();
    this.getMyProfileData();
    this.getAllCountries();
  }
  getMyProfileData() {
    this.storage.get('userData').then(userData => {
      this.userData = JSON.parse(userData);
      this.profileImgToShow = this.userData.image;
      this.email = this.userData.email;
      this.firstName = this.userData.first_name;
      this.lastName = this.userData.last_name;
      this.gender = this.userData.gender;
      this.dob = this.userData.dob;
      this.country = this.userData.country;
      this.city = this.userData.city;
      this.address1 = this.userData.address1;
      this.address2 = this.userData.address2;
      this.occupation = this.userData.occupation;
      this.about = this.userData.about;
      this.state = this.userData.state;
    })
  }

  deleteAccount() {
    this.util.presentConfirm('Are You Sure?', 'Do you really want to delete your account? This process can not be undo', 'Cancel', 'Delete').then(succ => {
      this.deleteAccountApi();
    }).catch(rejected => {
    })
  }
  deleteAccountApi() {
    let data = { account_status: '1' }
    this.util.presentLoader();
    this.user.deleteAccount(data, this.userData.Authorization).subscribe(res => {
      let resp: any = res;
      if (resp.status) {
        this.storage.set('userData', null);
        this.storage.set('token', null);
        this.storage.set('isSocialLogin', null);
        this.app.getRootNav().setRoot('EntryPage');
      }
      setTimeout(() => {
        this.util.dismissLoader();
      }, 500);
    }, error => {
      console.error(error);
      this.util.dismissLoader();
    });
  }

  back() {
    this.viewCtrl.dismiss();
  }
  openPicker() {
    let select = 'Choose or take a picture';
    let takePicture = 'Take a picture';
    let choosePicture = 'Choose picture';
    let actionSheet = this.actionSheetCtrl.create({
      title: select,
      buttons: [
        {
          text: takePicture,
          handler: () => {
            this.util.takePicture().then(data => {
              this.profileImg = data;
              this.profileImgToShow = 'data:image/png;base64,' + data;
            });
          }
        },
        {
          text: choosePicture,
          handler: () => {
            this.util.aceesGallery().then(data => {
              this.profileImg = data;
              this.profileImgToShow = 'data:image/png;base64,' + data;
            });
          }
        }
      ]
    });
    actionSheet.present();
  }

  update() {
    let formData = new FormData();
    formData.append('email', this.email);
    formData.append('first_name', this.firstName);
    formData.append('last_name', this.lastName);
    formData.append('image', this.profileImg);
    formData.append('country', this.country);
    formData.append('city', this.city);
    formData.append('address1', this.address1);
    formData.append('address2', this.address2);
    formData.append('dob', this.dob);
    formData.append('gender', this.gender);
    formData.append('occupation', this.occupation);
    formData.append('about', this.about);
    formData.append('state', this.state);
    this.util.presentLoader();
    this.user.updateProfile(formData, this.userData.Authorization).subscribe(res => {
      let resp: any = res;
      if (resp.status) {
        // this.storage.set('userData', JSON.stringify(resp.data));
        this.storedatainlocal();
        this.util.presentAlert('', resp.message);
      }
      setTimeout(() => {
        this.util.dismissLoader();
      }, 500);
    }, error => {
      console.error(error);
      this.util.dismissLoader();
    });
  }

  getAllCountries() {
    this.user.getCountry().subscribe(res => {
      let resp: any = res;
      if (resp.status) {
        this.countryList = resp.data;
      }
    }, error => {
      console.error(error);
    });
  }
  getAllStates(id) {
    let data = {
      "country_id": id
    }
    this.user.getState(data).subscribe(res => {
      let resp: any = res;
      if (resp.status) {
        this.stateList = resp.data;
      }
    }, error => {
      console.error(error);
    });
  }
  getAllCity(id) {
    let data = {
      "state_id": id
    }
    this.user.getCity(data).subscribe(res => {
      let resp: any = res;
      if (resp.status) {
        this.cityList = resp.data;
      }
    }, error => {
      console.error(error);
      this.util.dismissLoader();
    });
  }
  selectCountry() {
    let country = document.getElementById('country');
    let val = country['options'][country['selectedIndex']].text;
    this.country = val;
    let selectedCountryId = 1;
    this.countryList.filter(item => {
      if (val == item.name) {
        selectedCountryId = item.id;
      }
    })
    this.getAllStates(selectedCountryId);
  }
  selectState() {
    let state = document.getElementById('state');
    let val = state['options'][state['selectedIndex']].text;
    this.state = val;
    let selectedStateId = 1;
    this.stateList.filter(item => {
      if (val == item.name) {
        selectedStateId = item.id;
      }
    })
    this.getAllCity(selectedStateId);
  }

  selectCity() {
    let city = document.getElementById('city');
    this.city = city['options'][city['selectedIndex']].text;
  }
  storedatainlocal() {
    this.storage.get('userData').then(userData => {
      this.userData = JSON.parse(userData);
      let data = {
        "user_id": this.userData.id
      }
      this.user.getProfileData(data, this.userData.Authorization).subscribe(res => {
        let resp: any = res;
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
