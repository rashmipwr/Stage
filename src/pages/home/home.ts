import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from "moment";
import { App } from "ionic-angular/index";
import { User } from "../../providers";
import { Storage } from "@ionic/storage";
import { UtilProvider } from '../../providers/util/util';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  searchTxt: any;
  weekList: any = [];
  homedata: any;
  categoryData: any;
  projectData: any;
  eventData: any;
  dayname: string;
  spacedata: any;
  equdata: any;
  bannerDetail: any;
  projectList: any = [];
  pageNumber: any = 1;
  pageSize: any = 10;
  constructor(public navCtrl: NavController,
    public app: App,
    public user: User,
    public util: UtilProvider,
    public storage: Storage,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getWeekList();
    this.gethomedetail('showLoader');
    this.getProjectList('showLoader');
  }
  gethomedetail(showLoader) {
    this.storage.get('userData').then(userData => {
      let user: any = JSON.parse(userData);
      if (showLoader) {
        this.util.presentLoader();
      }
      this.user.getHomedetail(user.Authorization).subscribe(res => {
        let resp: any = res;
        this.homedata = resp.data;
        this.categoryData = this.homedata.category_data;
        this.projectData = this.homedata.project_data;
        this.spacedata = this.homedata.sapace_data;
        this.equdata = this.homedata.equipment_data;
        this.eventData = this.homedata.event_data[0].event_info;
        if (resp.status) {
          this.util.dismissLoader();
        }
        console.log(res);
      }, error => {
        console.error(error);
      });
      this.user.getHomebanner(user.Authorization).subscribe(res => {
        let resp: any = res;
        this.bannerDetail = resp.data;
      }, error => {
        console.error(error);
      });
    })
  }
  getWeekList() {
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
      let d = moment(date, 'YYYY-MM-DD');
      if (i == 0) {
        this.dayname = d.format('dddd');
        this.weekList.push({
          name: d.format('dddd'),
          date: date,
          isSelected: true
        })
      } else {
        this.weekList.push({
          name: d.format('dddd'),
          date: date,
          isSelected: false
        })
      }
    }
  }

  getToday(day) {
    let date1 = new Date(Date.now());
    let d1 = moment(date1, 'YYYY-MM-DD');
    if (day.name == d1.format('dddd')) {
      return 'todayDate';
    } else {
      return '';
    }
  }

  selectDay(day: any, i) {
    this.util.presentLoader();
    this.eventData = this.homedata.event_data[i].event_info;
    this.util.dismissLoader();
    this.weekList.filter(item => {
      if (item.name == day.name) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    })
  }

  searchInput($event: UIEvent) {

  }

  searchCancel($event: UIEvent) {

  }

  openCategory(type: any) {
    this.navCtrl.push('CategoryListPage', { categoryType: type })
    localStorage.setItem("catname", type.title);
  }

  openAllProjects(item) {
    this.navCtrl.push('ProjectListPage',{detail:item});
  }

  openAllCategories(categoryData) {
    this.navCtrl.push('AllCategoriesPage',{detail:categoryData});
  }

  openNotification() {
    this.navCtrl.push('NotificationPage');
  }

  openProjectInner(status: string) {
    this.app.getRootNav().push('ProjectInnerPage', { status: status });
    localStorage.setItem("showCancle","");
  }

  eventDetail(event: any) {
    // this.app.getRootNav().push('EventDetailPage');
    this.navCtrl.push('EventDetailPage', { event: event });
  }

  spaceDetail(space: any) {
    // this.app.getRootNav().push('SpaceDetailPage');
    this.navCtrl.push('SpaceDetailPage', { space: space });
  }

  equipmentDetail(equip: any) {
    // this.app.getRootNav().push('EquipmentDetailPage');
    this.navCtrl.push('EquipmentDetailPage', { equip: equip });
  }
  getProjectList(showLoader){
    this.storage.get('userData').then(userData => {
      let user: any = JSON.parse(userData);
      if (showLoader) {
        this.util.presentLoader();
      }
      let data = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
      }
      this.user.getSearchProject(data, user.Authorization).subscribe(res => {
        let resp: any = res;
        this.projectList = resp.data;
        if (resp.status) {
          this.util.dismissLoader();
        }
      }, error => {
        console.error(error);
      });
    })
  }
}
