import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import ApiMap from './apiMap.json';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  private baseurl = ApiMap.api.baseUrl;
  apiUrl: string;
  headers;
  data;

  getUsers(): Observable<Object> {
    this.headers = new Headers(
      {
         'Authorization': `Bearer ${localStorage.getItem('access')}`,
         'content-type':'application/json'
      });
    this.apiUrl = ApiMap.api.servicesApi.get.getUsers;
    return this.http.get(`${this.baseurl}${this.apiUrl}`);
  }

  getPost(): Observable<Object> {
    this.apiUrl = ApiMap.api.servicesApi.get.getPosts;
    return this.http.get(`${this.baseurl}${this.apiUrl}`);
  }

  postUsers(data) {
    this.headers = new Headers(
      {
         'Authorization': `Bearer ${localStorage.getItem('access')}`,
         'content-type':'application/json'
      });
    this.data = data;
    this.apiUrl = ApiMap.api.servicesApi.post.postUsers;
    return this.http.post(`${this.baseurl}${this.apiUrl}`,data,{'headers':this.headers});
  }

  postRegister(data){
    this.headers = {'content-type':'application/json'}
    this.data = data;
    this.apiUrl = ApiMap.api.servicesApi.post.postRegister;
    return this.http.post(`${this.baseurl}${this.apiUrl}`,data,{'headers':this.headers});
  }

  postLogin(data){
    this.headers = {'content-type':'application/json'}
    this.data = JSON.stringify(data);;
    this.apiUrl = ApiMap.api.servicesApi.post.postLogin;
    return this.http.post(`${this.baseurl}${this.apiUrl}`,data,{'headers':this.headers});
  }

  postPosts(data){
    this.headers = new Headers(
      {
         'Authorization': `Bearer ${localStorage.getItem('access')}`,
         'content-type':'application/json'
      });
    this.data = data;
    this.apiUrl = ApiMap.api.servicesApi.post.postPosts;
    return this.http.post(`${this.baseurl}${this.apiUrl}`,data,{'headers':this.headers});
  }

  postCaptcha(){
    this.headers = {'content-type':'application/json'}
    this.apiUrl = ApiMap.api.servicesApi.post.postCaptcha;
    return this.http.post(`${this.baseurl}${this.apiUrl}`,{'headers':this.headers});
  }

}
