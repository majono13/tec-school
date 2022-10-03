import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Course } from '../../models/curso.model';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsCourseComponent implements OnInit {

  course!: Course;
  unsubscribe$: Subject<any> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.courseService.getCourseById(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        if (data) this.course = data;
        else this.router.navigateByUrl('/not-found');
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
  }

}
