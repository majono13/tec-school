import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColaboradoresRoutingModule } from './colaboradores-routing.module';
import { CollaboratorsComponent } from './collaborators/collaborators.component';


@NgModule({
  declarations: [
    CollaboratorsComponent
  ],
  imports: [
    CommonModule,
    ColaboradoresRoutingModule
  ]
})
export class ColaboradoresModule { }
