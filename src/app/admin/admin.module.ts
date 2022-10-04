import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Módulos//
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../shared/material.module';

// Componentes //
import { MenuComponent } from './menu/menu.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { CursosModule } from './cursos/cursos.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    MenuComponent,
    MainComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AdminRoutingModule,
    CursosModule,
  ]
})
export class AdminModule { }
