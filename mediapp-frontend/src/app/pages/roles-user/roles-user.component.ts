import { NgFor } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-roles-user',
  standalone:true,
  templateUrl: './roles-user.component.html',
  styleUrls: ['./roles-user.component.css'],
  imports:[MaterialModule, RouterLink, NgFor,RouterOutlet],
})
export class RolesUserComponent implements OnInit {


  displayedColumns:string[]=['idUser','username','actions'];
  dataSource : MatTableDataSource<User>;
  
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  totalElements: number = 0;

  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar
  ){}


  ngOnInit(): void {
    
    this.userService.getUserChange().subscribe(data => {
      this.createTable(data);
    });

    this.userService.getMessageChange().subscribe(data => {
      this._snackBar.open(data, 'INFO', { duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'});
    });


    this.userService.listPageable(0,2).subscribe(data =>{
      this.totalElements = data.totalElements;
      this.createTable(data.content);
    })

  }

  createTable(data : User[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    
  }

  applyFilter(e:any){
    this.dataSource.filter = e.target.value.trim();
  }

  
  showMore(e: any){
    this.userService.listPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.totalElements = data.totalElements;
      this.createTable(data.content);
    });
  }

}
