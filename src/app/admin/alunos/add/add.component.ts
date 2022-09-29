import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';
import { Student } from '../../models/aluno.model';
import { StudentsService } from '../students.service';
import { Snackbar } from 'src/app/shared/components/snackbar.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  @ViewChild('form') form!: NgForm;

  newStudentForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(3)]],
    lastname: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    birthday: ['', [Validators.required]],
    telephone: ['', [Validators.required]],
    gender: [1, [Validators.required]],
    address: this.fb.group({
      cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
      n: ['', [Validators.required]],
      complement: [''],
      street: [''],
      district: [''],
      city: [''],
      state: [''],
    })
  });

  registNumber: number = 0;
  unsubscribe$: Subject<any> = new Subject();

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private studService: StudentsService,
    private snackbar_: Snackbar
  ) { }

  ngOnInit(): void {
    this.getRegisterNumber();
  }


  onSubmit() {

    const newStudent: Student = {
      ...this.newStudentForm.value,
      birthday: this.getBirthday(),
      gender: this.getGender(), id: '',
      registNumber: this.registNumber
    };

    this.studService.newStudent(newStudent)
      .then(() => this.snackbar_.notify('Aluno adicionado com sucesso!'))
      .catch(() => this.snackbar_.notify('Falha a adicionar aluno, tente novamente ou contate um administrador.'));

    this.cancel();
  }

  /***** Pega cep e endereço *****/
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
    });
  }


  /**** Formata a data de aniversário ****/
  getBirthday(): string {
    const date = this.newStudentForm.value.birthday;

    return `${date.getDate()}/0${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  /******* Pega os valores do input rádio e define o gênero ********/
  getGender(): string {
    if (this.newStudentForm.value.gender == 1) return 'Feminino';
    else if (this.newStudentForm.value.gender == 2) return 'Masculino';
    else return 'Outro';
  }

  /****** Cria o número de registro ****** */
  getRegisterNumber() {

    this.studService.getStudents()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => this.registNumber = res.length + 1)
  }

  cancel() {
    this.form.resetForm();

    this.newStudentForm.patchValue({
      address: {
        street: '',
        district: '',
        city: '',
        state: '',
      }
    });
  }


  ngOnDestroy() {
    this.unsubscribe$.complete();
  }
}
