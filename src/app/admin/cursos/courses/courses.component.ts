import { Component, OnInit } from '@angular/core';

import { Subject, takeUntil } from 'rxjs'

import { Course } from '../../models/curso.model';
import { PaginatorService } from '../../shared/services/paginator.service';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses: Course[] = [];
  unsubscribe$: Subject<any> = new Subject();

  pageSlice: any;

  constructor(private courseService: CourseService, private paginator: PaginatorService) { }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses() {
    this.courseService.getCourses()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.courses = data;
        this.pageSlice = data.slice(0, 5);
      });
  }

  onPageEvent(event: any) {

    this.pageSlice = this.paginator.onPageEvent(event, this.courses);

    console.log(this.pageSlice);
  }

}
