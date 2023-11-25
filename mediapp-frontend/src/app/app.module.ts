import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ServerErrorsInterceptor } from './interceptor/server-errors-interceptor';
import { environment } from 'src/environments/environment.development';
import { JwtModule } from '@auth0/angular-jwt';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RolesUserComponent } from './pages/roles-user/roles-user.component';
import { RolesUserEditComponent } from './pages/roles-user/roles-user-edit/roles-user-edit.component';



export function tokenGetter() {
  return sessionStorage.getItem(environment.TOKEN_NAME);
}

@NgModule({
  declarations: [
    AppComponent,
    //PatientComponent, PatientEditComponent, MedicComponent, se remueve por que ahora es standalone 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        //allowedDomains: ["146.190.214.184/mediapp-backend"],
        allowedDomains: [`localhost:8080`], //aca solo va la url sin el http para que se logre propagar el token
        disallowedRoutes: ["http://146.190.214.184/mediapp-backend/login/forget"],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true
    },
    {
      provide: LocationStrategy, useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
