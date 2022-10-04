import { useAnimation } from '@angular/animations';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, from, switchMap } from 'rxjs';


import { Collaborator } from '../admin/models/colaborador.model';

@Injectable({
  providedIn: 'root'
})
export class AuthCollaboratorService {

  private readonly collabCollection: AngularFirestoreCollection<Collaborator> = this.afs.collection('collaborators')

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) { }

}
