import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Snackbar } from 'src/app/shared/components/snackbar.service';
import { Student } from '../../models/aluno.model';
import { ModalDeleteComponent } from '../../shared/components/modal-delete/modal-delete.component';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  student!: Student;

  constructor(private route: ActivatedRoute,
    private studService: StudentsService,
    private router: Router,
    private snackbar_: Snackbar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent() {
    const id = this.route.snapshot.paramMap.get('id');

    this.studService.getStudentById(id)
      .subscribe(res => {
        if (res) {
          this.student = res;
        }

        else this.router.navigateByUrl('/not-found');
      })

  }

  getAge(): number {
    let age = 0;
    const date = new Date;
    const currentYear = date.getFullYear();
    const birthYear = Number(this.student?.birthday.slice(-4, 10));

    if (date.getMonth() > Number(this.student?.birthday.slice(3, 5))) return age = currentYear - birthYear;
    else return age = (currentYear - birthYear) - 1;

  }

  delete(student: Student) {

    this.dialog.open(ModalDeleteComponent, {
      data: student
    });
  }


}
