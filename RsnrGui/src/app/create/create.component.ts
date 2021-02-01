import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IPerson } from '../model/IPerson';
import { Medborjarskap } from '../model/Medborjarskap';
import { SrnsService } from '../srns.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
//import { ErrorMessage } from 'ng-bootstrap-form-validation';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  personForm: FormGroup;
  person: IPerson;
  countries: Medborjarskap[];

  // Variable to store shortLink from api response 
  shortLink: string = "";
  loading: boolean = false; // Flag variable 
  file: File = null;// Variable to store file 

  constructor(private fb: FormBuilder, private pService: SrnsService, private router: Router, private datePipe: DatePipe) {

    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        maxDate: new Date(),
        dateInputFormat: 'DD/MM/YYYY',
      });
  }

  ngOnInit(): void {
    this.personForm = this.fb.group({
      /*Dokumentuppgifter*/
      Namn_kontaktperson: ['', [Validators.required, Validators.minLength(2),
      Validators.maxLength(20)]],
      phone: ['', Validators.required],
      E_post_kontaktperson: ['', [Validators.required, Validators.email]],
      Handling: ['', Validators.required],
      medbor: ['', Validators.required],
      dateOf: ['', Validators.required],
      Födelseår: [''],
      Födelsemånad: [''],
      Födelsedag: [''],
      kön: ['', Validators.required],

      // Ärendeuppgifter/Person
      Efternamn: ['', Validators.required],
      Förnamn: ['', Validators.required],
      Ytterligare_namnuppgift: [''],
      Födelseort_i_utlandet: ['', Validators.required],

      // Ärendeuppgifter/Kontaktadress
      CO_adress: [''],
      Adressfortsättning: [''],
      Gatudress: ['', Validators.required],
      Lagenhetsnummer: ['', Validators.required],
      Postnummer: ['', Validators.required],
      Postort: ['', Validators.required],

      FaststalltId: [''],
      UnderlagId: [''],
      Övriga_upplysningar: [''],


    });
    this.person = {
      /*Dokumentuppgifter*/
      // id: null,
      Namn_kontaktperson: '',
      phone: null,
      E_post_kontaktperson: null,
      //Handling: null,

      // Ärendeuppgifter/Person
      medbor: null,
      //dateOf: null,
      Födelseår: null,
      Födelsemånad: null,
      Födelsedag: null,
      kön: null,

      Efternamn: null,
      Förnamn: null,
      Ytterligare_namnuppgift: null,
      Födelseort_i_utlandet: null,

      // Ärendeuppgifter/Kontaktadress
      CO_adress: null,
      Adressfortsättning: null,
      Gatudress: null,
      Lagenhetsnummer: null,
      Postnummer: null,
      Postort: null,

      //Ärendeuppgifter/Övrigt
      FaststalltId: null,
      UnderlagId: null,
      Övriga_upplysningar: null,

    };
    this.pService.getCountries().subscribe(
      (listCountries) => this.countries = listCountries,
      (err) => console.log(err)
    );

  }

  get f() {
    return this.personForm.controls;
  }


  onSubmit(): void {
    console.log("det är coutries: " + this.countries.length);
    this.mapFormValuesToPersonModel();

    console.log("det är namnet: " + this.personForm.value.efterName);

    this.pService.addPerson(this.person).subscribe(
      //() => this.router.navigate(['employees']),
      (err: any) => console.log(err)
    );

  }


  mapFormValuesToPersonModel(): void {
    /*Dokumentuppgifter*/
    this.person.Namn_kontaktperson = this.personForm.value.Namn_kontaktperson;
    this.person.phone = this.personForm.value.phone;
    this.person.E_post_kontaktperson = this.personForm.value.E_post_kontaktperson;

    // Ärendeuppgifter/Person
    this.person.medbor = this.personForm.value.medbor;
    let dateString = (this.personForm.value.dateOf);
    let Födelseår = this.datePipe.transform(dateString, 'yyyy');
    this.person.Födelseår = Object(Födelseår);

    let Födelsemånad = this.datePipe.transform(dateString, 'MM');
    this.person.Födelsemånad = Object(Födelsemånad);

    let Födelsedag = this.datePipe.transform(dateString, 'dd');
    this.person.Födelsedag = Object(Födelsedag);
    this.person.Efternamn = this.personForm.value.Efternamn;

    this.person.kön = this.personForm.value.kön;
    this.person.Efternamn = this.personForm.value.Efternamn;
    this.person.Förnamn = this.personForm.value.Förnamn;
    this.person.Ytterligare_namnuppgift = this.personForm.value.Ytterligare_namnuppgift;
    this.person.Födelseort_i_utlandet = this.personForm.value.Födelseort_i_utlandet;

    // Ärendeuppgifter/Kontaktadress
    this.person.CO_adress = this.personForm.value.O_adress;
    this.person.Adressfortsättning = this.personForm.value.Adressfortsättning;
    this.person.Gatudress = this.personForm.value.Gatudress;
    this.person.Lagenhetsnummer = this.personForm.value.Lagenhetsnummer;
    this.person.Postnummer = this.personForm.value.Postnummer;
    this.person.Postort = this.personForm.value.Postort;
    // this.person.dateOf = this.personForm.value.dateOf;

    //Ärendeuppgifter/Övrigt
    this.person.FaststalltId = this.personForm.value.FaststalltId;
    this.person.UnderlagId = this.personForm.value.UnderlagId;
    this.person.Övriga_upplysningar = this.personForm.value.Övriga_upplysningar;
  }


  /* upload file */
  onChange(event) {
    this.file = event.target.files[0];
  }

  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.pService.uploadFile(this.file).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          //För test
          this.shortLink = event.link;//
          this.loading = false; // 
          alert('Success');
        }
      });
  }

}
