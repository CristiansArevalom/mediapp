import { NgFor } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink, RouterOutlet } from '@angular/router';
import { switchMap } from 'rxjs';

import { MaterialModule } from 'src/app/material/material.module';
import { Rol } from 'src/app/model/rol';
import { RolService } from 'src/app/service/rol.service';

@Component({
  selector: 'app-rol',
  standalone:true,
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css'],
  imports:[MaterialModule, NgFor,RouterOutlet,RouterLink],
})

export class RolComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description','actions'];
  dataSource: MatTableDataSource<Rol>;

  @ViewChild(MatSort) sort : MatSort; //captura el texto para que funcione el sort
  @ViewChild(MatPaginator) paginator : MatPaginator; //asocia la data con el paginator para cmabiar cantidad deelemtnos


  constructor(
    private rolService: RolService,
    private _snackBar:MatSnackBar //para mostrar un mensaje
    
    ){
  }
  ngOnInit(): void {

    /*esto es para poder actualizar los datos de la  tabla cada vez que se haya un insert, update , getRolChange se activa cada vez que en rol-Edit 
    hagan un setRolChange (que por debajo corre un next para indicar que surgio un cambio)*/
    this.rolService.getRolChange().subscribe(data=>{ //este metodo solo se ejecutara cuando a este observable en algun lado del codigo le hayan ehcho next
      this.createTable(data); 
    })

    this.rolService.getMessageChange().subscribe(data =>{
      this._snackBar.open(data,'INFO',{duration:2000});
    });

    this.rolService.findAll().subscribe((data) => {
      this.createTable(data)
      /*
      this.dataSource = new MatTableDataSource(data); //para asociar la data del service con la tabla
      this.dataSource.sort = this.sort;//para que funcione el sorrt
      this.dataSource.paginator= this.paginator;
      */
    });
  }

  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim();
  }

  createTable(data){
    this.dataSource = new MatTableDataSource(data); //para asociar la data del service con la tabla
    this.dataSource.sort = this.sort;//para que funcione el sorrt
    this.dataSource.paginator= this.paginator;
  }
  delete(idRole: number){
    this.rolService.delete(idRole)
      .pipe(switchMap(() => this.rolService.findAll()))
      .subscribe(data=>{
        this.createTable(data);
        this.rolService.setMessageChange('deleted!');
    })
  }
}
