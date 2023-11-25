import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { Menu } from 'src/app/model/menu';
import { Rol } from 'src/app/model/rol';
import { User } from 'src/app/model/user';
import { MenuService } from 'src/app/service/menu.service';
import { RolService } from 'src/app/service/rol.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-roles-menu-edit',
  templateUrl: './roles-menu-edit.component.html',
  standalone: true,
  styleUrls: ['./roles-menu-edit.component.css'],
  imports: [MaterialModule, ReactiveFormsModule, AsyncPipe, NgFor, RouterLink, NgIf]
})
export class RolesMenuEditComponent implements OnInit {




  form: FormGroup;
  isEdit: boolean;
  idMenu: number;
  menus: Menu[];
  roles: Rol[];
  menuControl: FormControl = new FormControl();
  menuFiltered$: Observable<Menu[]>

  //rolesSelected: Rol[] = []; //para la lsita temporal de roles
  rolesSelected = new Set<Rol>();

  menuRoles: Rol[];
  /*
    menuSelected :Menu;*/


  constructor(
    private route: ActivatedRoute, //esta permite saber info de la ruta en el momento
    private menuService: MenuService,
    private rolService: RolService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      // user: new FormControl()
      menu: this.menuControl,
      rol: new FormControl(),
    });

    this.loadInitialData();

    //3 se crea un formControly se asocia valueChanges para validar si existe un cabmbio cuando se escribe alguna letra, esta plabara la evaluan en el paso 4 y retorna lalsita d elo que conicide
    this.menuFiltered$ = this.menuControl.valueChanges.pipe(map(val => this.filterMenu(val)));

    this.route.params.subscribe(data => {
      this.idMenu = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    })

  }


  initForm() {
    if (this.isEdit) {
      this.menuService.findById(this.idMenu).subscribe(data => {
        this.form = new FormGroup({
          menu: new FormControl(data),
          rol: new FormControl(data.roles)
        })
        this.menuRoles = data.roles;
        console.log(data)

        /*
        this.menuControl.setValue(data);
        this.menuSelected = data;
        this.menuRoles=data.roles;*/
      })
    }
  }

  loadInitialData() {
    this.menuService.findAll().subscribe(data => {
      this.menus = data
    });
    this.rolService.findAll().subscribe(data => this.roles = data);

  }

  filterMenu(val: any) { //4 para filtrar usuario 
    if (val?.idMenu > 0) {
      return this.menus.filter(el =>
        el.name.toLowerCase().includes(val.name.toLowerCase()));

    } else {
      return this.menus.filter(el =>
        el.name.toLowerCase().includes(val?.toLowerCase()));
    }

  }

  showMenu(val: any) {
    return val ? `${val.name}` : val;
  }
  /*
  
    selectedMenu(e:MatAutocompleteSelectedEvent){
      this.menuSelected=e.option.value;
      this.menuRoles=e.option.value.roles;
      
    }*/
  addRol() {

    const set = new Set()
    if (this.form.value['rol'] != null) {
      this.rolesSelected.add(this.form.value['rol']);

      //this.rolesSelected.push(this.form.value['rol']);
      console.log(this.rolesSelected);
    } else {
      this._snackBar.open('Please select a rol', 'INFO', { duration: 2000 });

    }
  }
  removeRol(rol:Rol){
    this.rolesSelected.delete(rol);
  }

  save() {
    if (this.form.invalid || this.rolesSelected.size == 0) {
      console.log("error")
      return;
    }

    const menu = this.form.value['menu'];
    menu.roles = Array.from(this.rolesSelected.values());

    if (this.isEdit) {
      this.menuService.update(this.idMenu,menu).pipe(switchMap(() => { 
        return this.menuService.findAll();
      })).subscribe(
        data => {
          console.log(data);
          this.menuService.setMessageChange('Se asignaron los roles!')

        }
      );
      this.router.navigate(['/pages/menu-rol']);
    }
  }


}
