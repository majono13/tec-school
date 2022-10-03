import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

// Módulos //
import { CursosRoutingModule } from './cursos-routing.mocule';
import { SharedAdminModule } from '../shared/shared-admin.module';
import { MaterialModule } from 'src/app/shared/material.module';

// Componentes//
import { HomeComponent } from './home/home.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CoursesComponent } from './courses/courses.component';
import { DetailsCourseComponent } from './details/details.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { CourseStudentsComponent } from './course-students/course-students.component';



@NgModule({
  declarations: [
    HomeComponent,
    AddCourseComponent,
    CoursesComponent,
    DetailsCourseComponent,
    EditCourseComponent,
    CourseStudentsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CursosRoutingModule,
    SharedAdminModule,
    MaterialModule
  ]
})
export class CursosModule { }
