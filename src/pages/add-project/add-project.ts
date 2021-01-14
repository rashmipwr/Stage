import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../providers";
import {UtilProvider} from "../../providers/util/util";
import {Storage} from "@ionic/storage";


@IonicPage()
@Component({
  selector: 'page-add-project',
  templateUrl: 'add-project.html',
})
export class AddProjectPage {

  startDate: String = new Date().toISOString();
  project:any = {
    title:'',
    description:'',
    email:'',
    price:'',
    skills:'',
    project_from:'',
    project_to:'',
    attachment:'',
    project_status:'1'
  }
  //Note:-1=Inprogress,2=Completed"
  userData: any = {};
  attachmentToShow: any = '';
  constructor(public navCtrl: NavController,
              public user:User,
              public util:UtilProvider,
              public storage:Storage,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getUserData();
  }

  validate() {
    if (this.project.title.trim() === ''){
      this.util.presentToast('Please enter title');
      return false;
    }
    if (this.project.project_from.trim() === ''){
      this.util.presentToast('Please enter project from date');
      return false;
    } if (this.project.project_to.trim() === ''){
      this.util.presentToast('Please enter project to date');
      return false;
    }
    return true;
  }

  private getUserData() {
    this.storage.get('userData').then(userData=> {
      this.userData = JSON.parse(userData);
    })
  }
  getAttachmentEvent(event) {
    this.project.attachment = event.target.files[0];
    let reader = new FileReader();
    let that = this;
    reader.onload = function(){
      that.attachmentToShow = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  saveProject() {
    if (this.validate()){
      let formData = new FormData();
      formData.append('title',this.project.title);
      formData.append('description',this.project.description);
      formData.append('email',this.project.email);
      formData.append('price',this.project.price);
      formData.append('skills',this.project.skills);
      formData.append('project_from',this.project.project_from);
      formData.append('project_to',this.project.project_to);
      formData.append('attachment',this.project.attachment);
      formData.append('project_status',this.project.project_status);

      this.util.presentLoader();
      this.user.addProjectData(formData,this.userData.Authorization).subscribe(res=>{
        let resp : any =res;
        if (resp.status){
          this.util.presentAlert('',resp.message);
          this.project = {
            title:'',
            description:'',
            email:'',
            price:'',
            skills:'',
            project_from:'',
            project_to:'',
            attachment:'',
            project_status:'1'
          }
          this.attachmentToShow='';
          this.navCtrl.popToRoot();
        }
        setTimeout(()=>{
          this.util.dismissLoader();
        },500);
      },error => {
        console.error(error);
        this.util.dismissLoader();
      });
    }
  }
}
