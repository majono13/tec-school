import { Injectable } from '@angular/core';

import { from, switchMap, Observable, map, of } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { Collaborator } from '../admin/models/colaborador.model';
import { ColaboradoresModule } from '../admin/colaboradores/colaboradores.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Collaborator;

  private readonly collaboratorCollection: AngularFirestoreCollection<ColaboradoresModule> = this.afs.collection('collaborators');

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) { }

  login(credentials: { email: string, acessCode: string }): Observable<Collaborator> {

    return from(this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.acessCode))
      .pipe(
        switchMap((user) => this.collaboratorCollection.doc<Collaborator>(user.user.uid).valueChanges())
      );
  }

  isauthenticated(): Observable<boolean> {
    return this.afAuth.authState
      .pipe(
        map((res) => (res) ? true : false)
      );
  }

  getUser(): Observable<Collaborator> {
    return this.afAuth.authState
      .pipe(
        switchMap(u => (u) ? this.collaboratorCollection.doc<Collaborator>(u.uid).valueChanges() : of(null))
      );
  }

  getUserStatus(): Observable<boolean> {
    return this.getUser()
      .pipe(
        map(user => user.status == 'Ativo' ? true : false)
      )
  }

  getPermissionUser(): Observable<boolean> {
    return this.getUser()
      .pipe(
        map(user => user.permission == 'admin' ? true : false)
      )
  }

  logout() {
    this.afAuth.signOut();
  }
}
