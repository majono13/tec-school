import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsCourseComponent } from '../cursos/details/details.component';
import { CourseStudentsComponent } from './course-students/course-students.component';
import { EditCourseComponent } from './edit-course/edit-course.component';

import { HomeComponent } from './home/home.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'detalhes/:id', component: DetailsCourseComponent },
  { path: 'detalhes/alunos/:name', component: CourseStudentsComponent },
  { path: 'edit/:id', component: EditCourseComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CursosRoutingModule { }
