import { Component, OnInit } from '@angular/core';
import { pipe, Subject, takeUntil } from 'rxjs';
import { Snackbar } from 'src/app/shared/components/snackbar.service';
import { Student } from '../../models/aluno.model';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  students: Student[] = [];
  pageSlice: Student[] = [];
  unsubscribe$: Subject<any> = new Subject();

  constructor(private studService: StudentsService, private sanckbar: Snackbar) { }

  ngOnInit(): void {
    this.getStudents()
  }

  getStudents() {
    this.studService.getStudents()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        error: err => this.sanckbar.notify('Falha ao carregar dados, contate um administrador'),
        next: (res) => {
          this.students = res;
          this.pageSlice = this.students.slice(0, 10);
        }
      });
  }

  onPageEvent(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if (endIndex > this.students.length) endIndex = this.students.length;

    this.pageSlice = this.students.slice(startIndex, endIndex);
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
  }

}
