import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../model/user';
import { GenericService } from './generic.service';
import { Subject } from 'rxjs';
import { Rol } from '../model/rol';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericService<User> {

  //private url : string = `${environment.HOST}/user`;

  private rolChange:Subject<User[]> = new Subject<User[]>(); //Subject es para la programaciónReactiva para poder notificar que se hizo un cambio
  private messageChange: Subject<string> = new Subject<string>();

  constructor(protected override http: HttpClient){
    super(http,`${environment.HOST}/user` );
  }

  assignRoles(id:number, roles:Rol[]){
    return this.http.put(`${environment.HOST}/user/${id}/role`,roles);
  }
/*
  constructor(private http: HttpClient) {

   }
   findAll(){
    return this.http.get<User[]>(this.url);
   }

   findById(id:number){
    return this.http.get<User[]>(`${this.url}/${id}`);
   }

   update(id:number, user:User){
    return this.http.put(`${this.url}/${id}`,user);
   }
   */
  /////////////////////
  getUserChange(){
    return this.rolChange.asObservable();
  }
  setUserCChange(data:User[]){
    this.rolChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }
  setMessageChange(data:string){
    this.messageChange.next(data);
  }
  
  listPageable(p: number, s: number){
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

}
