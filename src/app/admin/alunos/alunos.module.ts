import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Modulos//
import { AlunosRoutingModule } from './alunos-routing.module';
import { MaterialModule } from '../shared/material.module';
import { SharedAdminModule } from '../shared/shared-admin.module';

// Componentes//
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { StudentsComponent } from './students/students.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';

import { AddressService } from '../shared/services/address.service';

@NgModule({
  declarations: [
    HomeComponent,
    AddComponent,
    StudentsComponent,
    DetailsComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlunosRoutingModule,
    SharedAdminModule,
    FormsModule,
  ],
  exports: [],
  providers: [
    AddressService
  ]
})
export class AlunosModule { }
