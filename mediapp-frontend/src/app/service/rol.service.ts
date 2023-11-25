import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Rol } from '../model/rol';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService{

  private url : string = `${environment.HOST}/roles`;
  private rolChange:Subject<Rol[]> = new Subject<Rol[]>(); //Subject es para la programaciónReactiva para poder notificar que se hizo un cambio
  private messageChange: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient){
  }

  findAll(){
    return this.http.get<Rol[]>(this.url);
  }

  findById(id :number){
    return this.http.get<Rol>(`${this.url}/${id}`);
  }

  save(rol: Rol){
    return this.http.post(this.url,rol);
  }

  update(id: number,rol: Rol){
    return this.http.put(`${this.url}/${id}`,rol);
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  /////////////////////
  getRolChange(){
    return this.rolChange.asObservable();
  }
  setRolChange(data:Rol[]){
    this.rolChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }
  setMessageChange(data:string){
    this.messageChange.next(data);
  }
}
