import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Collaborator } from '../models/colaborador.model';
import { Observable, from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorsService {

  private collaboratorsCollection: AngularFirestoreCollection<Collaborator> = this.afs.collection('collaborators');

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) { }

  getCollaborators(): Observable<Collaborator[]> {
    return this.collaboratorsCollection.valueChanges();
  }

  newCollaborator(collaborator: Collaborator): Observable<boolean> {
    return from(this.afAuth.createUserWithEmailAndPassword(collaborator.email, collaborator.acessCode))
      .pipe(
        switchMap((u) =>
          this.collaboratorsCollection.doc(u.user.uid).set({
            name: collaborator.name,
            email: collaborator.email,
            id: u.user.uid,
            permission: collaborator.permission,
            status: collaborator.status
          })
            .then(() => true)
        )
      );
  }

  editCollaborator(collaborator: Collaborator) {
    return this.collaboratorsCollection.doc(collaborator.id).set(collaborator);
  }

}
