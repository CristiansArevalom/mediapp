import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { switchMap } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { Rol } from 'src/app/model/rol';
import { RolService } from 'src/app/service/rol.service';

@Component({
  selector: 'app-rol-edit',
  standalone:true,
  templateUrl: './rol-edit.component.html',
  styleUrls: ['./rol-edit.component.css'],
  imports:[MaterialModule,RouterOutlet,RouterLink,ReactiveFormsModule,NgIf],

})
export class RolEditComponent implements OnInit{
  
  form: FormGroup;
  rolControl:FormControl = new FormControl();
  idRole: number;
  isEdit: boolean;

  constructor(
    private route: ActivatedRoute, //esta permite saber info de la ruta en el momento
    private rolService:RolService,
    private router: Router,
    private _snackBar : MatSnackBar
  ){

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      idRole: new FormControl(0),
      name: new FormControl('',[Validators.required, Validators.minLength(3)]),
      description: new FormControl('',[Validators.required,Validators.minLength(3)]),
    });
    this.route.params.subscribe(data =>{
      this.idRole = data['id'];
      this.isEdit = data['id'] !=null;
      this.initForm();
    });
  }

  initForm(){
    if(this.isEdit){
      this.rolService.findById(this.idRole).subscribe(
        data =>{
          //llenando el formulario con los datos que trae del service.
          this.form = new FormGroup({
            idRole: new FormControl(data.idRole),
          name: new FormControl('',[Validators.required, Validators.minLength(3)]),
            description: new FormControl(data.description,[Validators.required,Validators.minLength(3)])

          });
        });
    }
  }


  operate(){
    if(this.form.invalid){
      this._snackBar.open('FORM IS INVALID', 'INFO', { duration: 2000});
      return;
    }


    const rol = new Rol();
    rol.idRole=this.form.value['idRole'];
    rol.name=this.form.value['name'];
    rol.description=this.form.value['description'];

    if(this.isEdit){
      //UPDATE
      this.rolService.update(this.idRole,rol).pipe(switchMap( () =>{
        return this.rolService.findAll();
      }) ).subscribe(data =>{
        this.rolService.setRolChange(data);
        this.rolService.setMessageChange('UPDATED!');
        
      });
    }else{
      //INSERT
      this.rolService.save(rol).pipe(switchMap( () =>{
        return this.rolService.findAll();
      }) ).subscribe(data =>{
        this.rolService.setRolChange(data);
        this.rolService.setMessageChange('CREATED!');
        
      });
    }

    this.router.navigate(['/pages/rol'])
  }


}
