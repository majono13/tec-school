import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

//Módulos//
import { ColaboradoresRoutingModule } from './colaboradores-routing.module';
import { SharedAdminModule } from '../shared/shared-admin.module';
import { MaterialModule } from 'src/app/shared/material.module';

//Componentes//
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { HomeComponent } from './home/home.component';
import { AddCollabComponent } from './add-collab/add-collab.component';


@NgModule({
  declarations: [
    CollaboratorsComponent,
    HomeComponent,
    AddCollabComponent
  ],
  imports: [
    CommonModule,
    ColaboradoresRoutingModule,
    SharedAdminModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ColaboradoresModule { }
