import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import * as moment from 'moment';
import { Observable, map, switchMap } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { Patient } from 'src/app/model/patient';
import { Sign } from 'src/app/model/sign';
import { PatientService } from 'src/app/service/patient.service';
import { SignService } from 'src/app/service/sign.service';
import { PatientDialogComponent } from '../../patient/patient-dialog/patient-dialog.component';

@Component({
  selector: 'app-sign-edit',
  standalone:true,
  templateUrl: './sign-edit.component.html',
  styleUrls: ['./sign-edit.component.css'],
  imports: [MaterialModule,ReactiveFormsModule,RouterLink,NgIf,NgFor,AsyncPipe],
})
export class SignEditComponent implements OnInit{
  
  form: FormGroup;
  idSign: number;
  isEdit: boolean;
  patients: Patient[];
  patientControl:FormControl = new FormControl();
  patientsFiltered$: Observable<Patient[]>;
  
  minDate:Date = new Date();

  constructor(
    private route: ActivatedRoute, //esta permite saber info de la ruta en el momento
    private patientService: PatientService,
    private signService: SignService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _dialog:MatDialog,

  ){

  }

  ngOnInit(): void {
    this.form=new FormGroup({
      idSign: new FormControl([Validators.required]), //esta e sla maenra de enlazar la variable con el html
      signDate:new FormControl(new Date(),[Validators.required]),
      temperature:new FormControl('',[Validators.required]),
      pulse:new FormControl('',[Validators.required]),
      rhythm:new FormControl('',[Validators.required]),
      patient:this.patientControl,
    });

    //this.patientService.getPatientChange().subscribe(data => {
    this.loadInitialData();
     // });
    this.patientsFiltered$=this.patientControl.valueChanges.pipe(map(val => this.filterPatients(val)))


    this.route.params.subscribe(data =>{
      this.idSign= data['id'];
      this.isEdit = data['id']!=null;
     this.initForm();
    })
  }

  initForm(){
    if(this.isEdit){
      this.signService.findById(this.idSign).subscribe( data => {
        this.form=new FormGroup({
          idSign: new FormControl(data.idSign,[Validators.required]), //esta e sla maenra de enlazar la variable con el html
          signDate:new FormControl(moment(data.signDate, "YYYY-MM-DDTHH:mm:ss").toDate(),[Validators.required]),
          temperature:new FormControl(data.temperature,[Validators.required]),
          pulse:new FormControl(data.pulse,[Validators.required]),
          rhythm:new FormControl(data.rhythm,[Validators.required]),
          patient:new FormControl(data.patient)
        });
      })
    }
  }

  loadInitialData(){
    this.patientService.findAll().subscribe(data => this.patients = data);

  }
  //filterPatients(val:string | Patient){
  filterPatients(val:any){
    if(val?.idPatient>0){
    return this.patients.filter(el => 
      el.firstName.toLowerCase().includes(val.firstName.toLowerCase()) || el.lastName.toLowerCase().includes(val.lastName.toLowerCase()) || el.dni.includes(val.dni.toLowerCase())
      );
    }else{
      return this.patients.filter(el=>
        el.firstName.toLowerCase().includes(val?.toLowerCase()) || el.lastName.toLowerCase().includes(val?.toLowerCase()) || el.dni.includes(val?.toLowerCase())
        );
    }
  }
  showPatient(val: any){
    return val ? `${val.firstName} ${val.lastName}` : val;
  }


  openDialog(){
    this._dialog.open(PatientDialogComponent,{
      width: '350px',
      disableClose: true
    });
    console.log("open dialog")
  }

  save(){
    if(this.form.invalid){
      this._snackBar.open('FORM IS INVALID', 'INFO', { duration: 2000});
      return;
    }


    const sign = new Sign();
    sign.patient=this.form.value['patient']; //aca x el for se le envio el paciente
    sign.signDate=moment(this.form.value['signDate']).format('YYYY-MM-DDTHH:mm:ss');
    sign.temperature=this.form.value['temperature'];
    sign.pulse=this.form.value['pulse'];
    sign.rhythm=this.form.value['rhythm'];

    if(this.isEdit){
        //update, esta forma puede generar callback hell se recomienda la de abajo
        this.signService.update(this.idSign,sign).subscribe(() =>{
          this.signService.findAll().subscribe(data => {
            //envianto al otro componente con subjects
            this.signService.setSignChange(data);
            this.signService.setMessageChange('UPDATED!')

          });
        });

    }else{
      //INSERT
      //PRACTICA IDEAL
        this.signService.save(sign).pipe(switchMap( () => {
          return this.signService.findAll();
        }))
        .subscribe(data => {
          this.signService.setSignChange(data);
          this.signService.setMessageChange('CREATED!')

        });
    }

    this.router.navigate(['/pages/signs']);
  }

  cleanControls(){
    this.form.reset;
    this.patients=[];
  }




}
