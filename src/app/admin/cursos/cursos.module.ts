import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulos //
import { CursosRoutingModule } from './cursos-routing.mocule';
import { SharedAdminModule } from '../shared/shared-admin.module';
import { MaterialModule } from 'src/app/shared/material.module';

// Componentes//
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    SharedAdminModule,
    MaterialModule
  ]
})
export class CursosModule { }
