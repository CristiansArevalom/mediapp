import { NgFor } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { Menu } from 'src/app/model/menu';
import { MenuService } from 'src/app/service/menu.service';

@Component({
  selector: 'app-roles-menu',
  standalone:true,
  templateUrl: './roles-menu.component.html',
  styleUrls: ['./roles-menu.component.css'],
  imports: [MaterialModule, RouterLink,NgFor,RouterOutlet],
})
export class RolesMenuComponent implements OnInit{

  displayedColumns:string[]=['idMenu','name','icon','url','actions'];
  dataSource : MatTableDataSource<Menu>;

  
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  totalElements: number = 0;

  constructor(
    private menuService: MenuService,
    private _snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    
    this.menuService.getMenuChange().subscribe(data => {
      this.createTable(data);
    });

    this.menuService.getMessageChange().subscribe(data => {
      this._snackBar.open(data, 'INFO', { duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'});
    });

    /*
    this.menuService.findAll().subscribe((data) =>{
      this.createTable(data);
    })*/

    this.menuService.listPageable(0,2).subscribe(data =>{
      this.totalElements = data.totalElements;
      this.createTable(data.content);
    })


  }

  createTable(data : Menu[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    
  }

  applyFilter(e:any){
    this.dataSource.filter = e.target.value.trim();
  }

  showMore(e: any){
    this.menuService.listPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.totalElements = data.totalElements;
      this.createTable(data.content);
    });
  }


}
