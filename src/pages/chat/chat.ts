import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  chatList = [
    {
      userProfile:'assets/img/men2.png',
      dateTime:'Today 5:32 pm',
      message:'Hey there, Please provide the necessary data so that I will start designing. It would hardly taked 1 - 2 weeks to complete.',
      isMine:false
    },
    {
      userProfile:'',
      dateTime:'Today 5:33 pm',
      message:'Sure. I will share it by tonight.',
      isMine:true
    },
    {
      userProfile:'assets/img/men2.png',
      dateTime:'Today 5:39 pm',
      message:'Thanks I will do that then',
      isMine:false
    },
    {
      userProfile:'',
      dateTime:'Today 5:41 pm',
      message:'Let me know when you complete',
      isMine:true
    },
    {
      userProfile:'assets/img/men2.png',
      dateTime:'Today 5:39 pm',
      message:'Thanks I will do that then',
      isMine:false
    },
    {
      userProfile:'',
      dateTime:'Today 5:41 pm',
      message:'Let me know when you complete',
      isMine:true
    }
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  /*checkRepeat(chat: any, i: number) {
    if (this.chatList[i-1]){
      console.log('this.chatList[i-1].isMine',this.chatList[i-1].isMine);
    }

    if (this.chatList[i-1] && this.chatList[i-1].isMine){
      return true
    }else{
      return false;
    }
  }*/

}
