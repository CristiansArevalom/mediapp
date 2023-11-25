import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { Rol } from 'src/app/model/rol';
import { User } from 'src/app/model/user';
import { RolService } from 'src/app/service/rol.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-roles-user-edit',
  standalone:true,
  templateUrl: './roles-user-edit.component.html',
  styleUrls: ['./roles-user-edit.component.css'],
  imports:[MaterialModule, ReactiveFormsModule,AsyncPipe,NgFor,RouterLink,NgIf]

})
export class RolesUserEditComponent {

  
  form: FormGroup;
  isEdit: boolean;
  idUser:number;
  users:User[];
  roles: Rol[];
  userControl : FormControl = new FormControl([Validators.required, Validators.minLength(3)]); 
  userFiltered$ : Observable<User[]>

  userRoles:Rol[];
  rolesSelected = new Set<Rol>();
  


  constructor(
    private userService:UserService,
    private rolService:RolService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute, //esta permite saber info de la ruta en el momento
    private router: Router,

    ){

  }

  ngOnInit(): void {
    this.form = new FormGroup({
     // user: new FormControl()
     user: this.userControl,
     rol: new FormControl(Validators.required),
    });

    this.loadInitialData();
    //3 se crea un formControly se asocia valueChanges para validar si existe un cabmbio cuando se escribe alguna letra, esta plabara la evaluan en el paso 4 y retorna lalsita d elo que conicide
    this.userFiltered$ = this.userControl.valueChanges.pipe(map(val => this.filterUsers(val)));

    this.route.params.subscribe(data => {
      this.idUser = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    })
  }

  initForm(){
    if(this.isEdit){
      this.userService.findById(this.idUser).subscribe(data =>{
        this.form = new FormGroup({
          user: new FormControl(data,[Validators.required, Validators.minLength(3)]),
          rol: new FormControl(data.roles,Validators.required)
        });
        this.userRoles=data.roles;
        console.log(data);
      })
    }
  }

  loadInitialData(){
    this.userService.findAll().subscribe(data =>{
      this.users=data
    });
    this.rolService.findAll().subscribe(data=>this.roles=data);

  }

  filterUsers(val:any){ //4 para filtrar usuario 
    if(val?.idUser>0){
      return this.users.filter(el => 
        el.username.toLowerCase().includes(val.username.toLowerCase()));

    }else{
      return this.users.filter(el =>
         el.username.toLowerCase().includes(val?.toLowerCase()));
    }
    
  }

  showUser(val: any){
    return val ? `${val.username}` : val;
  }


  selectedUser(e:MatAutocompleteSelectedEvent){
    this.userRoles=e.option.value.roles;
    
  }
  addRol(){
    if(this.form.value['rol'] !=null){
      this.rolesSelected.add(this.form.value['rol']);
      console.log(this.rolesSelected);
    }else{
      this._snackBar.open('Please select a rol', 'INFO', {duration: 2000});
    }
  }
  removeRol(rol:Rol){
    this.rolesSelected.delete(rol);
  }

  save(){
    if(this.form.invalid || this.rolesSelected.size==0){
      return;
    }

    const user = this.form.value['user'];
    user.roles = Array.from(this.rolesSelected.values());

    if(this.isEdit){
      console.log(user.roles)
      this.userService.assignRoles(this.idUser,user.roles).pipe(switchMap(
        ()=>{
          return this.userService.findAll();
        }
      )).subscribe(
        data =>{
          console.log(data);
          this.userService.setMessageChange('Se asignaron los roles')
        }
      );
      this.router.navigate(['/pages/user-rol']);

    }

  }

}
