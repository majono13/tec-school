import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../shared/material.module';
import { MenuComponent } from './menu/menu.component';
import { MainComponent } from './main/main.component';



@NgModule({
  declarations: [
    MenuComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class AdminModule { }
