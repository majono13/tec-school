import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { StudentsService } from '../../alunos/students.service';
import { Student } from '../../models/aluno.model';

@Component({
  selector: 'app-course-students',
  templateUrl: './course-students.component.html',
  styleUrls: ['./course-students.component.scss']
})
export class CourseStudentsComponent implements OnInit {

  unsubscribe$: Subject<any> = new Subject();
  students: Student[] = [];
  course: string = this.route.snapshot.paramMap.get('name');
  constructor(
    private route: ActivatedRoute,
    private studService: StudentsService,
    private router: Router) { }

  ngOnInit(): void {
    this.getStudentsByCourse();
  }

  getStudentsByCourse() {

    this.studService.getStudentsByCourse(this.course)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(students => {
        if (students) this.students = students;
        else this.router.navigateByUrl('/not-found');
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
  }

}
