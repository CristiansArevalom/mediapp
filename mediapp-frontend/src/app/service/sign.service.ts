import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Sign } from '../model/sign';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class SignService extends GenericService<Sign>{

  //private url: string = `${environment.HOST}/signs`; //ES6
  private signChange: Subject<Sign[]> = new Subject<Sign[]>();
  private messageChange: Subject<string> = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/signs`);
  }
   /* 
      constructor(http: HttpClient) {
    super(
      http,
      `${environment.HOST}/signs`);
  }

  findAll(){
    return this.http.get<Sign[]>(this.url);
  }
  findById(id: number){
    return this.http.get<Sign>(`${this.url}/${id}`);
  }

  save(sign: Sign){
    return this.http.post(this.url, sign);
  }

  update(id: number, sign: Sign){
    return this.http.put(`${this.url}/${id}`, sign);
  }

  delete(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }*/
  
  //////////
  getSignsChange(){
    return this.signChange.asObservable();
  }
  setSignChange(data:Sign[]){
    this.signChange.next(data);
  }

  setMessageChange(data: string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }
  

}
