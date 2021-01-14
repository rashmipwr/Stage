import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../providers";
import { Storage } from "@ionic/storage";
import { UtilProvider } from '../../providers/util/util';


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  searchTxt: any = '';
  isFreeLancerSelected: boolean = false;
  homedata: any;
  projectData: any = [];
  pageNumber: any = 1;
  pageSize: any = 10;
  sprojectData: any;
  freelancerData: any;
  isListEmpty: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public user: User,
    public util: UtilProvider,
    public storage: Storage, ) {
  }

  ionViewDidLoad() {
    this.gethomedetailgo(true).then(data=>{
      this.projectData = data;
      (this.projectData.length>0)?this.isListEmpty=false:this.isListEmpty=true;
    }).catch(err=>{
      (this.projectData.length>0)?this.isListEmpty=false:this.isListEmpty=true;
    });
  }

  gethomedetailgo(showLoader) {
    return new Promise((resolve, reject) => {
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
        console.log(res);
        this.projectData = resp.data;
        if (resp.status) {
          this.util.dismissLoader();
        }
      }, error => {
        console.error(error);
      });
      this.user.getfreelancerList(data, user.Authorization).subscribe(res => {
        let resp: any = res;
        this.freelancerData = resp.data;
        // console.log(res)
        if (resp.status) {
          this.util.dismissLoader();
        }
      }, error => {
        console.error(error);
      });
    })
  })
  }
  searchInput($event: UIEvent) {
    this.storage.get('userData').then(userData => {
      let user: any = JSON.parse(userData);
      let data = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        search_text: this.searchTxt
      }
      this.user.getSearchProject(data, user.Authorization).subscribe(res => {
        let resp: any = res;
        this.projectData = resp.data;
        if (resp.status) {
          this.util.dismissLoader();
        }
      }, error => {
        console.error(error);
      });
      this.user.getfreelancerList(data, user.Authorization).subscribe(res => {
        let resp: any = res;
        this.freelancerData = resp.data;
        if (resp.status) {
          this.util.dismissLoader();
        }
      }, error => {
        console.error(error);
      });
    })

  }

  searchCancel($event: UIEvent) {
console.log('hi');
  }

  calculateDiff(item) {
    var date1 = new Date(item.project_from);
    var date2 = new Date(item.project_to);
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days;
  }
  selectSegment(data) {
    this.searchTxt = '';
    this.isFreeLancerSelected = data;
    this.gethomedetailgo('showLoader');
  }

  openProject(item) {
    this.navCtrl.push('ViewProjectPage', { detail: item });
  }
  goHire(item: any) {
    this.navCtrl.push('HireFreelancerPage', { detail: item });
  }
  loadMore(infiniteScroll) {
    setTimeout(() => {
      this.gethomedetailgo(false).then((data) => {
        let list: any = data;
        this.projectData = [...this.projectData, ...list];
        (this.projectData.length > 0) ? this.isListEmpty = false : this.isListEmpty = true;
        infiniteScroll.complete();
      }).catch(() => {
        (this.projectData.length > 0) ? this.isListEmpty = false : this.isListEmpty = true;
        infiniteScroll.complete();
      })
    }, 500)
  }
}
