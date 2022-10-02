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

  getStudentById(id: string): Observable<Student | undefined> {
    return this.studentsCollection.doc(id).valueChanges();
  }

  newStudent(student: Student): Promise<void> {
    student.id = this.afs.createId();

    return this.studentsCollection.doc(student.id).set(student)
  }

  editStudent(student: Student) {
    return this.studentsCollection.doc(student.id).set(student);
  }

  deleteSudent(id: string) {
    return this.studentsCollection.doc(id).delete();
  }
}
