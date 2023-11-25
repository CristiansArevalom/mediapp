import { Routes } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { PatientEditComponent } from './patient/patient-edit/patient-edit.component';
import { MedicComponent } from './medic/medic.component';
import { ExamComponent } from './exam/exam.component';
import { ExamEditComponent } from './exam/exam-edit/exam-edit.component';
import { SpecialtyComponent } from './specialty/specialty.component';
import { SpecialtyEditComponent } from './specialty/specialty-edit/specialty-edit.component';
import { ConsultAutocompleteComponent } from './consult-autocomplete/consult-autocomplete.component';
import { ConsultWizardComponent } from './consult-wizard/consult-wizard.component';
import { SearchComponent } from './search/search.component';
import { ReportComponent } from './report/report.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CertGuard } from '../guard/cert.guard';
import { Not403Component } from './not403/not403.component';
import { ProfileComponent } from './profile/profile.component';
import { SignsComponent } from './signs/signs.component';
import { SignEditComponent } from './signs/sign-edit/sign-edit.component';
import { RolComponent } from './rol/rol.component';
import { RolEditComponent } from './rol/rol-edit/rol-edit.component';
import { MenuComponent } from './menu/menu.component';
import { MenuEditComponent } from './menu/menu-edit/menu-edit.component';
import { RolesMenuComponent } from './roles-menu/roles-menu.component';
import { RolesMenuEditComponent } from './roles-menu/roles-menu-edit/roles-menu-edit.component';
import { RolesUserComponent } from './roles-user/roles-user.component';
import { RolesUserEditComponent } from './roles-user/roles-user-edit/roles-user-edit.component';

export const PagesRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [CertGuard] },
  {
    path: 'patient',
    component: PatientComponent,
    children: [
      {
        path: 'new',
        component: PatientEditComponent,
      },
      {
        path: 'edit/:id',
        component: PatientEditComponent,
      },
    ], canActivate: [CertGuard],
  },
  {
    path: 'exam',
    component: ExamComponent,
    children: [
      {
        path: 'new',
        component: ExamEditComponent,
      },
      {
        path: 'edit/:id',
        component: ExamEditComponent,
      },
    ], canActivate: [CertGuard],
  },
  {
    path: 'specialty',
    component: SpecialtyComponent,
    children: [
      {
        path: 'new',
        component: SpecialtyEditComponent,
      },
      {
        path: 'edit/:id',
        component: SpecialtyEditComponent,
      },
    ], canActivate: [CertGuard],
  },
  {
    path: 'signs',
    component: SignsComponent, children: [
      {
        path: 'new',
        component: SignEditComponent
      },
      {
        path: "edit/:id",
        component: SignEditComponent,
      }
    ], canActivate: [CertGuard]
  },
  {
    path: 'rol',
    component:RolComponent, children: [
      {
        path:'new',
        component:RolEditComponent
      },
      {
        path:'edit/:id',
        component:RolEditComponent,
      }
    ], canActivate: [CertGuard]

  },
  {
    path: 'menu',
    component:MenuComponent, children:[
      {
        path:'new',
        component:MenuEditComponent
      },
      {
        path:'edit/:id',
        component:MenuEditComponent
      }
    ],canActivate: [CertGuard]
    
  },
  {
    path: 'menu-rol',
    component:RolesMenuComponent, children:[
      {
        path:'edit/:id',
        component: RolesMenuEditComponent
      }
    ], canActivate:[CertGuard]
  },
  {
    path: 'user-rol',
    component:RolesUserComponent,children:[
      {
        path:'edit/:id',
        component:RolesUserEditComponent
      },
    ],canActivate:[CertGuard]
  },

  { path: 'medic', component: MedicComponent, canActivate: [CertGuard] },
  { path: 'consult-autocomplete', component: ConsultAutocompleteComponent, canActivate: [CertGuard] },
  { path: 'consult-wizard', component: ConsultWizardComponent, canActivate: [CertGuard] },
  { path: 'search', component: SearchComponent, canActivate: [CertGuard] },
  { path: 'report', component: ReportComponent, canActivate: [CertGuard] },
  { path: 'not-403', component: Not403Component },
  { path: 'profiles', component: ProfileComponent, canActivate: [CertGuard] },
];

