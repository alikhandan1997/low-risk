import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  itemId;

  // ======================== gets ============================

  getAdminUsers(data): Observable<Object> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    let options = {
      headers: httpHeaders
    };
    this.apiUrl = ApiMap.api.servicesApi.get.getAdminUsers;
    return this.http.get(`${this.baseurl}${this.apiUrl}${data ? data + '/': ''}`,options);
  }

  getAdminNews(data): Observable<Object> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    let options = {
      headers: httpHeaders
    };
    this.apiUrl = ApiMap.api.servicesApi.get.getAdminNews;
    return this.http.get(`${this.baseurl}${this.apiUrl}${data ? data + '/': ''}`,options);
  }

  getAdminEducations(data): Observable<Object> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    let options = {
      headers: httpHeaders
    };
    this.apiUrl = ApiMap.api.servicesApi.get.getAdminEducation;
    return this.http.get(`${this.baseurl}${this.apiUrl}${data ? data + '/': ''}`,options);
  }

  // interface get items

  getNews(data): Observable<Object> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')

    let options = {
      headers: httpHeaders
    };
    this.apiUrl = ApiMap.api.servicesApi.get.getNews;
    return this.http.get(`${this.baseurl}${this.apiUrl}${data ? data + '/': ''}`,options);
  }

  getEducations(data): Observable<Object> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')

    let options = {
      headers: httpHeaders
    };
    this.apiUrl = ApiMap.api.servicesApi.get.getEducation;
    return this.http.get(`${this.baseurl}${this.apiUrl}${data ? data + '/': ''}`,options);
  }

// =============================== posts ========================================

  postRegister(data): Observable<Object>{
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    let options = {
      headers: httpHeaders
    };
    this.data = data;
    this.apiUrl = ApiMap.api.servicesApi.post.postRegister;
    return this.http.post(`${this.baseurl}${this.apiUrl}`,data,options);
  }

  postLogin(data): Observable<Object>{
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    let options = {
      headers: httpHeaders
    };
    this.apiUrl = ApiMap.api.servicesApi.post.postLogin;
    return this.http.post(`${this.baseurl}${this.apiUrl}`,data,options);
  }

  postٔNews(data): Observable<Object>{
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    let options = {
      headers: httpHeaders
    };
    this.data = data;
    this.apiUrl = ApiMap.api.servicesApi.post.postNews;
    return this.http.post(`${this.baseurl}${this.apiUrl}`,data,options);
  }

  postCaptcha(): Observable<Object>{
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')

    let options = {
      headers: httpHeaders
    };
    this.apiUrl = ApiMap.api.servicesApi.post.postCaptcha;
    return this.http.post(`${this.baseurl}${this.apiUrl}`,options);
  }

  postEducation(data): Observable<Object>{
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    let options = {
      headers: httpHeaders
    };
    this.apiUrl = ApiMap.api.servicesApi.post.postEducation;
    return this.http.post(`${this.baseurl}${this.apiUrl}`,data,options);
  }

  // ========================  delete ========================

  deleteNews(itemId): Observable<Object> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    let options = {
      headers: httpHeaders
    };
    this.apiUrl = ApiMap.api.servicesApi.delete.deleteNews;
    return this.http.delete(`${this.baseurl}${this.apiUrl}${itemId ? itemId + '/': ''}`,options);
  }

  deleteUsers(itemId): Observable<Object> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    let options = {
      headers: httpHeaders
    };
    this.apiUrl = ApiMap.api.servicesApi.delete.deleteUsers;
    return this.http.delete(`${this.baseurl}${this.apiUrl}${itemId ? itemId + '/': ''}`,options);
  }

  deleteEducation(itemId): Observable<Object> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    let options = {
      headers: httpHeaders
    };
    this.apiUrl = ApiMap.api.servicesApi.delete.deleteEducation;
    return this.http.delete(`${this.baseurl}${this.apiUrl}${itemId ? itemId + '/': ''}`,options);
  }

  // =========================== patchs ===========================

  patchNews(data): Observable<Object> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    let options = {
      headers: httpHeaders
    };
    this.apiUrl = ApiMap.api.servicesApi.patch.patchNews;
    return this.http.patch(`${this.baseurl}${this.apiUrl}`, data,options);
  }

  patchUsers(data): Observable<Object> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    let options = {
      headers: httpHeaders
    };
    this.apiUrl = ApiMap.api.servicesApi.patch.patchUsers;
    return this.http.patch(`${this.baseurl}${this.apiUrl}`, data,options);
  }

  patchEducation(data): Observable<Object> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    let options = {
      headers: httpHeaders
    };
    this.apiUrl = ApiMap.api.servicesApi.patch.patchEducation;
    return this.http.patch(`${this.baseurl}${this.apiUrl}`, data,options);
  }

  // ============================== puts ============================

  putNews(data,itemId): Observable<Object> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    let options = {
      headers: httpHeaders
    };
    this.apiUrl = ApiMap.api.servicesApi.put.putNews;
    return this.http.put(`${this.baseurl}${this.apiUrl}${itemId ? itemId + '/': ''}`, data,options);
  }

  putUsers(data,itemId): Observable<Object> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    let options = {
      headers: httpHeaders
    };
    this.apiUrl = ApiMap.api.servicesApi.put.putUsers;
    return this.http.put(`${this.baseurl}${this.apiUrl}${itemId ? itemId + '/': ''}`, data,options);
  }

  putEducation(data,itemId): Observable<Object> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    let options = {
      headers: httpHeaders
    };
    this.apiUrl = ApiMap.api.servicesApi.put.putEducation;
    return this.http.put(`${this.baseurl}${this.apiUrl}${itemId ? itemId + '/': ''}`, data,options);
  }
}
