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

    this.apiUrl = ApiMap.api.servicesApi.get.getAdminUsers;
    return this.http.get(`${this.baseurl}${this.apiUrl}${data ? data + '/': ''}`,{
      headers: httpHeaders
    });
  }

  getAdminNews(data): Observable<Object> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    this.apiUrl = ApiMap.api.servicesApi.get.getAdminNews;
    return this.http.get(`${this.baseurl}${this.apiUrl}${data ? data + '/': ''}`,{
      headers: httpHeaders
    });
  }

  getAdminEducations(data): Observable<Object> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    this.apiUrl = ApiMap.api.servicesApi.get.getAdminEducation;
    return this.http.get(`${this.baseurl}${this.apiUrl}${data ? data + '/': ''}`,{
      headers: httpHeaders
    });
  }

  // interface get items

  getNews(data): Observable<Object> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')

    this.apiUrl = ApiMap.api.servicesApi.get.getNews;
    return this.http.get(`${this.baseurl}${this.apiUrl}${data ? data + '/': ''}`,{
      headers: httpHeaders,
      observe: 'body',
      responseType: 'json'
    });
  }

  getEducations(data): Observable<Object> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')

    this.apiUrl = ApiMap.api.servicesApi.get.getEducation;
    return this.http.get(`${this.baseurl}${this.apiUrl}${data ? data + '/': ''}`,{
      headers: httpHeaders
    });
  }

// =============================== posts ========================================

  postRegister(data): Observable<Object>{
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    this.data = data;
    this.apiUrl = ApiMap.api.servicesApi.post.postRegister;
    return this.http.post(`${this.baseurl}${this.apiUrl}`,data,{
      headers: httpHeaders
    });
  }

  postLogin(data): Observable<Object>{
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    this.apiUrl = ApiMap.api.servicesApi.post.postLogin;
    return this.http.post(`${this.baseurl}${this.apiUrl}`,data,{
      headers: httpHeaders
    });
  }

  postٔNews(data): Observable<Object>{

    let httpHeaders = new HttpHeaders()
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    this.apiUrl = ApiMap.api.servicesApi.post.postNews;
    return this.http.post(`${this.baseurl}${this.apiUrl}`,data,{
      headers: httpHeaders
    });
  }

  postCaptcha(): Observable<Object>{
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')

    this.apiUrl = ApiMap.api.servicesApi.post.postCaptcha;
    return this.http.post(`${this.baseurl}${this.apiUrl}`,{
      headers: httpHeaders
    });
  }

  postEducation(data): Observable<Object>{
    let httpHeaders = new HttpHeaders()
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    this.apiUrl = ApiMap.api.servicesApi.post.postEducation;
    return this.http.post(`${this.baseurl}${this.apiUrl}`,data,{
      headers: httpHeaders
    });
  }

  // ========================  delete ========================

  deleteNews(itemId): Observable<Object> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    this.apiUrl = ApiMap.api.servicesApi.delete.deleteNews;
    return this.http.delete(`${this.baseurl}${this.apiUrl}${itemId ? itemId + '/': ''}`,{
      headers: httpHeaders
    });
  }

  deleteUsers(itemId): Observable<Object> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    this.apiUrl = ApiMap.api.servicesApi.delete.deleteUsers;
    return this.http.delete(`${this.baseurl}${this.apiUrl}${itemId ? itemId + '/': ''}`,{
      headers: httpHeaders
    });
  }

  deleteEducation(itemId): Observable<Object> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    this.apiUrl = ApiMap.api.servicesApi.delete.deleteEducation;
    return this.http.delete(`${this.baseurl}${this.apiUrl}${itemId ? itemId + '/': ''}`,{
      headers: httpHeaders
    });
  }

  // =========================== patchs ===========================

  patchNews(data): Observable<Object> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    this.apiUrl = ApiMap.api.servicesApi.patch.patchNews;
    return this.http.patch(`${this.baseurl}${this.apiUrl}`, data,{
      headers: httpHeaders
    });
  }

  patchUsers(data): Observable<Object> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    this.apiUrl = ApiMap.api.servicesApi.patch.patchUsers;
    return this.http.patch(`${this.baseurl}${this.apiUrl}`, data,{
      headers: httpHeaders
    });
  }

  patchEducation(data): Observable<Object> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    this.apiUrl = ApiMap.api.servicesApi.patch.patchEducation;
    return this.http.patch(`${this.baseurl}${this.apiUrl}`, data,{
      headers: httpHeaders
    });
  }

  // ============================== puts ============================

  putNews(data,itemId): Observable<Object> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    this.apiUrl = ApiMap.api.servicesApi.put.putNews;
    return this.http.put(`${this.baseurl}${this.apiUrl}${itemId ? itemId + '/': ''}`, data,{
      headers: httpHeaders
    });
  }

  putUsers(data,itemId): Observable<Object> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    this.apiUrl = ApiMap.api.servicesApi.put.putUsers;
    return this.http.put(`${this.baseurl}${this.apiUrl}${itemId ? itemId + '/': ''}`, data,{
      headers: httpHeaders
    });
  }

  putEducation(data,itemId): Observable<Object> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',`Bearer ${localStorage.getItem('access')}`);

    this.apiUrl = ApiMap.api.servicesApi.put.putEducation;
    return this.http.put(`${this.baseurl}${this.apiUrl}${itemId ? itemId + '/': ''}`, data,{
      headers: httpHeaders
    });
  }
}
