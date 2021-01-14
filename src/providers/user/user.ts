import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class User {

  register: any = 'Authentication/register';
  loginUrl: any = 'Authentication/login';
  socialLoginUrl: any = 'SocialLogin/Login';
  forgot_pass: any = 'Authentication/forgot_pass';
  changepassword: any = 'Authentication/changepassword';
  delete_account: any = 'Authentication/delete_account';
  profile_update: any = 'Authentication/profile_update';
  logoutUrl: any = 'Authentication/logout';
  get_countries: any = 'Authentication/get_countries';
  get_states: any = 'Authentication/get_states';
  get_cities: any = 'Authentication/get_cities';
  forgot_password: any = 'Authentication/forgot_password';
  get_profile_data: any = 'Authentication/getProfileData';
  contact_us: any = 'Authentication/contact_us';
  add_event: any = 'Users/add_event';
  event_list: any = 'Users/event_list';
  add_sapce: any = 'Users/add_sapce';
  space_list: any = 'Users/space_list';
  add_equipment: any = 'Users/add_equipment';
  equipment_list: any = 'Users/equipment_list';
  add_project: any = 'Users/add_project';
  project_list: any = 'Users/project_list';
  homepage_list: any = 'Users/dashboard_list';
  homebanner_list: any = 'Users/banner_list';
  faq_list: any = 'Users/faq_list';
  add_review: any = 'Users/add_reviews';
  subcategory_list: any = 'Users/subcategory_list';
  review_list: any = 'Users/review_list';
  searchProject_list: any = 'Users/all_project_list';
  freelancer_list: any = 'Users/all_freelancer_list';
  cancle_project: any = 'Users/cancel_project';
  get_notification_list : any = 'Users/get_notification_list';
  clear_notification : any = 'Users/clear_notification';
  user_hire : any = 'Users/user_hire';

  // booking
  book_equipment: any = 'Booking/equipment_booking';
  book_space: any = 'Booking/space_booking';
  book_event: any = 'Booking/ticket_booking';


  constructor(public api: Api) { }

  login(data: any) {
    let seq = this.api.post(this.loginUrl, data).share();
    return seq;
  }

  socialLogin(data: any) {
    let seq = this.api.post(this.socialLoginUrl, data).share();
    return seq;
  }

  signup(accountInfo: any) {
    let seq = this.api.post(this.register, accountInfo).share();
    return seq;
  }

  forgotPassword(accountInfo: any) {
    let seq = this.api.post(this.forgot_password, accountInfo).share();
    return seq;
  }
  changePassword(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.changepassword, data, { headers: header }).share();
    return seq;
  }
  deleteAccount(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.delete_account, data, { headers: header }).share();
    return seq;
  }
  updateProfile(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.profile_update, data, { headers: header }).share();
    return seq;
  }
  logout(token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.get(this.logoutUrl, '', { headers: header }).share();
    return seq;
  }
  contactUs(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.contact_us, data, { headers: header }).share();
    return seq;
  }
  getCountry() {
    let seq = this.api.get(this.get_countries).share();
    return seq;
  }
  getState(data: any) {
    let seq = this.api.post(this.get_states, data).share();
    return seq;
  }
  getCity(data: any) {
    let seq = this.api.post(this.get_cities, data).share();
    return seq;
  }
  addEventData(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.add_event, data, { headers: header }).share();
    return seq;
  }
  getEventList(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.event_list, data, { headers: header }).share();
    return seq;
  }
  addSpaceData(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.add_sapce, data, { headers: header }).share();
    return seq;
  }
  getSpaceList(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.space_list, data, { headers: header }).share();
    return seq;
  }
  addEquipmentData(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.add_equipment, data, { headers: header }).share();
    return seq;
  }
  getEquipmentList(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.equipment_list, data, { headers: header }).share();
    return seq;
  }
  addProjectData(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.add_project, data, { headers: header }).share();
    return seq;
  }
  getProjectList(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.project_list, data, { headers: header }).share();
    return seq;
  }

  BookEquipment(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.book_equipment, data, { headers: header }).share();
    return seq;
  }
  bookSpace(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.book_space, data, { headers: header }).share();
    return seq;
  }
  bookEvent(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.book_event, data, { headers: header }).share();
    return seq;
  }
  getHomedetail(token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.get(this.homepage_list, '', { headers: header }).share();
    return seq;
  }
  getHomebanner(token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.get(this.homebanner_list, '', { headers: header }).share();
    return seq;
  }
  faqlist(token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.get(this.faq_list, '', { headers: header }).share();
    return seq;
  }
  addReview(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.add_review, data, { headers: header }).share();
    return seq;
  }
  subCatlist(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.subcategory_list, data, { headers: header }).share();
    return seq;
  }
  getReview(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.review_list, data, { headers: header }).share();
    return seq;
  }
  getSearchProject(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.searchProject_list, data, { headers: header }).share();
    return seq;
  }
  getfreelancerList(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.freelancer_list, data, { headers: header }).share();
    return seq;
  }
  cancleProject(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.cancle_project, data, { headers: header }).share();
    return seq;
  }
  getAllNotificationList(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.get_notification_list, data, { headers: header }).share();
    return seq;
  }
  clearNotification(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.clear_notification, data, { headers: header }).share();
    return seq;
  }
  getProfileData(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.get_profile_data, data, { headers: header }).share();
    return seq;
  }
  userHire(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.user_hire, data, { headers: header }).share();
    return seq;
  }
}
