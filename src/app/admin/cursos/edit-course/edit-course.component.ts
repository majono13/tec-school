import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Snackbar } from '../../shared/services/snackbar.service';
import { Course } from '../../models/curso.model';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {

  editCourseForm!: FormGroup;
  course: Course;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar_: Snackbar) { }

  ngOnInit(): void {
    this.getCourse();
  }

  getCourse() {
    const id = this.route.snapshot.paramMap.get('id');

    this.courseService.getCourseById(id)
      .subscribe(data => {
        if (data) {
          this.course = data;
          this.loadDatForm(data);
        }
        else this.router.navigateByUrl('/not-found');
      })
  }

  loadDatForm(data: Course) {
    this.editCourseForm = this.fb.group({
      name: [data?.name, [Validators.required, Validators.minLength(1)]],
      teacher: [data?.teacher, [Validators.required, Validators.minLength(3)]],
      price: [data?.price, [Validators.required]],
      info: [data?.info, [Validators.required, Validators.minLength(50)]],
      status: [data?.status, [Validators.required]],
      urlImg: [data?.urlImg, [Validators.required]],
    })
  }

  onSubmit() {
    const editedCourse: Course = { ...this.editCourseForm.value, id: this.course.id };

    this.courseService.editCourse(editedCourse)
      .then(() => this.snackbar_.notify('Curso editado com sucesso!'))
      .catch((err) => this.snackbar_.notify('Ops! Algo deu errado, tente novamente ou contate um administrador'));
  }

}
