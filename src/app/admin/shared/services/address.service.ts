import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, takeUntil } from 'rxjs';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  validateCep(cep: string): boolean {
    const validateCep = /^[0-9]{8}$/;

    return validateCep.test(cep);
  }

  getAddress(inputValue: any): Observable<any> {
    let cep = inputValue.target.value.replace(/\D/g, '');

    if (this.validateCep(cep)) {
      return this.http.get("https://viacep.com.br/ws/" + cep + "/json")
    }

    else return null;
  }

  showAddress(data: any, form: FormGroup) {
    form.patchValue({

      address: {
        street: data.logradouro,
        district: data.bairro,
        city: data.localidade,
        state: data.uf.toUpperCase(),
      }
    });
  }
}
