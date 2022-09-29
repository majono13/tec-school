import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../shared/material.module';
import { MenuComponent } from './menu/menu.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { AlunosModule } from './alunos/alunos.module';


@NgModule({
  declarations: [
    MenuComponent,
    MainComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AdminRoutingModule,
    AlunosModule,
  ]
})
export class AdminModule { }
