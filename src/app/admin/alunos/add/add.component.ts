import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map, Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  newStudentForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(3)]],
    lastname: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    telephone: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    address: this.fb.group({
      cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      n: ['', [Validators.required]],
      complement: [''],
      street: [''],
      district: [''],
      city: [''],
      state: [''],
    })
  });

  unsubscribe$: Subject<any> = new Subject();

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
  }

  validateCep(cep: string): boolean {
    const validateCep = /^[0-9]{8}$/;

    return validateCep.test(cep);
  }

  getAddress(inputValue: any) {
    let cep = inputValue.target.value.replace(/\D/g, '');

    if (this.validateCep(cep)) {
      this.http.get("https://viacep.com.br/ws/" + cep + "/json")
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => this.showAddress(data));
    }
  }

  showAddress(data: any) {
    this.newStudentForm.patchValue({

      address: {
        street: data.logradouro,
        district: data.bairro,
        city: data.localidade,
        state: data.uf.toUpperCase(),
      }

    })

    console.log(data);
  }

  onSubmit() {
    console.log(this.newStudentForm.value)
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
  }
}
