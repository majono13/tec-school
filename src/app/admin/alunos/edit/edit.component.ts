import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Snackbar } from 'src/app/shared/components/snackbar.service';
import { Student } from '../../models/aluno.model';
import { AddressService } from '../address.service';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  editStudentForm!: FormGroup;

  student!: Student;
  unsubscribe$: Subject<any> = new Subject();

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private snackbar_: Snackbar,
    private route: ActivatedRoute,
    private studService: StudentsService,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.getStudent(id);
  }

  getStudent(id: string) {
    this.studService.getStudentById(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        if (res) {
          this.student = res;
          this.loadDataForm(res);
        }
        else this.router.navigateByUrl('/not-found');
      });
  }

  loadDataForm(student: Student) {
    this.editStudentForm = this.fb.group({
      firstname: [student?.firstname, [Validators.required, Validators.minLength(3)]],
      lastname: [student?.lastname, [Validators.required, Validators.minLength(3)]],
      email: [student?.email, [Validators.required, Validators.email]],
      birthday: [student?.birthday, [Validators.required]],
      telephone: [student?.telephone, [Validators.required]],
      gender: ['', [Validators.required]],
      address: this.fb.group({
        cep: [student?.address.cep, [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
        n: [student?.address.n, [Validators.required]],
        complement: [student?.address.complement],
        street: [student?.address.street],
        district: [student?.address.district],
        city: [student?.address.city],
        state: [student?.address.state],
      })
    })
  }

  onSubmit() {

    const studentEdited: Student = {
      ...this.editStudentForm.value,
      id: this.student.id,
      registNumber: this.student.registNumber,
      course: this.student.course
    }

    this.editStudentForm.value.gender = this.getGender();

    this.studService.editStudent(studentEdited)
      .then(() => this.snackbar_.notify('Dados do aluno atualizados!'))
      .catch(() => this.snackbar_.notify('Falha ao atualizar dados, tente novamente '));
  }

  getGender(): string {
    if (this.editStudentForm.value.gender == 1) return 'Feminino';
    else if (this.editStudentForm.value.gender == 2) return 'Masculino';
    else return 'Outro';
  }

  getAddress(inputValue: any) {

    this.addressService.getAddress(inputValue)
      .subscribe(data => {
        if (data.erro) this.snackbar_.notify('CEP não encontrado!')
        else this.showAddress(data);
      });
  }

  showAddress(data: any) {

    this.addressService.showAddress(data, this.editStudentForm);
  }

  cancel() {
    this.router.navigateByUrl(`/admin/alunos/detalhes/${this.student.id}`);
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
  }

}
