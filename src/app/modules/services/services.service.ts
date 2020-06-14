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

  // ======================== gets ============================

  getUsers(): Observable<Object> {
    this.headers = new Headers(
      {
         'Authorization': `Bearer ${localStorage.getItem('access')}`,
         'content-type':'application/json'
      });
    this.apiUrl = ApiMap.api.servicesApi.get.getUsers;
    return this.http.get(`${this.baseurl}${this.apiUrl}`,{'headers':this.headers});
  }

  getNews(): Observable<Object> {
    this.headers = new Headers(
      {
         'Authorization': `Bearer ${localStorage.getItem('access')}`,
         'content-type':'application/json'
      });
    this.apiUrl = ApiMap.api.servicesApi.get.getNews;
    return this.http.get(`${this.baseurl}${this.apiUrl}`,{'headers':this.headers});
  }

// =============================== posts ========================================

  postRegister(data): Observable<Object>{
    this.headers = new Headers(
      {
         'Authorization': `Bearer ${localStorage.getItem('access')}`,
         'content-type':'application/json'
      });
    this.data = data;
    this.apiUrl = ApiMap.api.servicesApi.post.postRegister;
    return this.http.post(`${this.baseurl}${this.apiUrl}`,data,{'headers':this.headers});
  }

  postLogin(data): Observable<Object>{
    this.headers = new Headers(
      {
         'Authorization': `Bearer ${localStorage.getItem('access')}`,
         'content-type':'application/json'
      });
    this.data = JSON.stringify(data);;
    this.apiUrl = ApiMap.api.servicesApi.post.postLogin;
    return this.http.post(`${this.baseurl}${this.apiUrl}`,data,{'headers':this.headers});
  }

  postٔNews(data): Observable<Object>{
    this.headers = new Headers(
      {
         'Authorization': `Bearer ${localStorage.getItem('access')}`,
         'content-type':'application/json'
      });
    this.data = data;
    this.apiUrl = ApiMap.api.servicesApi.post.postNews;
    return this.http.post(`${this.baseurl}${this.apiUrl}`,data,{'headers':this.headers});
  }

  postCaptcha(): Observable<Object>{
    this.headers = new Headers(
      {
         'Authorization': `Bearer ${localStorage.getItem('access')}`,
         'content-type':'application/json'
      });
    this.apiUrl = ApiMap.api.servicesApi.post.postCaptcha;
    return this.http.post(`${this.baseurl}${this.apiUrl}`,{'headers':this.headers});
  }

  postEducation(data): Observable<Object>{
    this.headers = new Headers(
      {
         'Authorization': `Bearer ${localStorage.getItem('access')}`,
         'content-type':'application/json'
      });
    this.data = data;
    this.apiUrl = ApiMap.api.servicesApi.post.postEducation;
    return this.http.post(`${this.baseurl}${this.apiUrl}`,data,{'headers':this.headers});
  }

  // ========================  delete ========================

  deleteNews(): Observable<Object> {
    this.headers = new Headers(
      {
         'Authorization': `Bearer ${localStorage.getItem('access')}`,
         'content-type':'application/json'
      });
    this.apiUrl = ApiMap.api.servicesApi.delete.deleteNews;
    return this.http.delete(`${this.baseurl}${this.apiUrl}`,{'headers':this.headers});
  }

  deleteUsers(): Observable<Object> {
    this.headers = new Headers(
      {
         'Authorization': `Bearer ${localStorage.getItem('access')}`,
         'content-type':'application/json'
      });
    this.apiUrl = ApiMap.api.servicesApi.delete.deleteUsers;
    return this.http.delete(`${this.baseurl}${this.apiUrl}`,{'headers':this.headers});
  }

  deleteEducation(): Observable<Object> {
    this.headers = new Headers(
      {
         'Authorization': `Bearer ${localStorage.getItem('access')}`,
         'content-type':'application/json'
      });
    this.apiUrl = ApiMap.api.servicesApi.delete.deleteEducation;
    return this.http.delete(`${this.baseurl}${this.apiUrl}`,{'headers':this.headers});
  }

  // =========================== patchs ===========================

  patchNews(): Observable<Object> {
    this.headers = new Headers(
      {
         'Authorization': `Bearer ${localStorage.getItem('access')}`,
         'content-type':'application/json'
      });
    this.apiUrl = ApiMap.api.servicesApi.patch.patchNews;
    return this.http.delete(`${this.baseurl}${this.apiUrl}`,{'headers':this.headers});
  }

  patchUsers(): Observable<Object> {
    this.headers = new Headers(
      {
         'Authorization': `Bearer ${localStorage.getItem('access')}`,
         'content-type':'application/json'
      });
    this.apiUrl = ApiMap.api.servicesApi.patch.patchUsers;
    return this.http.delete(`${this.baseurl}${this.apiUrl}`,{'headers':this.headers});
  }

  patchEducation(): Observable<Object> {
    this.headers = new Headers(
      {
         'Authorization': `Bearer ${localStorage.getItem('access')}`,
         'content-type':'application/json'
      });
    this.apiUrl = ApiMap.api.servicesApi.patch.patchEducation;
    return this.http.delete(`${this.baseurl}${this.apiUrl}`,{'headers':this.headers});
  }

  // ============================== puts ============================

  putNews(): Observable<Object> {
    this.headers = new Headers(
      {
         'Authorization': `Bearer ${localStorage.getItem('access')}`,
         'content-type':'application/json'
      });
    this.apiUrl = ApiMap.api.servicesApi.put.putNews;
    return this.http.delete(`${this.baseurl}${this.apiUrl}`,{'headers':this.headers});
  }

  putUsers(): Observable<Object> {
    this.headers = new Headers(
      {
         'Authorization': `Bearer ${localStorage.getItem('access')}`,
         'content-type':'application/json'
      });
    this.apiUrl = ApiMap.api.servicesApi.put.putUsers;
    return this.http.delete(`${this.baseurl}${this.apiUrl}`,{'headers':this.headers});
  }

  putEducation(): Observable<Object> {
    this.headers = new Headers(
      {
         'Authorization': `Bearer ${localStorage.getItem('access')}`,
         'content-type':'application/json'
      });
    this.apiUrl = ApiMap.api.servicesApi.put.putEducation;
    return this.http.delete(`${this.baseurl}${this.apiUrl}`,{'headers':this.headers});
  }
}
