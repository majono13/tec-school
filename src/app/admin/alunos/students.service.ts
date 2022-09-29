import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { from, map, Observable } from 'rxjs';
import { Student } from '../models/aluno.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private readonly studentsCollection: AngularFirestoreCollection<Student> = this.afs.collection('students');

  constructor(private afs: AngularFirestore) { }

  getStudents(): Observable<Student[]> {
    return this.studentsCollection.valueChanges();
  }

  newStudent(student: Student): Promise<void> {
    student.id = this.afs.createId();

    return this.studentsCollection.doc(student.id).set(student)
  }
}
