import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Student } from '../../models/aluno.model';
import { StudentsService } from '../students.service';
import { Snackbar } from 'src/app/shared/components/snackbar.service';
import { AddressService } from '../../../shared/services/address.service';
import { Course } from '../../models/curso.model';
import { CourseService } from '../../cursos/course.service';


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
    course: ['', [Validators.required]],
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
  courses: Course[] = [];

  constructor(
    private fb: FormBuilder,
    private studService: StudentsService,
    private addressService: AddressService,
    private snackbar_: Snackbar,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.getRegisterNumber();
    this.getCourses();
  }

  getCourses() {
    this.courseService.getCourses()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => this.courses = data);
  }


  onSubmit() {

    const newStudent: Student = {
      ...this.newStudentForm.value,
      birthday: this.getBirthday(),
      gender: this.getGender(), id: '',
      registNumber: this.registNumber
    };

    this.studService.newStudent(newStudent)
      .then(() => {
        this.snackbar_.notify('Aluno adicionado com sucesso!');
        this.cancel();
      })
      .catch(() => this.snackbar_.notify('Ops! Algo deu errado, tente novamente ou contate um administrador'));
  }

  /***** Pega cep e endereço *****/
  getAddress(inputValue: any) {


    if (this.addressService.getAddress(inputValue)) {
      this.addressService.getAddress(inputValue)
        .subscribe(data => {
          if (data.erro) this.snackbar_.notify('CEP não encontrado!')
          else this.showAddress(data);
        });
    }
  }

  showAddress(data: any) {

    this.addressService.showAddress(data, this.newStudentForm);
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
