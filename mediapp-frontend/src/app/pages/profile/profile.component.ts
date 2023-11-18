import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']

})
export class ProfileComponent implements OnInit{
  
  username: string;
  roles: string[];

  ngOnInit(): void{
    const helper = new JwtHelperService();
    const decodeToken = helper.decodeToken(sessionStorage.getItem(environment.TOKEN_NAME));
    this.username = decodeToken.sub;
    this.roles = decodeToken.role;
  }
}
