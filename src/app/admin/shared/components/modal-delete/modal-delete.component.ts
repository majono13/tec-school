import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StudentsService } from 'src/app/admin/alunos/students.service';
import { Student } from 'src/app/admin/models/aluno.model';
import { Snackbar } from 'src/app/shared/components/snackbar.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Student | any,
    private dialogRef: MatDialogRef<ModalDeleteComponent>,
    private studService: StudentsService,
    private snackbar_: Snackbar,
    private router: Router) { }

  ngOnInit(): void {
  }

  delete() {

    if (this.data.address) {
      this.studService.deleteSudent(this.data.id)
        .then(() => {
          this.snackbar_.notify('Aluno excluído com sucesso!');
          this.cancel();
          this.router.navigateByUrl('/admin/alunos');
        })
        .catch(() => this.snackbar_.notify('Falha ao excluir aluno, tente novamente.'));
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
