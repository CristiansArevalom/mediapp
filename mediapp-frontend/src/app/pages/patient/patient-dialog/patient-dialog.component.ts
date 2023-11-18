import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/patient.service';


@Component({
  selector: 'app-patient-dialog',
  standalone:true,
  templateUrl: './patient-dialog.component.html',
  styleUrls: ['./patient-dialog.component.css'],
  imports: [MaterialModule,ReactiveFormsModule, RouterLink, NgIf]
})
export class PatientDialogComponent implements OnInit {
  form: FormGroup;

  constructor(private _dialogRef: MatDialogRef<PatientDialogComponent>,
    private router: Router,
    private _snackBar: MatSnackBar,
    private patientService: PatientService,

    ){
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      idPatient: new FormControl(0),
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      dni: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(150)]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(9)]),
      email: new FormControl('', [Validators.required, Validators.email])

    });
  }
  close(){
    this._dialogRef.close();
  }
  operate(){
    if(this.form.invalid){
      this._snackBar.open('FORM IS INVALID', 'INFO', { duration: 2000});
      return;
    }
    const patient: Patient = new Patient();
    patient.idPatient = this.form.value['idPatient'];
    patient.firstName = this.form.value['firstName'];
    patient.lastName = this.form.value['lastName'];
    patient.dni = this.form.value['dni'];
    patient.address = this.form.value['address'];
    patient.phone = this.form.value['phone'];
    patient.email = this.form.value['email'];


    this.patientService.save(patient).pipe(switchMap( ()=> {
      return this.patientService.findAll();          
  })).subscribe(data => {
        this.patientService.setPatientChange(data);
        this._snackBar.open('CREATED', 'INFO', { duration: 2000});
        //this.patientService.setMessageChange('CREATED!');
        console.log("paciente creado")
      });
//PDT ACTUALIZAR EL INPUT DE Patient EN SIGN-EDIT
     this.close()
  }



    //Para evitar el forms.control en el html
    get f(){
      return this.form.controls;
    }
}
