import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from 'src/app/material/material.module';
import { Rol } from 'src/app/model/rol';

@Component({
  selector: 'app-rol',
  standalone:true,
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css'],
  imports:[MaterialModule],
})

export class RolComponent {
  displayedColumns: string[] = ['id','description','name'];
  dataSource = new MatTableDataSource<Rol>;



}
