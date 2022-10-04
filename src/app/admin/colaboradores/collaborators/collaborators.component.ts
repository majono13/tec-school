import { Component, OnInit } from '@angular/core';
import { info } from 'console';
import { Observable } from 'rxjs';
import { Snackbar } from 'src/app/shared/components/snackbar.service';


import { Collaborator } from '../../models/colaborador.model';
import { CollaboratorsService } from '../collaborators.service';


@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.scss']
})
export class CollaboratorsComponent implements OnInit {

  collaborators!: Observable<Collaborator[]>

  constructor(private collabService: CollaboratorsService, private snackbar_: Snackbar) { }

  ngOnInit(): void {
    this.getCollaborators();
  }

  getCollaborators() {
    this.collaborators = this.collabService.getCollaborators();
  }

  editPermission(colaborador: Collaborator) {
    if (colaborador.permission == 'moderador') colaborador.permission = 'admin';
    else colaborador.permission = 'moderador';

    this.collabService.editCollaborator(colaborador)
      .then(() => this.snackbar_.notify('Permissão atualizada com sucesso!'))
      .catch(() => this.snackbar_.notify('Ops! Algo deu errado, tente novamente'))!
  }

  editStatus(collaborator: Collaborator) {
    if (collaborator.status === 'Ativo') collaborator.status = 'Desativado';
    else collaborator.status = 'Ativo'

    this.collabService.editCollaborator(collaborator)
      .then(() => this.snackbar_.notify('Status alterado com sucesso!'))
      .catch(() => this.snackbar_.notify('Ops! Algo deu errado, tente novamente'));
  }

}
