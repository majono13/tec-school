import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Snackbar } from '../../shared/services/snackbar.service';
import { CollaboratorsService } from '../collaborators.service';

@Component({
  selector: 'app-add-collab',
  templateUrl: './add-collab.component.html',
  styleUrls: ['./add-collab.component.scss']
})
export class AddCollabComponent implements OnInit {

  @ViewChild('form') form!: NgForm;

  unsubscribe$: Subject<any> = new Subject();

  newCollabForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    acessCode: ['', [Validators.required, Validators.minLength(6)]],
    permission: ['', [Validators.required]]
  })

  constructor(
    private collabService: CollaboratorsService,
    private fb: FormBuilder,
    private snackbar_: Snackbar) { }

  ngOnInit(): void {
  }

  onSubmit() {

    this.collabService.newCollaborator({ ...this.newCollabForm.value, status: 'Ativo' })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        error: err => this.snackbar_.notify('Ops! Algo deu errado, tente novamente'),
        next: () => {
          this.snackbar_.notify('Colaborador salvo com sucesso!');
          this.cancel();
        }
      })
  }

  cancel() {
    this.form.resetForm();
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
  }
}
