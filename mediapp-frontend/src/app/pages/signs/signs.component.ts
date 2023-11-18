import { NgFor } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { switchMap } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { Sign } from 'src/app/model/sign';
import { SignService } from 'src/app/service/sign.service';

@Component({
  selector: 'app-signs',
  standalone: true,
  templateUrl: './signs.component.html',
  styleUrls: ['./signs.component.css'],
  imports: [MaterialModule,NgFor, RouterLink, RouterOutlet],
})

export class SignsComponent implements OnInit{

  displayedColumns: string[] = ['id', 'signDate', 'temperature', 'pulse','rhythm','patient','actions'];
  dataSource: MatTableDataSource<Sign>;

  @ViewChild(MatPaginator) paginator:MatPaginator
  @ViewChild(MatSort) sort : MatSort;//hace funcionar el matsort
  //signs : Sign[] = [];
   constructor(
    private signService: SignService,
    private route:ActivatedRoute,    
    private _snackBar: MatSnackBar,    
    ){

  }
  ngOnInit(): void {

    //esto solo se activa cuando le hagan un next
    this.signService.getSignsChange().subscribe(data =>{
        this.createTable(data); 
    });
    this.signService.findAll().subscribe(data =>{
      this.createTable(data);
    });

    this.signService.getMessageChange().subscribe(data =>{
      this._snackBar.open(data, 'INFO', {duration:2000});
    });
    /*
    this.signService.findAll().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this,this.dataSource.paginator=this.paginator;
    });*/
  }
  

  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim();
  }

  delete(idSign: number){
    this.signService.delete(idSign).pipe(switchMap( ()=> {
      return this.signService.findAll();
    }))
    .subscribe(data => {
      this.signService.setSignChange(data);
      this.signService.setMessageChange('DELETED!');
    })
    ;
  }

  checkChildren():boolean{
    return this.route.children.length>0;
  }

  createTable(data: Sign[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this,this.dataSource.paginator=this.paginator
  }
}
