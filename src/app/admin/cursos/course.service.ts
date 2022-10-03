import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Course } from '../models/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private readonly courseCollection: AngularFirestoreCollection<Course> = this.afs.collection('courses');

  constructor(private afs: AngularFirestore) { }

  getCourses(): Observable<Course[]> {
    return this.courseCollection.valueChanges();
  }

  getCourseById(id: string): Observable<Course> {
    return this.courseCollection.doc(id).valueChanges();
  }

  newCourse(course: Course): Promise<void> {
    course.id = this.afs.createId();

    return this.courseCollection.doc(course.id).set(course);
  }

  editCourse(course: Course): Promise<void> {
    return this.courseCollection.doc(course.id).set(course);
  }
}
