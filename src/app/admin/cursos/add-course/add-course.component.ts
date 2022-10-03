import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Snackbar } from 'src/app/shared/components/snackbar.service';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  @ViewChild('form') form!: NgForm;


  newCourseForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(1)]],
    teacher: ['', [Validators.required, Validators.minLength(3)]],
    price: ['', [Validators.required]],
    info: ['', [Validators.required, Validators.minLength(50)]],
    status: ['', [Validators.required]],
    urlImg: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private snackbar_: Snackbar,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const newCourse = {
      ...this.newCourseForm.value,
      id: '',
      students: []
    };

    this.courseService.newCourse(newCourse)
      .then(() => {
        this.snackbar_.notify('Novo curso cadastrado com sucesso!');
        this.cancel();
      })
      .catch((err) => this.snackbar_.notify('Ops! Algo deu errado, tente novamente ou contate um administrador'))
  }

  cancel() {
    this.form.resetForm();
  }

}
