import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DjListPage } from './dj-list';

@NgModule({
  declarations: [
    DjListPage,
  ],
  imports: [
    IonicPageModule.forChild(DjListPage),
  ],
})
export class DjListPageModule {}
