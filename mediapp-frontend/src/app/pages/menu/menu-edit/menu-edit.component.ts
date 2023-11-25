import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { Menu } from 'src/app/model/menu';
import { MenuService } from 'src/app/service/menu.service';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-menu-edit',
  standalone: true,
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.css'],
  imports:[MaterialModule,NgIf,ReactiveFormsModule,RouterLink,NgIf],
})
export class MenuEditComponent implements OnInit{

  form: FormGroup;
  id: number;
  isEdit: boolean;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuService: MenuService,
    private _snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.form = new FormGroup({
      idMenu: new FormControl(0),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      icon: new FormControl('', [Validators.required, Validators.minLength(3)]),
      url: new FormControl('', [Validators.required, Validators.minLength(3)]),

    });

    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    });
  }

  initForm(){
    if(this.isEdit){
      
      this.menuService.findById(this.id).subscribe(data => {
        this.form = new FormGroup({
          idMenu: new FormControl(data.idMenu),
          name: new FormControl(data.name, [Validators.required, Validators.minLength(3)]),
          icon: new FormControl(data.icon, [Validators.required, Validators.minLength(3)]),
          url: new FormControl(data.url, [Validators.required, Validators.minLength(3)]),
    
        });
      });
    }
  }
  operate(){
    if(this.form.invalid){
      this._snackBar.open('FORM IS INVALID', 'INFO', { duration: 2000});
      return;
    }

    const menu: Menu = new Menu();
    menu.idMenu = this.form.value['idMenu'];
    menu.name = this.form.value['name'];
    menu.icon = this.form.value['icon'];
    menu.url = this.form.value['url'];

    if(this.isEdit){
      //UPDATE
      this.menuService.update(this.id,menu).pipe(switchMap( () =>{
        return this.menuService.findAll();
      }) ).subscribe(data =>{
        this.menuService.setMenuChange(data);
        this.menuService.setMessageChange('UPDATED!');
        
      });
    }else{
      //INSERT
      this.menuService.save(menu).pipe(switchMap( () =>{
        return this.menuService.findAll();
      }) ).subscribe(data =>{
        this.menuService.setMenuChange(data);
        this.menuService.setMessageChange('CREATED!');
        
      });
    }
    this.router.navigate(['/pages/menu'])

  }
  
}
