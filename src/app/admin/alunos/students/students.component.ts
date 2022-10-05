import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { Student } from '../../models/aluno.model';
import { PaginatorService } from '../../shared/services/paginator.service';
import { Snackbar } from '../../shared/services/snackbar.service';
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
  searchValue: string = '';

  constructor(
    private studService: StudentsService,
    private sanckbar: Snackbar,
    private paginator: PaginatorService) { }

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
    this.pageSlice = this.paginator.onPageEvent(event, this.students)
  }

  search() {
    if (this.students.length === 0 || this.searchValue === undefined || this.searchValue.trim() === '') {
      return this.students
    }

    return this.students.filter((v) => {
      if (v.email.toLowerCase().indexOf(this.searchValue.toLocaleLowerCase()) >= 0) return true;
      return false;
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
  }

}
